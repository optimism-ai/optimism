
from pymongo import MongoClient
from .models import Mood, Aspect
from .repository import Repository

from pprint import pprint
import os

class MongoDB(Repository, MongoClient):
    '''MongoDB Interfacing class. Inherits MongoClient'''

    def __init__(self, URI):
        '''Initialize database connection.

        Parameters
        ----------
        URI : str
            URI to database connection
        '''
        if os.getenv("FLASK_ENV") == 'development':
            URI += '?authSource=admin'
        super().__init__(URI)

    def get_moods(self):
        '''Get list of moods from database

        Returns
        -------
        moods : list
            List of Mood objects
        '''
        moods = []
        moods_cursor = self.test.Mood.find()
        for mood in moods_cursor:
            moods.append(Mood(mood['_id'], mood['name'], mood['weight']))
        return moods

    def get_aspects(self):
        '''Get list of aspects 

        Returns
        -------
        aspects : list
            Llist of Aspect objects
        '''
        aspects = []
        aspects_cursor = self.test.Aspect.find()
        for aspect in aspects_cursor:
            aspects.append(Aspect(aspect['_id'], aspect['name'], aspect['description']))
        return aspects

