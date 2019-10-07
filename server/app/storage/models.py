
class Mood:
    '''Representation of the Mood entity

    A mood can range from:
        - awful
        - bad
        - alright
        - good
        - awesome

    where each mood is mapped to a certain level:
        - awful   : -2
        - bad     : -1
        - alright :  0
        - good    :  1
        - awesome :  2

    Attributes
    ----------
    _id : str
        Unique hash mapping to a mood
    name : str
        Name of the mood (e.g. good)
    level : int
        How much the mood influences one's aspect of life
    '''
    def __init__(self, _id, name, level):
        '''Initializes Mood object'''
        self._id = _id
        self.name = name
        self.level = level

class Aspect:
    '''Representation of Aspect entity

    An aspect is component of one's life. These aspects of life are:
        - Work
        - Learning
        - Health
        - Social
        - Media
        - Mental

    Each user will have their own aspect of life, in which are tied to 
    a score that is influenced by their mood entries.

    Attributes
    ----------
    _id : str
        Unique hash for a specific aspect
    name : str
        Name of the aspect of life (e.g. Mental)
    description : str
        Descriptor of the aspect
    '''

    def __init__(self, _id, name, description):
        '''Initializes Aspect object'''
        self._id = _id
        self.name = name
        self.description = description


