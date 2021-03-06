
from bson.json_util import dumps
import os
from functools import wraps
import json
from six.moves.urllib.request import urlopen
from flask import Flask, request, jsonify, _request_ctx_stack
from flask_cors import cross_origin
from flask_api import status
from jose import jwt
import requests
import http.client

from . import ALGORITHMS, AUTH0_DOMAIN, API_IDENTIFIER
from . import lister
from . import adder
from .storage.models import Factor, Mood, Aspect, Entry

APP = Flask(__name__)

# Format error response and append status code.
class AuthError(Exception):
    def __init__(self, error, status_code):
        self.error = error
        self.status_code = status_code

@APP.errorhandler(AuthError)
def handle_auth_error(ex):
    response = jsonify(ex.error)
    response.status_code = ex.status_code
    return response

def get_token_auth_header():
    """Obtains the access token from the Authorization Header
    """
    auth = request.headers.get("Authorization", None)
    if not auth:
        raise AuthError({"code": "authorization_header_missing",
                        "description":
                            "Authorization header is expected"}, 401)

    parts = auth.split()

    if parts[0].lower() != "bearer":
        raise AuthError({"code": "invalid_header",
                        "description":
                            "Authorization header must start with"
                            " Bearer"}, 401)
    elif len(parts) == 1:
        raise AuthError({"code": "invalid_header",
                        "description": "Token not found"}, 401)
    elif len(parts) > 2:
        raise AuthError({"code": "invalid_header",
                        "description":
                            "Authorization header must be"
                            " Bearer token"}, 401)

    token = parts[1]
    return token

def requires_auth(f):
    """Determines if the access token is valid
    """
    @wraps(f)
    def decorated(*args, **kwargs):
        token = get_token_auth_header()
        jsonurl = urlopen("https://"+AUTH0_DOMAIN+"/.well-known/jwks.json")
        jwks = json.loads(jsonurl.read())
        try:
            unverified_header = jwt.get_unverified_header(token)
        except jwt.JWTError:
            raise AuthError({"code": "invalid_header",
                            "description":
                                "Invalid header. "
                                "Use an RS256 signed JWT Access Token"}, 401)
        if unverified_header["alg"] == "HS256":
            raise AuthError({"code": "invalid_header",
                            "description":
                                "Invalid header. "
                                "Use an RS256 signed JWT Access Token"}, 401)
        rsa_key = {}
        for key in jwks["keys"]:
            if key["kid"] == unverified_header["kid"]:
                rsa_key = {
                    "kty": key["kty"],
                    "kid": key["kid"],
                    "use": key["use"],
                    "n": key["n"],
                    "e": key["e"]
                }
        if rsa_key:
            try:
                payload = jwt.decode(
                    token,
                    rsa_key,
                    algorithms=ALGORITHMS,
                    audience=API_IDENTIFIER,
                    issuer="https://"+AUTH0_DOMAIN+"/"
                )
            except jwt.ExpiredSignatureError:
                raise AuthError({"code": "token_expired",
                                "description": "token is expired"}, 401)
            except jwt.JWTClaimsError:
                raise AuthError({"code": "invalid_claims",
                                "description":
                                    "incorrect claims,"
                                    " please check the audience and issuer"}, 401)
            except Exception:
                raise AuthError({"code": "invalid_header",
                                "description":
                                    "Unable to parse authentication"
                                    " token."}, 401)

            _request_ctx_stack.top.current_user = payload
            return f(*args, **kwargs)
        raise AuthError({"code": "invalid_header",
                        "description": "Unable to find appropriate key"}, 401)
    return decorated

@APP.route("/moods/all", methods=['GET'])
@cross_origin(headers=["content-type", "authorization"])
@requires_auth
def moods():
    """Accumulates and returns all moods available 

    Request Headers
    ---------------
    Authorization : Bearer token

    Returns
    -------
    json_moods : JSON Object
        Key value pairs of mood names and their associated weights. Returned 
        if HTTP method is GET.

    status.HTTP_200_OK
        All moods were aquired
    """
    moods = lister.get_moods()
    json_moods = dumps([mood.__dict__ for mood in moods])
    return json_moods, status.HTTP_200_OK

@APP.route("/aspects/all", methods=['GET'])
@cross_origin(headers=["content-type", "authorization"])
@requires_auth
def all_aspects():
    """Accumulates and returns all aspects and their descriptions

    Request Headers
    ---------------
    Authorization : Bearer token

    Returns
    -------
    json_aspects : JSON Object
        Aspect names and their descriptions

    status.HTTP_200_OK
        All moods were aquired
    """
    try:
        aspects = lister.get_aspects()
        json_aspects = dumps([aspect.__dict__ for aspect in aspects])
        return json_aspects, status.HTTP_200_OK
    except Exception as e:
        return {'error': str(e)}, status.HTTP_400_BAD_REQUEST

@APP.route("/aspects/<string:email>", methods=['GET'])
@cross_origin(headers=["content-type", "authorization"])
@requires_auth
def user_aspects(email):
    """Accumulates aspects and their associated scores of a particular user.

    Request Headers
    ---------------
    Authorization : Bearer token

    Request Arguments
    -----------------
    email: str
        Email of user

    Returns
    -------
    json_aspects : JSON Object
        Aspect names and their associated scores

    status.HTTP_200_OK
        All aspects were aquired
    """
    try:
        adder.register_user(email)
        aspects = lister.get_aspects(email)
        json_aspects = dumps([aspect.__dict__ for aspect in aspects])
        return json_aspects, status.HTTP_200_OK
    except Exception as e:
        return {'error': str(e)}, status.HTTP_400_BAD_REQUEST

@APP.route("/entries/<string:email>/<string:aspect>/<int:start>-<int:end>", methods=['GET'])
@cross_origin(headers=["content-type", "authorization"])
@requires_auth
def entries_by_aspect_range(email, aspect, start, end):
    """Returns JSON of weekly entries that affected a particular aspect

    Request Headers
    ---------------
    Authorization : Bearer token

    Request Arguments
    -----------------
    email: str
        Email of user
    aspect : str
        Aspect that the entries will be filtered by
    start : int
        Index of starting entry
    end : int
        Index of ending entry

    Returns
    -------
    json_entries : JSON Object
        List of entries that are associated with the aspects. Each entry
        has the following format:
            {
                "date": DATE ENTRY ADDED,
                "mood": MOOD AS A RESULT OF FACTORS
                "factors": [ FACTORS THAT CONTRIBUTED TO MOOD ]
                "aspects": [
                        "score": SCORE OF ASPECT AT THE TIME OF ENTRY
                        "aspect": ASPECT THE ENTRY AFFECTED
                ]
            }

    status.HTTP_200_OK
        All entries associated with the aspect were aquired
    """
    try:
        adder.register_user(email)
        entries = lister.get_entries(email, aspect, range(start-1, end-1))
        for i, entry in enumerate(entries):
            entries[i] = entry_to_json(entry)
        return dumps(entries), status.HTTP_200_OK
    except Exception as e:
        return {'error': str(e)}, status.HTTP_400_BAD_REQUEST

@APP.route("/entries/<string:email>/<int:start>-<int:end>", methods=['GET'])
@cross_origin(headers=["content-type", "authorization"])
@requires_auth
def entry_range(email, start, end):
    """Returns JSON of entries ranging from [start, end]

    Request Headers
    ---------------
    Authorization : Bearer token

    Request Arguments
    -----------------
    email: str
        Email of user
    start : int
        Index of starting entry
    end : int
        Index of ending entry

    Returns
    -------
    json_entries : JSON Object
        List of entries that are within the range. Each entry has the
        following format:
            {
                "date": DATE ENTRY ADDED,
                "mood": MOOD AS A RESULT OF FACTORS
                "factors": [ FACTORS THAT CONTRIBUTED TO MOOD ]
                "aspects": [
                        "score": SCORE OF ASPECT AT THE TIME OF ENTRY
                        "aspect": ASPECT THE ENTRY AFFECTED
                ]
            }

    status.HTTP_200_OK
        All entries within the range are aquired
    """
    try:
        adder.register_user(email)
        entries = lister.get_entries(email, range=range(start-1, end-1))
        for i, entry in enumerate(entries):
            entries[i] = entry_to_json(entry)
        return dumps(entries), status.HTTP_200_OK
    except Exception as e:
        return {'error': str(e)}, status.HTTP_400_BAD_REQUEST

@APP.route("/entries", methods=['POST'])
@cross_origin(headers=["content-type", "authorization"])
@requires_auth
def entries():
    """Handles POST /entries

    Inserts a new entry.

    Request Headers
    ---------------
    Authorization : Bearer token

    Request Body
    ------------
    JSON
        For POST methods, a single json entry in the following format is returned.
        {
            "email": EMAIL OF USER,
            "date": DATE ENTRY ADDED,
            "mood": MOOD AS A RESULT OF FACTORS,
            "factors": [ FACTORS THAT CONTRIBUTED TO MOOD ]
        }

    Returns
    -------
    json_data : JSON Object
        List of entries that are within the range. Each entry has the
        following format:
        {
            "mood1": SCORE1,
            "mood2": SCORE2
            ...
        }

    status_code : HTTPS Status Code
        status.HTTP_201_CREATED if the POST request has succeeded
    """
    try:
        json_data = request.get_json()
        required_fields = ['email', 'date', 'mood', 'factors']
        if not all([field in json_data for field in required_fields]):
            raise KeyError('data must contain key values "date", "mood", "factors", "aspects"')
        email = json_data['email']
        adder.register_user(email)
        entry = dict_to_entry(json_data)
        aspects = adder.insert_entry(email, entry)
        json_resp = dumps(aspects)
        return json_resp, status.HTTP_201_CREATED
    except Exception as e:
        return {'error': str(e)}, status.HTTP_400_BAD_REQUEST

@APP.route("/factors", methods=['GET'])
@cross_origin(headers=["content-type", "authorization"])
@requires_auth
def all_factors():
    """Accumulates and returns all factors available

    Request Headers
    ---------------
    Authorization : Bearer token

    Returns
    -------
    json_factors : JSON Object
        List of the factor names

    status.HTTP_200_OK
        All factor names were aquired
    """
    factors = lister.get_factors()
    json_factors = dumps([factor.get_name() for factor in factors])
    return json_factors, status.HTTP_200_OK

def entry_to_json(entry):
    factors = []
    for factor in entry.get_factors():
        aspects = []
        for aspect in factor.get_aspects():
            aspects.append(aspect.__dict__)
        factors.append({
            'name' : factor.get_name(),
            'aspects' : aspects
        })
    aspects = []
    for aspect in entry.get_aspects():
        aspects.append(aspect.__dict__)
    return {
        'date' : entry.get_date(),
        'mood' : entry.get_mood().__dict__,
        'factors': factors,
        'aspects': aspects
    }

def dict_to_entry(entry_dict):
    factors = []
    for factor in entry_dict['factors']:
        factors.append(Factor(name=factor))
    return Entry(
        factors=factors,
        date=entry_dict['date'],
        mood=Mood(name=entry_dict['mood']))

APP.run()

