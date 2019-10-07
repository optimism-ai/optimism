
from abc import ABC,abstractmethod 
  
class Repository(ABC): 

    @abstractmethod
    def get_moods(self): 
        pass

    @abstractmethod
    def get_aspects(self):
        pass
