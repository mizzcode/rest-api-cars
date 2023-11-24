import express from 'express';
import upload from './multer';
import { authToken } from '../middlewares/authToken';
import { MainController } from '../controllers/web/main';
import { CarsController } from '../controllers/api/v1/cars';
import { UsersController } from '../controllers/api/v1/users';
import { swaggerSpec } from '../utils/swagger';
import swaggerUI from 'swagger-ui-express';

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
 *    summary: Login a user
 *    description: Login for role superadmin and admin
 *    tags:
 *      - Users
 *    requestBody:
 *      required: true
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
 *                example: mizz@gmail.com
 *              password:
 *                type: string
 *    responses:
 *      200:
 *        description: OK
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                token:
 *                  type: string
 *      400:
 *        description: Bad Request
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: Email or Password is wrong
 */
apiRouter.post('/api/v1/users/login', usersController.login);

/**
 * @openapi
 * /api/v1/users/register:
 *  post:
 *    summary: Register a user
 *    description: Register for role member
 *    tags:
 *      - Users
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - email
 *              - name
 *              - password
 *            properties:
 *              email:
 *                type: string
 *                format: email
 *                example: mizz@gmail.com
 *              name:
 *                type: string
 *                example: Misbah
 *              password:
 *                type: string
 *    responses:
 *      201:
 *        description: Create a new user
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                user:
 *                  type: object
 *                  properties:
 *                    email:
 *                      type: string
 *                      format: email
 *                    name:
 *                      type: string
 *                    password:
 *                      type: string
 *                    id:
 *                      type: number
 *                    role:
 *                      type: string
 *      409:
 *        description: Conflict
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: Email already exist
 */
apiRouter.post('/api/v1/users/register', usersController.register);
apiRouter.post('/api/v1/users/add', authToken, usersController.addUser);
apiRouter.get('/api/v1/users/profile', authToken, usersController.profile);

apiRouter.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

export { appRouter, apiRouter };
