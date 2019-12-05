
from abc import ABC,abstractmethod 
  
class Repository(ABC): 

    @abstractmethod
    def get_moods(self): 
        '''Obtain all moods
        '''
        pass

    @abstractmethod
    def get_aspects(self):
        '''Obtain all aspects
        '''
        pass

    @abstractmethod
    def get_user_aspects(self):
        '''Obtain aspects of a user
        '''
        pass

    @abstractmethod
    def get_entries_by_range(self):
        '''Obtain entries of a user with specified range
        '''
        pass

    @abstractmethod
    def get_entries_by_aspect(self):
        '''Obtain aspects of a user with a specified aspect and range
        '''
        pass

    @abstractmethod
    def insert_entry(self):
        '''Insert a user entry
        '''
        pass

    @abstractmethod
    def create_user(self, email):
        '''Insert a user
        '''
        pass
