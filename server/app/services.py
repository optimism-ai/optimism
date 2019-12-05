
from .storage import Repository
from .storage.models import Aspect

class Lister:
    """Service for listing objects
    
    Attributes
    ----------
    repo : subclass of Repository
        Repository that lister will interface with in order to construct models
    """

    repo = None
    
    def __init__(self, repo):
        """Associates Lister with a repository

        Parameters
        ----------
        repo : Repository
            Repository that will be assigned to the attribute 'repo'

        Raises
        ------
        TypeError
            if 'repo' is not subclass of abstract class Repository
        """
        if not issubclass(type(repo), Repository):
            raise TypeError(f'{str(type(repo))} is not subclass of {str(Repository.__name__)}')
        self.repo = repo

    def get_moods(self):
        """Obtain all Moods objects

        Returns
        -------
        moods : list
            List of all Mood objects in the system
        """
        moods = self.repo.get_moods()
        return moods

    def get_aspects(self, email=None):
        """Obtain all Aspects objects

        If an email is specified, a list of UserAspects is obtained

        Parameters
        ----------
        email : str
            Email of a user

        Returns
        -------
        aspects : list
            List of user's aspects
        """
        aspects = []
        if email:
            aspects = self.repo.get_user_aspects(email)
        else:
            aspects = self.repo.get_aspects()
        return aspects

    def get_entries(self, email=None, aspect=None, range=None):
        """Obtain Entry object specified by the criteria of the parameters

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
            List of user's entries
        """
        entires = []
        if not email:
            raise ValueError('Parameter "email" must have a value')
        if not range:
            raise ValueError('Parameter "range" must be valid')
        if not aspect and not range:
            raise ValueError('Parameters "aspect" or "range" must contain a value')
        if aspect and not range:
            raise ValueError('Parameter "range" must be set along with "aspect"')
        if aspect and range:
            return self.repo.get_entries_by_aspect(email, Aspect(name=aspect), range_=range)
        if range:
            return self.repo.get_entries_by_range(email, range_=range)

class Adder:
    repo = None
    
    def __init__(self, repo):
        """Associates Adder with a repository

        Parameters
        ----------
        repo : Repository
            Repository that will be assigned to the attribute 'repo'

        Raises
        ------
        TypeError
            if 'repo' is not subclass of abstract class Repository
        """
        if not issubclass(type(repo), Repository):
            raise TypeError(f'{str(type(repo))} is not subclass of {str(Repository.__name__)}')
        self.repo = repo

    def insert_entry(self, email, entry):
        """Insert an entry into the db

        Parameters
        ----------
        email : str
            A user's email
        entry : Entry
            Entry object to be inserted into the db
        """
        return self.repo.insert_entry(email, entry)

    def register_user(self, email):
        """Adds user to db if email does not exist

        Parameters
        ----------
        email : str
            A user's email
        """
        return self.repo.create_user(email)

