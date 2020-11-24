# Nyma game

Version: v.1.0.0

[Nyma live](https://nyma-game.herokuapp.com/)

## Overview

Nyma is a Zuma game clone developed from scratch as a part of [Middle Front End Developer course by Yandex Practicum](https://praktikum.yandex.ru/middle-frontend/).

It is a classic tile-matching puzzle video-game. The goal of Nyma is to eliminate all of the balls rolling around the screen along a given path before these balls reach the skull structure. The player can eliminate the balls by firing a colored ball from the stone frog's mouth towards the chain of balls. When three or more of the same color come in contact, they explode, possibly triggering other explosions as part of a chain reaction. The color of the ball to fire is visible in the frog's mouth, and also the next coming ball is visible in the frog's head.

At the end of the game the total amount of points is calculated and displayed to the user. The user can also view the Leaderboard page to see their rank among other players.

## Technologies

  - Webpack for script bundling and serving
  - HTML5 Canvas for graphics rendering
  - React + Typescript for building webpages and game logic

## Install

Install the dependencies first:
```
npm install
```

Then run the app in development mode:
```
npm start
```
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

<br>

Or build the app for production to the `dist` folder.
```
npm run build
```
It correctly bundles React in production mode and optimizes the build for the best performance.
The build is minified.

Your app is ready to be deployed!

To start Express server to serve static files from /dist use
```
npm run start:prod
```
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Docker container

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

## Development Team
   - [Inna Lytkina](https://github.com/innayarantseva)
   - [Vadim Konchik](https://github.com/elfexor)
   - [Irina Tishchenko](https://github.com/IrinaT1)

