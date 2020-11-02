# Nyma
A fun and mischievous game

Check it out — [https://nyma-game.herokuapp.com/](https://nyma-game.herokuapp.com/) :)

## Installation

```
# clone source code
git clone git@github.com:New-York-Praktikum-Team/game-frontend.git

# change directory
cd game-frontend

# install dependencies with fixed versions
npm ci
```

### Development mode

```
# run app in development mode
npm start
```

App is ready to use at [http://localhost:3000](http://localhost:3000)

### Production mode

```
# compile source code for production
npm run build

# start Express server to serve static files from /dist
npm run start:prod
```

By default, app is served at [http://localhost:3000](http://localhost:3000)

### Docker container

Docker container is used for app deployment to Heroku.

To build and run docker container locally, use commands provided below. You need to have Docker Desktop client installed. Please register and download distribs on [official Docker site](https://www.docker.com/).

All the commands executes from root directory of the project.

```
# build docker image named nyma
docker build --tag nyma .

# run docker image nyma with container name nyma-game at port 80.
# Docker will be published at port 8080.
docker run --name nyma-game --publish 8080:80 nyma

# stop nyma-game container
docker container stop nyma-game
```

By default, app is served at [http://localhost:8080](http://localhost:8080)

### Heroku deployment

To deply the app, you need to have Heroku CLI installed and be registered at its official site. Please use the official guide for [getting started on Heroku](https://devcenter.heroku.com/articles/getting-started-with-nodejs).

```
# login to Heroku if not yet
heroku container:login

# push docker image from repository
heroku container:push web

# release new version
heroku container:release web

# open deployed app
heroku open

# another useful commands
heroku logs # show logs
heroku restart # restar service
heroku releases #  list of all releases
```

## Contibuting

To be done.

## Team behind the game :)

To be done.
