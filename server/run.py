
from flask import Flask
from flask import jsonify
from app.storage.mongodb import MongoDB

app = Flask(__name__)
mongo = MongoDB(app)


@app.route('/')
def hello_world():
    user = mongo.db.User.find()
    return jsonify(user)

