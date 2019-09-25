
# Running the API

### 1. Export environment variables

In your terminal run the following command to set local environment variables. This will allow the API to connect to the database, as the source code references these.

```
export OPTIMISM_DB_HOST="localhost"
export OPTIMISM_DB_PORT="27017"
export OPTIMISM_DB_USER="admin"
export OPTIMISM_DB_PASSWORD="password"
export OPTIMISM_DB_NAME="test"
```

### 2. Create a virtual Python environment

This will allow you to run a local Python environment so you dont have an impact on your global Python environment. This is an optional step.

```
$ python3 -m venv .venv       # Create the virtual environment called '.venv'
$ source .venv/bin/activate   # Activate the virtual environment by sourcing the executable
(.venv) $                     # A (.venv) prompt should appear to indicate you are in your virtual environment
(.venv) $ deactivate          # Run deactivate to exit the virtual environment
$
```

### 3. Install the dependencies

While in your virtual environment, run the following command to install all of the required modules to run the API

```
pip install -r requirements.txt
```
