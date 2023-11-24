import express, { Express } from 'express';
import 'dotenv/config';
import knex from 'knex';
import path from 'path';
import config from './config/knexfile';
import { Model } from 'objection';
import { routeNotFound } from './utils/routeNotFound';
import { appRouter } from './config/routes';
import { apiRouter } from './config/routes';

const app: Express = express();
const port = process.env.PORT || 4000;

// connect db postgres client
Model.knex(knex(config.development));

app.set('views', path.join(process.cwd(), 'src', 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(process.cwd(), 'src', 'public')));
app.use(express.json());
// inisiasi route
app.use(appRouter);
app.use(apiRouter);

app.all('*', routeNotFound);

app.listen(port, () => {
  console.log(`server listen on http://localhost:${port}`);
});
