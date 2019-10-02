
# Running the API

### 1. Python Virtual Environment (Optional)

Creating a virtual environment will allow you to run a local Python instance so you dont impact your computer's Python. This is an optional step.

```
python3 -m venv .venv       # Create the virtual environment called '.venv'
source .venv/bin/activate   # Activate the virtual environment by sourcing the executable
                            # A (.venv) prompt should appear to indicate you are in your virtual environment
deactivate                  # Run deactivate to exit the virtual environment
```

### 2. Dependencies

Run the following command to install all of the required modules to run the API

```
pip install -r requirements.txt
```

### 3. Configuration
Optimism utilizes [Auth0](http://auth0.com) to authenticate users. Visit the [Auth0](http://auth0.com) website to [create an Auth0 API](https://auth0.com/docs/apis) to obtain an API identifier and Auth0 Domain.

The project needs to be configured with your Auth0 domain and client ID in order for the authentication flow to work.

To do this, first copy .flaskenv.example into a new file in the same folder called .flaskenv, and replace the values with your own Auth0 application credentials:

```
FLASK_APP=app/router.py
FLASK_ENV=development

OPTIMISM_DB_HOST="localhost"
OPTIMISM_DB_PORT="27017"
OPTIMISM_DB_USER="admin"
OPTIMISM_DB_PASSWORD="password"
OPTIMISM_DB_NAME="test"

OPTIMISM_AUTH0_DOMAIN="{YOUR AUTH0 DOMAIN}"
OPTIMISM_API_IDENTIFIER="{YOUR AUTH0 API IDENTIFIER}"
```

### 4. Run the application

```
flask run
```
