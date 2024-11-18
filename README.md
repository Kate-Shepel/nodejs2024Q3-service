# Home Library Service

## Description

It's a Home Library Service! Users can create, read, update, delete data about Artists, Tracks and Albums, add them to Favorites in their own Home Library!

## Prerequisites

- Install [Node.js](https://nodejs.org/en/download/package-manager) (version 22.9.0 or higher) and the npm package manager.
- Install Git [Download & Install Git](https://git-scm.com/downloads).
- Clone this repository: `git clone https://github.com/Kate-Shepel/nodejs2024Q3-service`
- Switch to `develop-part-2` branch
- To install all dependencies use [`npm install`](https://docs.npmjs.com/cli/install)


## To start the docker container

```
npm run docker:build
```
**Important**: the process of building and starting the docker container requires some time

## To clean up resources completely

```
npm run docker:down
```
Stops and removes all containers, networks, and associated resources created by docker-compose. Use this command to clean up resources completely after the app has stopped.

## Port

Default port: 4000

The app is served on `http://localhost:4000`

Port value is stored in `.env` file and can be changed if required.

After starting the app on port you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.

For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Available Endpoints
```
  http://localhost:4000/user
  http://localhost:4000/artist
  http://localhost:4000/track
  http://localhost:4000/album
  http://localhost:4000/favs
```

 `/user`
  - method **GET** /user - to get all users
  - method **GET** /user/:id - to get one user by id
  - method **POST** /user - to create user
  - method **PUT** /user/:id - update user's password
  - method **DELETE** /user/:id - delete user
 `/artist`
  - method **GET** /artist - to get all artists
  - method **GET** /artist/:id - to get one artist by id
  - method **POST** /artist - to create new artist
  - method **PUT** /artist/:id - to update artist info
  - method **DELETE** /artist/:id - to delete album
 `/track`
  - method **GET** /track - to get all tracks
  - method **GET** /track/:id - to get one track by id
  - method **POST** /track - to create new track
  - method **PUT** /track/:id - to update track info
  - method **DELETE** /track/:id - to delete track
 `/album`
  - method **GET** /album - to get all albums
  - method **GET** /album/:id - to get one album by id
  - method **POST** /album - to create new album
  - method **PUT** /album/:id - to update album info
  - method **DELETE** /album/:id - to delete album
 `/favs`
  - method **GET** /favs - to get all favorites
  - method **POST** /favs/track/:id - to add track to the favorites
  - method **DELETE** /favs/track/:id - to delete track from favorites
  - method **POST** /favs/album/:id - to add album to the favorites
  - method **DELETE** /favs/album/:id - to delete album from favorites
  - method **POST** /favs/artist/:id - to add artist to the favorites
  - method **DELETE** /favs/artist/:id - to delete artist from favorites

More detailed description of application behaviour can be found [here](https://github.com/AlreadyBored/nodejs-assignments/blob/main/assignments/rest-service/assignment.md).

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization

```
npm run test:auth -- <path to suite>
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging
