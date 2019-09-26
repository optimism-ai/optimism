
from pymongo import MongoClient
from .mood import Mood
from pprint import pprint
import os

class MongoDB(MongoClient):
    def __init__(self):
        URI = f'mongodb://{os.getenv("OPTIMISM_DB_USER")}:{os.getenv("OPTIMISM_DB_PASSWORD")}@{os.getenv("OPTIMISM_DB_HOST")}:{os.getenv("OPTIMISM_DB_PORT")}/{os.getenv("OPTIMISM_DB_NAME")}'
        if os.getenv("FLASK_ENV") == 'development':
            URI += '?authSource=admin'
        super().__init__(URI)

    def get_moods(self):
        moods = []
        moods_cursor = self.test.Mood.find()
        for mood in moods_cursor:
            moods.append(Mood(mood['_id'], mood['name'], mood['level']))
        return moods

