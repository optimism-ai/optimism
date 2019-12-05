
from .storage import MongoDB
from .services import Lister, Adder
import os

ALGORITHMS = ["RS256"]
AUTH0_DOMAIN = os.getenv("OPTIMISM_AUTH0_DOMAIN")
API_IDENTIFIER = os.getenv("OPTIMISM_API_IDENTIFIER")
URI = f'mongodb://{os.getenv("OPTIMISM_DB_USER")}:{os.getenv("OPTIMISM_DB_PASSWORD")}@{os.getenv("OPTIMISM_DB_HOST")}:{os.getenv("OPTIMISM_DB_PORT")}/{os.getenv("OPTIMISM_DB_NAME")}'

repo = MongoDB(URI)
lister = Lister(repo)
adder = Adder(repo)
