

## Description

Books catalog  home task fo Cynamics

```

## Running the app


$ npm i
$ docker-compose -p books_catalog -f docker-compose.yml up postgres pgadmin4 -d
$ npx prisma migrate dev --name init
$ npm start
