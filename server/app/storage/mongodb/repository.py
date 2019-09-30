
from pymongo import MongoClient
from .mood import Mood
from pprint import pprint
import os

class MongoDB(MongoClient):
    def __init__(self, URI):
        if os.getenv("FLASK_ENV") == 'development':
            URI += '?authSource=admin'
        super().__init__(URI)

    def get_moods(self):
        moods = []
        moods_cursor = self.test.Mood.find()
        for mood in moods_cursor:
            moods.append(Mood(mood['name'], mood['level']))
        return moods

