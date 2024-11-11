# Home Library Service

## Description

It's a Home Library Service! Users can create, read, update, delete data about Artists, Tracks and Albums, add them to Favorites in their own Home Library!

## Prerequisites

- Install [Node.js](https://nodejs.org/en/download/package-manager) (version 22.9.0 or higher) and the npm package manager.
- Git - [Download & Install Git](https://git-scm.com/downloads).
- Clone this repository: git clone https://github.com/Kate-Shepel/nodejs2024Q3-service
- Switch to `develop-part-1` branch
- To install all dependencies use [`npm install`](https://docs.npmjs.com/cli/install)


## Running application

```
npm start
```

or 

- Production mode
    `npm run start:prod`

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
  http://localhost:4000/track
  http://localhost:4000/artist
  http://localhost:4000/album
  http://localhost:4000/favs
```
More detailed description of application behaviour can be found [here](https://github.com/AlreadyBored/nodejs-assignments/blob/main/assignments/rest-service/assignment.md).

**Important note:** The app database has already default values from the very start for convenience.

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
