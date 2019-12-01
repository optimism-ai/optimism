
from .models import Mood, Aspect
from .storage import Repository

class Lister:
    '''Service for listing objects
    
    Attributes
    ----------
    repo : subclass of Repository
        Repository that lister will interface with in order to construct models
    '''

    repo = None
    
    def __init__(self, repo):
        '''Associates Lister with a repository

        Parameters
        ----------
        repo : Repository
            Repository that will be assigned to the attribute 'repo'

        Raises
        ------
        TypeError
            if 'repo' is not subclass of abstract class Repository
        '''
        if not issubclass(type(repo), Repository):
            raise TypeError(f'{str(type(repo))} is not subclass of {str(Repository.__name__)}')
        self.repo = repo

    def all_moods(self):
        '''Obtain all Moods objects

        Returns
        -------
        moods : list
            List of all Mood objects in the system
        '''
        moods = []
        repo_moods = self.repo.get_moods()
        for repo_mood in repo_moods:
            moods.append(Mood(repo_mood.name, repo_mood.weight))
        return moods

    def all_aspects(self):
        '''Obtain all Aspects objects

        Returns
        -------
        aspects : list
            List of all Aspect objects in the system
        '''
        aspects = []
        repo_aspects = self.repo.get_aspects()
        for repo_aspect in repo_aspects:
            aspects.append(Aspect(repo_aspect.name, repo_aspect.description))
        return aspects
