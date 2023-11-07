# RESTful API Car Management

## How to use?

```
$ npm install
$ npm run dev # run development!
```

## Scripts

```
$ npm run build # build typescript project
$ npm run dev # run in development mode
```

## Database

```
$ docker compose up -d # run database
$ docker compose down -v # delete database and the volume
```

### Config knex

```
$ npx knex migrate:make namaMigration --knexfile src/config/knexfile.ts # membuat migration
$ npm run migrate # menjalankan migration
$ npx knex seed:make namaSeed --knexfile src/config/knexfile.ts # membuat seed
$ npm run seed # menjalankan seed
```

## Endpoint API

## Response
