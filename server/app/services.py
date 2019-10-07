
from .models import Mood, Aspect

class Lister:
    '''Service for listing objects
    
    Attributes
    ----------
    repo : 
    '''
    repo = None
    
    def __init__(self, repo):
        self.repo = repo

    def moods(self):
        moods = []
        repo_moods = self.repo.get_moods()
        for repo_mood in repo_moods:
            moods.append(Mood(repo_mood.name, repo_mood.level))
        return moods
