
from flask import Flask
from bson.json_util import dumps
from app.storage.mongodb import MongoDB

app = Flask(__name__)
mongo = MongoDB(app)


@app.route('/')
def hello_world():
    user = mongo.db.User.find({'firstName':'bob'})
    return dumps(user[0])

