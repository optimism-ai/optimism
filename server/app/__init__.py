
from .storage import MongoDB
from .services import Lister

repo = MongoDB()
lister = Lister(repo)

