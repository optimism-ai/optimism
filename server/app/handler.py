
from flask import Flask
from bson.json_util import dumps
from . import REPO

app = Flask(__name__)

@app.route('/')
def get_user():
    user = REPO.get_user('bob')
    return dumps(user)

app.run()
