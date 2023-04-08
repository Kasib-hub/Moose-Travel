# Moose Travel
Welcome to our travel app! This app is designed to help users easily search for flights, rental cars, and hotels, as well as explore activities and attractions at their destination.

## Features
* Search for flights, rental cars, and hotels
* Explore activities and attractions at your destination
* View your itineraries in your dashboard after you log in
* Access destination guides and travel tips

## Getting Started
To get started with the app, simply clone the repository and run it on your local machine. You will need to have Node. js and NPM installed on your machine.

* Clone the repository: git clone https://github.com/Kasib-hub/Moose-Travel.git
* Install dependencies: npm install
* create .env file in both frontend and backend folders, you will need `SECRET_KEY` for backend's .env, and `REACT_APP_BASE_URL` for frontend's .env file.
        1. `SECRET_KEY`: Created by yourself
        2. `REACT_APP_BASE_URL`: It's the url from running Django REST 
* Run the app: npm start

**OR**

The repo contains docker files that allow you to run the app by Docker locally

* Make sure you have downloaded Docker on your machine. If not, you can download it at [Docker](https://www.docker.com/)
* Navigate to the root directory of this project - **Moose-Travel**
  - `/backend` has your DRF application, along with its corresponding Dockerfile
  - `/frontend` has your React application
  - `/webserver` has a configuration file for your nginx server and the Dockerfile that builds your React code and configur the server
* 
## Technologies Used
* Python 
* Django REST
* React.js
* Node.js
* HTML/CSS
* Docker






