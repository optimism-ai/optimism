
from pymongo import MongoClient
import os

class MongoDB(MongoClient):
    def __init__(self):
        URI = f'mongodb://{os.getenv("OPTIMISM_DB_USER")}:{os.getenv("OPTIMISM_DB_PASSWORD")}@{os.getenv("OPTIMISM_DB_HOST")}:{os.getenv("OPTIMISM_DB_PORT")}/{os.getenv("OPTIMISM_DB_NAME")}'
        if os.getenv("FLASK_ENV") == 'development':
            URI += '?authSource=admin'
        print(URI)
        super().__init__(URI)

    def get_user(self, name):
        user = self.test.User.find_one({'firstName' : f'{name}'})
        return user

