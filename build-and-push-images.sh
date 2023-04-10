#!/bin/bash

##############################
# This builds and pushes both the nginx/React image
# and the DRF one.  
#
# The nginx/React image gets built with an environment variable
# that sets the url of the DRF backend REACT_APP_BASE_URL.  Once you
# know the IP address of your EC2 instance, you would pass that in
# instead of localhost
##############################

BASE_URL=$1
MAPS_API_KEY=$2
CLIENT_ID=$3
CLIENT_SECRET=$4
AVIS_CLIENT_ID=$5
AVIS_CLIENT_SECRET=$6
GPT_API_KEY=$7
NEW_VERSION=$8

docker buildx build --platform linux/amd64 --build-arg REACT_APP_BASE_URL=$BASE_URL --build-arg REACT_APP_MAPS_API_KEY=$MAPS_API_KEY --build-arg REACT_APP_CLIENT_ID=$CLIENT_ID --build-arg REACT_APP_CLIENT_SECRET=$CLIENT_SECRET --build-arg REACT_APP_AVIS_CLIENT_ID=$AVIS_CLIENT_ID --build-arg REACT_APP_AVIS_CLIENT_SECRET=$AVIS_CLIENT_SECRET --build-arg REACT_APP_GPT_API_KEY=$GPT_API_KEY -t kasibhub/moose-webserver-prod:$NEW_VERSION -f webserver/Dockerfile . --no-cache
docker push kasibhub/moose-webserver-prod:$NEW_VERSION

docker buildx build --platform linux/amd64  -t kasibhub/moose-backend-prod:$NEW_VERSION -f backend/Dockerfile ./backend --no-cache
docker push kasibhub/moose-backend-prod:$NEW_VERSION