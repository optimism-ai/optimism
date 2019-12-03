
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
    name : str
        Name of the mood (e.g. good)
    weight : int
        How much the mood influences one's aspect of life

    Methods
    -------
    get_name()
        returns the name of the mood
    get_weight()
        returns the weight of the mood
    '''
    def __init__(self, name=None, weight=None):
        '''Initializes Mood object
        '''
        self.name = name
        self.weight = weight

    def get_name(self):
        '''Return the name of the Mood
        '''
        return self.name

    def get_weight(self):
        '''Return the weight of the Mood
        '''
        return self.weight

class Aspect:
    '''Representation of Aspect entity

    An aspect is component of one's life. These aspects of life are:
        - Work
        - Learning
        - Health
        - Social
        - Media
        - Mental

    Attributes
    ----------
    name : str
        Name of the aspect of life (e.g. Mental)
    description : str
        Descriptor of the aspect

    Methods
    -------
    get_name()
        returns the name of the aspect
    get_description()
        returns the description of the aspect
    '''

    def __init__(self, name=None, description=None):
        '''Initializes Aspect object
        '''
        self.name = name
        self.description = description

    def get_name(self):
        '''Return the name of the Aspect
        '''
        return self.name

class UserAspect(Aspect):
    """Aspect ties to a User, inherited from Aspect class

    Each user will have their own aspect of life, in which are tied to 
    a score that is influenced by their mood entries.

    Attributes
    ----------
    name : str
        Name of the aspect of life (e.g. Mental)
    description : str
        Descriptor of the aspect
    score : float
        Value that represents an aspect's state. Influenced by their
        mood entries

    Methods
    -------
    get_score()
        returns the score of the aspect
    """
    def __init__(self, name=None, description=None, score=None):
        """Initializes UserAspect object. Calls super class and initializes
        it as well
        """
        self.name = name
        self.description = description
        self.score = score

    def get_score(self):
        """Return the score of the Aspect
        """
        return self.score

class Factor:
    '''Representation of Factor entity

    A factor is an activity that impacts an aspect of one's life

    Attributes
    ----------
    description : str
        Descriptor of the aspect
    aspects : list
        list of Aspects that the factor influences

    Methods
    -------
    get_description()
        returns the description of the factor

    get_aspects()
        returns the aspects the factor influences
    '''

    def __init__(self, description=None, aspects=[]):
        '''Initializes Factor object
        '''
        self.description = description
        self.aspects = aspects

    def get_description(self):
        '''Return the description of the factor
        '''
        return self.description

    def get_aspects(self):
        '''Return the aspects that are influenced by the factor
        '''
        return self.aspects

class Entry:
    """Representation of a log Entry

    A user creates an entry to help identify how they are performing
    in certain aspects of their lives.

    Attributes
    ----------
    factors : list
        list of Factors that the user chose upon creating an entry
    aspects : list
        list of UserAspects that were influenced
    mood : Mood
        Mood object representing how the user felt from the factors
    date : datetime
        datetime object. Timestamp of when the entry was made

    Methods
    -------
    get_factors()
        returns list of factors

    get_aspects()
        returns list of aspects
    
    get_mood()
        returns the mood
        
    get_date()
        returns the date
    """
    def __init__(self, factors, mood, aspects, date):
        '''Initializes Entry object
        '''
        self.factors = factors
        self.mood = mood
        self.aspects = aspects
        self.date = date

    def get_factors(self):
        '''Return the factors that influences the aspects
        '''
        return self.factors

    def get_aspects(self):
        '''Return the list aspects
        '''
        return self.aspects

    def get_mood(self):
        '''Return the mood
        '''
        return self.mood

    def get_date(self):
        '''Return the date of the entry
        '''
        return self.date.strftime("%m/%d/%Y, %I:%M %p")

