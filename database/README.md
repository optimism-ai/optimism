
### These instructions might not work, haven't tested them just yet...

`docker pull mongo`  

`mkdir -p ~/docker/volumes/mongo`  

```
docker run --rm -d --name mongo-optimism  \
    --env-file ./database/env.list \
    -p 27017:27017 \
    -v $HOME/docker/volumes/mongo:/data/db \
    -v $PWD/database/mongo-init.js:/docker-entrypoint-initdb.d/mongo-init.js \
    mongo
```

