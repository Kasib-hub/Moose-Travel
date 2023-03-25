#!/bin/sh

# These environment variables come from command line arguments.
# They are consumed by the docker-compose file.
export SECRET_KEY=$1
export DEBUG=$2
export NEW_VERSION=$3

docker-compose -f docker-compose.prod.yml build --no-cache
docker-compose -f docker-compose.prod.yml up 

# make sure the postgres container is ready, then run migrations
sleep 10 
docker exec ec2-user-api-1 python /src/manage.py makemigrations 
docker exec ec2-user-api-1 python /src/manage.py migrate