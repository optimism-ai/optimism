
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
