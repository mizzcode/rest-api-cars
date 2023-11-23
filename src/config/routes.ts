import express from 'express';
import upload from './multer';
import { authToken } from '../middlewares/authToken';
import { MainController } from '../controllers/web/main';
import { CarsController } from '../controllers/api/v1/cars';
import { UsersController } from '../controllers/api/v1/users';
import swaggerUI from 'swagger-ui-express';
import { swaggerSpec } from '../docs/generate-swagger';

const appRouter = express.Router();
const apiRouter = express.Router();

const mainController = new MainController();
const carsController = new CarsController();
const usersController = new UsersController();

appRouter.get('/', authToken, mainController.index);
appRouter.get('/cars', authToken, mainController.searchCars);

apiRouter.get('/api/v1/cars', authToken, carsController.getCarAll);
apiRouter.delete('/api/v1/cars', authToken, carsController.deleteCar);
apiRouter.get('/api/v1/cars/:id', authToken, carsController.getDetailCar);
apiRouter.patch('/api/v1/cars/:id', authToken, carsController.patchEditCar);
apiRouter.delete('/api/v1/cars/:id', authToken, carsController.deleteCarById);
apiRouter.post('/api/v1/cars', authToken, upload.single('image'), carsController.postSaveCar);

/**
 * @openapi
 * /api/v1/users/login:
 *  post:
 *    summary: login
 *    description: login
 *    produces:
 *      - application/json
 *    tags:
 *      - auth
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - email
 *              - password
 *            properties:
 *              email:
 *                type: string
 *                format: email
 *                example: manda@mail.com
 *              password:
 *                type: string;
 *    responses:
 *      '200':
 *        description: login page response
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 */
apiRouter.post('/api/v1/users/login', usersController.login);
apiRouter.post('/api/v1/users/register', usersController.register);
apiRouter.post('/api/v1/users/add', authToken, usersController.addUser);
apiRouter.get('/api/v1/users/profile', authToken, usersController.profile);

// API Docs
apiRouter.use('/api-docs', swaggerUI.serve);
apiRouter.get('/api-docs', swaggerUI.setup(swaggerSpec));

export { appRouter, apiRouter };
