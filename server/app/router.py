
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

from . import ALGORITHMS, AUTH0_DOMAIN, API_IDENTIFIER
from . import lister

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

@APP.route("/moods", methods=['GET'])
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
    moods = lister.all_moods()
    json_moods = dumps([mood.__dict__ for mood in moods])
    return json_moods, status.HTTP_200_OK

@APP.route("/aspects", methods=['GET'])
@cross_origin(headers=["content-type", "authorization"])
@requires_auth
def aspects():
    """Accumulates and returns all aspects and their associated scores.

    Request Headers
    ---------------
    Authorization : Bearer token

    Request Body
    ------------
    JSON
        Key value pair where the key is 'email' and the value is the 
        email of the requestor

    Returns
    -------
    json_aspects : JSON Object
        Aspect names and their associated scores

    status.HTTP_200_OK
        All moods were aquired
    """
    aspects = lister.all_aspects()
    json_aspects = dumps([aspect.__dict__ for aspect in aspects])
    print(request.json)
    return json_aspects, status.HTTP_200_OK

@APP.route("/entries/<string:aspect>/<int:week>", methods=['GET'])
@cross_origin(headers=["content-type", "authorization"])
@requires_auth
def weekly_entries_by_aspect(aspect, week):
    """Returns JSON of weekly entries that affected a particular aspect

    Request Headers
    ---------------
    Authorization : Bearer token

    Request Arguments
    -----------------
    aspect : str
        Aspect that the entries will be filtered by
    week : int
        Week number, 1 being the current week, 2 being the week before, etc

    Returns
    -------
    json_entries : JSON Object
        List of entries that are associated with the aspects. Each entry
        has the following format:
            {
                "date": DATE ENTRY ADDED,
                "mood": MOOD AS A RESULT OF FACTORS
                "factors": [ FACTORS THAT CONTRIBUTED TO MOOD ]
                "score": SCORE OF ASPECT AT THE TIME OF ENTRY
                "aspect": ASPECT THE ENTRY AFFECTED
            }

    status.HTTP_200_OK
        All entries associated with the aspect were aquired
    """
    return {'aspect': aspect, 'week': week}, status.HTTP_200_OK

@APP.route("/entries/<int:start>-<int:end>", methods=['GET'])
@cross_origin(headers=["content-type", "authorization"])
@requires_auth
def entry_range(start, end):
    """Returns JSON of entries ranging from [start, end]

    Request Headers
    ---------------
    Authorization : Bearer token

    Request Arguments
    -----------------
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
                "aspects": {
                    [
                        "score": SCORE OF ASPECT AT THE TIME OF ENTRY
                        "aspect": ASPECT THE ENTRY AFFECTED
                    ]
                }
            }

    status.HTTP_200_OK
        All entries within the range are aquired
    """
    return {'start': start, 'end': end}, status.HTTP_200_OK

@APP.route("/entries", methods=['GET', 'POST'])
@cross_origin(headers=["content-type", "authorization"])
@requires_auth
def entries():
    """Handles POST and GET request for /entries

    Request Headers
    ---------------
    Authorization : Bearer token

    Returns
    -------
    json_entries : JSON Object
        For GET methods, json entries is a list of entries in the following
        format. For POST methods, a single json entry in the following
        format is returned.
            {
                "date": DATE ENTRY ADDED,
                "mood": MOOD AS A RESULT OF FACTORS
                "factors": [ FACTORS THAT CONTRIBUTED TO MOOD ]
                "aspects": {
                    [
                        "score": SCORE OF ASPECT AT THE TIME OF ENTRY
                        "aspect": ASPECT THE ENTRY AFFECTED
                    ]
                }
            }

    status_code : HTTPS Status Code
        status.HTTP_200_OK if the GET request is successfully fulfilled.
        status.HTTP_201_CREATED if the POST request has succeeded
    """
    json_entry = None
    status_code = None
    if request.method == 'GET':
        return {}, status.HTTP_200_OK
    elif request.method == 'POST':
        return {}, status.HTTP_201_OK
    return json_entry, status_code

APP.run()

