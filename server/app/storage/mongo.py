
from pymongo import MongoClient
from .models import Mood, Aspect, UserAspect, Factor, Entry
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
            moods.append(Mood(name=mood['name'], weight=mood['weight']))
        return moods

    def get_factors(self):
        '''Get list of factors from database

        Returns
        -------
        factors : list
            List of Factor objects
        '''
        factors = []
        factor_cursor = self.test.Factor.find()
        for factor in factor_cursor:
            factors.append(Factor(name=factor['name']))
        return factors

    def get_aspects(self):
        '''Get list of aspects 

        Returns
        -------
        aspects : list
            List of Aspect objects
        '''
        aspects = []
        aspects_cursor = self.test.Aspect.find()
        for aspect in aspects_cursor:
            aspects.append(Aspect(name=aspect['name'], description=aspect['description']))
        return aspects

    def get_user_aspects(self, email):
        """Obtain aspects of a user

        Parameters
        ----------
        email : str
            email of a specific user to obtain 

        Returns
        -------
        aspects : list
            List of UserAspect objects
        """
        user_aspects = []
        user = self.test.User.find_one({'email': email})
        for aspect in user['aspects']:
            aspect_info = self.test.Aspect.find_one({'_id': aspect['id']})
            user_aspects.append(
                UserAspect(
                    name=aspect_info['name'],
                    description=aspect_info['description'],
                    score=aspect['score']
                )
            )
        return user_aspects

    def get_entries_by_aspect(self, email, aspect, range_):
        """Obtain entires filtered by a specific aspect and range

        Parameters
        ----------
        email : str
            A user's email
        aspect : str
            name of an aspect
        range : range
            range object to specify the range of entries

        Returns
        -------
        entries : list
            List of user's Entry objects
        """
        entries = []
        aspect_id = self.test.Aspect.find_one({'name': aspect.get_name()})['_id']
        user = self.test.User.find_one({'email': email})
        begin = False
        try:
            it = iter(range_)
            count = 0
            for entry in user['entries']:
                if aspect_id in [a['aspectID'] for a in entry['aspects']]:
                    if not begin:
                        if count == range_.start:
                            begin = True
                    if begin:
                        next(it)
                        factors = []
                        for id in entry['factorIDs']:
                            factor_info = self.test.Factor.find_one({'_id': id})
                            factor_aspects = []
                            for aid in factor_info['aspectIDs']:
                                aspect_info = self.test.Aspect.find_one({'_id': aid})
                                factor_aspects.append(Aspect(name=aspect_info['name'], description=aspect_info['description']))
                            factors.append(Factor(factor_info['name'], factor_aspects))
                        mood_info = self.test.Mood.find_one({'_id': entry['moodID']})
                        mood = Mood(name=mood_info['name'], weight=mood_info['weight'])
                        date = entry['dateAdded']
                        user_aspect = None
                        for a in entry['aspects']:
                            if a['aspectID'] ==  aspect_id:
                                aspect_info = self.test.Aspect.find_one({'_id': a['aspectID']})
                                user_aspect = UserAspect(name=aspect_info['name'], description=aspect_info['description'], score=a['score'])
                                break
                        entries.append(
                            Entry(
                                factors=factors,
                                mood=mood,
                                aspects=[user_aspect],
                                date=entry['dateAdded']
                            )
                        )
                    count += 1
        except IndexError as e:
            print('Range not aligned with entries')
        except StopIteration as e:
            print('Stop Iteration')
        return entries

    def get_entries_by_range(self, email, range_):
        """Obtain entires filtered by a specific aspect and range

        Parameters
        ----------
        email : str
            A user's email
        range : range
            range object to specify the range of entries

        Returns
        -------
        entries : list
            List of user's Entry objects
        """
        entries = []
        user = self.test.User.find_one({'email': email})
        begin = False
        try:
            it = iter(range_)
            count = 0
            for entry in reversed(user['entries']):
                if not begin:
                    if count == range_.start:
                        begin = True
                if begin:
                    next(it)
                    factors = []
                    for id in entry['factorIDs']:
                        factor_info = self.test.Factor.find_one({'_id': id})
                        factor_aspects = []
                        for aid in factor_info['aspectIDs']:
                            aspect_info = self.test.Aspect.find_one({'_id': aid})
                            factor_aspects.append(Aspect(name=aspect_info['name'], description=aspect_info['description']))
                        factors.append(Factor(factor_info['name'], factor_aspects))
                    mood_info = self.test.Mood.find_one({'_id': entry['moodID']})
                    mood = Mood(name=mood_info['name'], weight=mood_info['weight'])
                    date = entry['dateAdded']
                    user_aspects = []
                    for a in entry['aspects']:
                        aspect_info = self.test.Aspect.find_one({'_id': a['aspectID']})
                        user_aspects.append(UserAspect(name=aspect_info['name'], description=aspect_info['description'], score=a['score']))
                    entries.append(
                        Entry(
                            factors=factors,
                            mood=mood,
                            aspects=user_aspects,
                            date=entry['dateAdded']
                        )
                    )
                count += 1
        except IndexError as e:
            print('Range not aligned with entries')
        except StopIteration as e:
            print('Stop Iteration')
        return entries

    def insert_entry(self, email, entry):
        """Obtain entires filtered by a specific aspect and range

        Parameters
        ----------
        email : str
            A user's email
        range : range
            range object to specify the range of entries

        Returns
        -------
        entries : list
            List of user's Entry objects
        """
        user = self.test.User.find_one({'email': email})
        updated_user_aspects = user['aspects']
        mood = self.test.Mood.find_one({'name': entry.get_mood().get_name()})
        mood_weight = mood['weight']
        mood_id = mood['_id']
        new_aspects = {}
        factor_ids = []
        # Update aspect values
        for factor in entry.get_factors():
            factor_info = self.test.Factor.find_one({'name': factor.get_name()})
            factor_ids.append(factor_info['_id'])
            for aspect_id in factor_info['aspectIDs']:
                # Get score
                for i, aspect in enumerate(updated_user_aspects):
                    if aspect['id'] == aspect_id:
                        current_score = aspect['score']
                        current_count = aspect['count']
                        new_count = current_count + 1
                        new_score = (current_score + mood_weight)/new_count
                        updated_user_aspects[i]['score'] = new_score
                        updated_user_aspects[i]['count'] = new_count
                        new_aspects[aspect_id] = new_score
                        break
        # Create entry
        aspects = []
        for aspect_id in new_aspects:
            for updated_aspect in updated_user_aspects:
                if updated_aspect['id'] == aspect_id:
                    aspects.append({
                        'aspectID': aspect_id,
                        'score': updated_aspect['score']
                    })
                    break
        # Update user entry
        new_entry = {
            'dateAdded': entry.get_date(),
            'moodID': mood_id,
            'factorIDs': factor_ids,
            'aspects': aspects
        }
        self.test.User.update_one({'email': email}, {'$push': {'entries': new_entry}}, upsert=True)
        # Update User aspects
        self.test.User.update_one({'email': email}, {'$set': {'aspects': updated_user_aspects}})
        # Return updated aspects
        aspect_dict = {}
        for aspect_id in new_aspects:
            aspect_name = self.test.Aspect.find_one({'_id': aspect_id})['name']
            aspect_dict[aspect_name] = new_aspects[aspect_id]
        return aspect_dict

    def create_user(self, email):
        """Insert a user into the database if the email does not exist

        Parameters
        ----------
        email : str
            A user's email
        """
        aspects = []
        aspects_cursor = self.test.Aspect.find()
        for aspect in aspects_cursor:
            aspects.append({
                'id': aspect['_id'],
                'count': 0,
                'score': 0.0
            })
        self.test.User.update(
            {'email': email},
            {'$setOnInsert': {
                    'email': email,
                    'entries': [],
                    'aspects': aspects
                }
            },
            upsert=True
        )

