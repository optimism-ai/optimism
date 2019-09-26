
from flask import Flask
from bson.json_util import dumps
from . import lister

app = Flask(__name__)

@app.route('/api/list/moods')
def get_moods():
    moods = lister.moods()
    def del_uid(m):
        md = m.__dict__
        del md['uid']
        return md
    json_moods = dumps([del_uid(mood) for mood in moods])
    return json_moods

app.run()
