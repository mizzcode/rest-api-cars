import express, { Express } from 'express';
import 'dotenv/config';
import config from './config/knexfile';
import upload from './config/multer';
import { Model } from 'objection';
import knex from 'knex';
import {
  deleteCar,
  deleteCarById,
  editCar,
  getAllCar,
  getDetailCar,
  landingPage,
  routeNotFound,
  saveCar,
  searchCars,
} from './handler';
import path from 'path';

const app: Express = express();
const port = process.env.PORT || 4000;

// connect db postgres client
Model.knex(knex(config.development));

app.set('views', path.join(process.cwd(), 'src', 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(process.cwd(), 'src', 'public')));
app.use(express.json());

app.get('/', landingPage);

app.get('/cars', searchCars);

app.post('/api/v1/cars', upload.single('image'), saveCar);

app.get('/api/v1/cars', getAllCar);

app.get('/api/v1/cars/:id', getDetailCar);

app.patch('/api/v1/cars/:id', editCar);

app.delete('/api/v1/cars', deleteCar);

app.delete('/api/v1/cars/:id', deleteCarById);

app.all('*', routeNotFound);

app.listen(port, () => {
  console.log(`server listen on http://localhost:${port}`);
});
