# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone {repository URL}
```

## Installing NPM modules

```
npm install
```

## Running application

Add `.env` file with following content: 
```
PORT=4000

POSTGRES_PORT=5432
POSTGRES_HOST=postgres
POSTGRES_DB=postgres
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres

```


## Start docker containers

```
docker compose up --build
```


After starting the app on port (4000 as default).

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

## Scan vulnerabilities

```
npm run scan:vulnerabilities
```
