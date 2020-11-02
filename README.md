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

## Development Team
   - [Inna Lytkina](https://github.com/innayarantseva)
   - [Vadim Konchik](https://github.com/elfexor) 
   - [Irina Tishchenko](https://github.com/IrinaT1)
