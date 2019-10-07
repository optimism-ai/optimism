
from .models import Mood, Aspect
from .storage import Repository

class Lister:
    '''Service for listing objects
    
    Attributes
    ----------
    repo : 
    '''
    repo = None
    
    def __init__(self, repo):
        if not issubclass(type(repo), Repository):
            raise Exception(f'{str(type(repo))} is not subclass of {str(Repository.__name__)}')
        self.repo = repo

    def moods(self):
        moods = []
        repo_moods = self.repo.get_moods()
        for repo_mood in repo_moods:
            moods.append(Mood(repo_mood.name, repo_mood.level))
        return moods
