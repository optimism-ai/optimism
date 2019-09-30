
# Running the API

### 1. Create a virtual Python environment

This will allow you to run a local Python environment so you dont have an impact on your global Python environment. This is an optional step.

```
$ python3 -m venv .venv       # Create the virtual environment called '.venv'
$ source .venv/bin/activate   # Activate the virtual environment by sourcing the executable
(.venv) $                     # A (.venv) prompt should appear to indicate you are in your virtual environment
(.venv) $ deactivate          # Run deactivate to exit the virtual environment
$
```

### 2. Install the dependencies

While in your virtual environment, run the following command to install all of the required modules to run the API

```
pip install -r requirements.txt
```

### 3. Export environment varibles
Optimism utilizes [Auth0](http://auth0.com) to authenticate users. Visit the [Auth0](http://auth0.com) website to create a free account and obtain a client id, domain, and client secret id. Then export them as environment variables as detailed below.

```bash
export OPTIMISM_AUTH0_CLIENT_ID=CLIENT_ID                          # Replace with your auth0 client ID
export OPTIMISM_AUTH0_DOMAIN=DOMAIN                                # Replace with your auth0 domain
export OPTIMISM_AUTH0_CLIENT_SECRET=CLIENT_SECRET                  # Replace with your auth0 secret client ID
export OPTIMISM_AUTH0_CALLBACK_URL=http://localhost:3000/callback

### 4. Run the application

```
flask run
```
