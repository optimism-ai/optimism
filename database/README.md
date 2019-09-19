

# Starting the container

## 1. Build the docker image
```
docker build . -t mongo-optimism
```

## 2. Create a volume on your drive to save data between sessions.
```
mkdir -p ~/docker/volumes/mongo
```

## 3. Run the container
```
docker run --rm -d --name optimism-db \
    -p 27017:27017 \
    -v $HOME/docker/volumes/mongo:/data/db \
    mongo-optimism
```

# Interface with the database

## 1. Go inside of the container
```
docker exec -it optimism-db bash
```

## 2. Launch mongo
```
mongo -u admin -p password
```

## 3. Go into the test database
```
use test
```

## 4. Show all collections and display user test data
```
show collections
db.User.find()
```

