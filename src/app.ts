import express, { Express } from 'express';
import 'dotenv/config';
import config from './config/knexfile';
import upload from './config/multer';
import { Model } from 'objection';
import knex from 'knex';
import { deleteCar, deleteCarById, editCar, getAllCar, getDetailCar, routeNotFound, saveCar } from './handler';

const app: Express = express();
const port = process.env.PORT || 4000;

// connect db postgres client
Model.knex(knex(config.development));

app.use(express.json());

app.post('/cars', upload.single('image'), saveCar);

app.get('/cars', getAllCar);

app.get('/cars/:id', getDetailCar);

app.patch('/cars/:id', editCar);

app.delete('/cars', deleteCar);

app.delete('/cars/:id', deleteCarById);

app.all('*', routeNotFound);

app.listen(port, () => {
    console.log(`server listen on http://localhost:${port}`);
});
