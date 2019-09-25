from flask_pymongo import PyMongo
import os

class MongoDB(PyMongo):
    def __init__(self, app):
        app.config["MONGO_URI"] = f'mongodb://{os.getenv("OPTIMISM_DB_USER")}:{os.getenv("OPTIMISM_DB_PASSWORD")}@{os.getenv("OPTIMISM_DB_HOST")}:{os.getenv("OPTIMISM_DB_PORT")}/{os.getenv("OPTIMISM_DB_NAME")}'
        super().__init__(app)


    
