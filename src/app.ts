import express, { Express } from 'express';
import 'dotenv/config';
import config from './config/knexfile';
import upload from './config/multer';
import { Model } from 'objection';
import knex from 'knex';
import path from 'path';
import { CarService } from './services/CarService';
import { routeNotFound } from './utils/routeNotFound';

const app: Express = express();
const port = process.env.PORT || 4000;

// connect db postgres client
Model.knex(knex(config.development));

app.set('views', path.join(process.cwd(), 'src', 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(process.cwd(), 'src', 'public')));
app.use(express.json());

app.get('/', CarService.landingPage);

app.get('/cars', CarService.searchCars);

app.post('/api/v1/cars', upload.single('image'), CarService.saveCar);

app.get('/api/v1/cars', CarService.getAllCar);

app.get('/api/v1/cars/:id', CarService.getDetailCar);

app.patch('/api/v1/cars/:id', CarService.editCar);

app.delete('/api/v1/cars', CarService.deleteCar);

app.delete('/api/v1/cars/:id', CarService.deleteCarById);

app.all('*', routeNotFound);

app.listen(port, () => {
  console.log(`server listen on http://localhost:${port}`);
});
