
class Lister:
    repo = None
    
    def __init__(self, repo):
        self.repo = repo

    def moods(self):
        moods = self.repo.get_moods()
        return moods
