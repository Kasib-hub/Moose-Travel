# A Containerized React and Django Rest Framework Deployment

[For a simplified version without docker compose that just uses a single container](https://github.com/deltaplatoonew/docker-compose-app/tree/simplified)

[For a more complicated version that uses a Postgres container with volume](https://github.com/deltaplatoonew/docker-compose-app/tree/withPostgres)
## Overview
This repo is a model that you can use (or completely dismiss, as you see fit) for creating a production (deployed) version of your entire application.

There are two containers that need to run together for this application to work properly:
1. The DRF/gunicorn container which is the primary API (`/backend`).  
2. The React/nginx container which has the server that serves the static React files and also proxies (forwards) API requests to the DRF/gunicorn API (`/webserver`).

For the sake of simplicity, we are going to use the default sqlite database.  It would not be too much trouble to add a Postgres container to the mix.  Feel free to try it once you get the hang of things.

You might be asking yourself why we should go to all this trouble; this looks complicated.  Part of the answer is that deploying an application is complicated no matter how you do it, and there are indeed many ways to skin that cat.  There is an entire software engineering specialty dedicated largely to this problem: Devops.  If you think you can do it better, then please give it a try.  At the end of the day, you just need a working application somewhere on the internet.

One advantage of using Docker and docker compose, is that your production application should be identical to your development application, no matter where it's running (except for some configuration--localhost vs. an EC2 IP address). 

Here's the basic request/response flow:

![architecture](/readme/architecture.png)

## How to Use This
As you can see there are three folders in this repo:
- `/backend` has your DRF application, along with its corresponding Dockerfile
- `/frontend` has your React application
- `/webserver` has a configuration file for your nginx server and the Dockerfile that builds your React code and configures the server

The rest of the files at the project's root are for putting everything together.  The centerpiece is the [docker-compose](https://docs.docker.com/compose/gettingstarted/) file (in both a development and production version).

Our application has two "services" in docker-compose lingo.  A service is basically a container.  I've somewhat arbitrarily called the DRF container "api", and the React/nginx one "nginx".  The `build` key (and its sub-keys) just tell docker-compose where the Dockerfile is.  So in the case of `docker-compose.dev.yml`, the Dockerfile for "api" is in the `/backend` folder.  It's smart enough to find the Dockerfile in there.  Everything else is optional configuration.  docker-compose uses that configuration to run your image.

```yaml
  api:
    build: ./backend
    ports:
      - "8000:8000"
    environment:
      - SECRET_KEY=$SECRET_KEY
      - DEBUG=$DEBUG
```
is the same as

```bash
docker run -p 8000:8000 -e SECRET_KEY=$SECRET_KEY -e DEBUG=$DEBUG ./backend
```

The `docker-compose.prod.yml` is almost identical, except that it uses pre-built images stored in a Dockerhub account (so that we don't have to copy over all the source code into the EC2 instance).

The other `.sh` scripts are conveniences for running the docker-compose files.
NOTE: You might have to change the file permissions to run the scripts `chmod 755 myscript.sh`.

`run-compose-dev.sh` sets two environment variables used in the docker-compose file, then calls `docker-compose -f docker-compose.dev.yml up`.  "up" starts everything (this might take a while).  And when you're done, you just run `docker-compose -f docker-compose.dev.yml down` (not part of a script, but you can add your own, or maybe a [Makefile](https://medium.com/freestoneinfotech/simplifying-docker-compose-operations-using-makefile-26d451456d63) if you really want to go all out).

Lastly, `build-and-push-images.sh` (which takes two arguments: your EC2 IP address, and the current version of your application, i.e. 1.2) is for pushing up your images to Dockerhub so they can be accessed for the production deployment.


## EC2 Preparation

Create an EC2 instance.

Ensure that you've run `build-and-push-images.sh <MY_EC2_IP_ADDR> <VERSION>`

You'll need to install docker and docker-compose.  The `setup-ec2.sh` script takes care of that.  Before you can run it, you'll have to copy it over, replacing your .pem file and IP address as necessary:
```bash
scp  -i "fullstack.pem" ./setup-ec2.sh ec2-user@ec2-52-91-211-160.compute-1.amazonaws.com:/home/ec2-user
```
Then you will copy over the `run-compose-prod.sh` and `docker-compose.prod.yml` files:
```bash
scp  -i "fullstack.pem" ./run-compose-prod.sh ./docker-compose.prod.yml ec2-user@ec2-52-91-211-160.compute-1.amazonaws.com:/home/ec2-user
```

Now you can run the Docker installation script: `./setup-ec2.sh`.  Exit, and `ssh` in again.


## Deployment

Run `./run-compose-prod.sh "django-insecure-9#4p^u(w3g*72&_34-4yxesg#hqektaofnfpmb^geqlz1%c0jy" False 1.2` (passing in necessary configuration arguments--in this case the SECRET_KEY, DEBUG, and NEW_VERSION values)

## Example Workflow

1. Start EC2 instance, select to allow HTTP traffic, and allow SSH traffic from "My IP", Create new keypair ".pem" file.
2. Download .pem file and put inside your root project file and then run chmod command given from instance GUI Page.
3. Change all docker usernames in the `./build-and-push-images.sh` and `./docker-compose.pord.yml` files.
4. Run `./build-and-push-images.sh <MY_EC2_IP_ADDR> <a VERSION you want>`.
5. In your terminal (outside of ec2 terminal) run:
    a. `scp  -i "fullstack.pem" ./setup-ec2.sh <your ec2 instance name>:/home/ec2-user`
    b. `scp  -i "fullstack.pem" ./run-compose-prod.sh <your ec2 instance name>:/home/ec2-user`
    c. `scp  -i "fullstack.pem" ./docker-compose.prod.yml <your ec2 instance name>:/home/ec2-user`
6. SSH into your ec2 instance and run "`ls`" to ensure all files are copied over to the ec2 instance.
7. Run: `./setup-ec2.sh` inside your ec2 terminal.
8. Exit your ec2 terminal
9. SSH into your ec2 instance and run `./run-compose-prod.sh "<SECRET_KEY>" False <NEW_VERSION>`.
10. Go to the IP address in your browser (ensure it didn't default to https and you're on the http site).