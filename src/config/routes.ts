import express from 'express'
import upload from './multer'
import { authToken } from '../middlewares/authToken'
import { MainController } from '../controllers/web/main'
import { CarsController } from '../controllers/api/v1/cars'
import { UsersController } from '../controllers/api/v1/users'
import { swaggerSpec } from '../utils/swagger'
import swaggerUI from 'swagger-ui-express'

const appRouter = express.Router()
const apiRouter = express.Router()

const mainController = new MainController()
const carsController = new CarsController()
const usersController = new UsersController()

appRouter.get('/', authToken, mainController.index)
appRouter.get('/cars', authToken, mainController.searchCars)

/**
 * @openapi
 * /api/v1/cars:
 *  get:
 *    summary: Get all car
 *    description: Get all car
 *    tags:
 *      - Cars
 *    security:
 *      - bearerAuth: []
 *    responses:
 *      200:
 *        description: OK
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                type: object
 *                properties:
 *                 id:
 *                  type: string
 *                 plate:
 *                  type: string
 *                 manufacture:
 *                  type: string
 *                 model:
 *                  type: string
 *                 image:
 *                  type: string
 *                 rentPerDay:
 *                  type: number
 *                 capacity:
 *                  type: number
 *                 description:
 *                  type: string
 *                 availableAt:
 *                  type: date
 *                 transmission:
 *                  type: string
 *                 available:
 *                  type: boolean
 *                 type:
 *                  type: string
 *                 year:
 *                  type: number
 *                 options:
 *                  type: array
 *                  items:
 *                    type: string
 *                 specs:
 *                  type: array
 *                  items:
 *                    type: string
 *                 created_by:
 *                  type: string
 *                 updated_by:
 *                  type: string
 *      401:
 *        description: Unauthorized
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: Invalid Token
 */
apiRouter.get('/api/v1/cars', carsController.getCarAll)

/**
 * @openapi
 * /api/v1/cars:
 *  delete:
 *    summary: Delete all car
 *    description: Delete all car
 *    tags:
 *      - Cars
 *    security:
 *      - bearerAuth: []
 *    responses:
 *      200:
 *        description: OK
 *        content:
 *          application/json:
 *            schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 *                 statusCode:
 *                   type: number
 *      401:
 *        description: Unauthorized
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: Invalid Token
 */
apiRouter.delete('/api/v1/cars', authToken, carsController.deleteCar)

/**
 * @openapi
 * /api/v1/cars/{id}:
 *  get:
 *    summary: Get detail car
 *    description: Get detail car
 *    tags:
 *      - Cars
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *          format: uuid
 *        description: UUID of car
 *    responses:
 *      200:
 *        description: OK
 *        content:
 *          application/json:
 *            schema:
 *                type: object
 *                properties:
 *                 id:
 *                  type: string
 *                 plate:
 *                  type: string
 *                 manufacture:
 *                  type: string
 *                 model:
 *                  type: string
 *                 image:
 *                  type: string
 *                 rentPerDay:
 *                  type: number
 *                 capacity:
 *                  type: number
 *                 description:
 *                  type: string
 *                 availableAt:
 *                  type: date
 *                 transmission:
 *                  type: string
 *                 available:
 *                  type: boolean
 *                 type:
 *                  type: string
 *                 year:
 *                  type: number
 *                 options:
 *                  type: array
 *                  items:
 *                    type: string
 *                 specs:
 *                  type: array
 *                  items:
 *                    type: string
 *                 created_by:
 *                  type: string
 *                 updated_by:
 *                  type: string
 *      401:
 *        description: Unauthorized
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: Invalid Token
 */
apiRouter.get('/api/v1/cars/:id', authToken, carsController.getDetailCar)

/**
 * @openapi
 * /api/v1/cars/{id}:
 *  patch:
 *    summary: Update car
 *    description: Delete car by id
 *    tags:
 *      - Cars
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *          format: uuid
 *        description: UUID of car
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/jsonBodyCar'
 *    responses:
 *      200:
 *        description: OK
 *        content:
 *          application/json:
 *            schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 *                 statusCode:
 *                   type: number
 *      401:
 *        description: Unauthorized
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: Invalid Token
 */
apiRouter.patch('/api/v1/cars/:id', authToken, carsController.patchEditCar)

/**
 * @openapi
 * /api/v1/cars/{id}:
 *  delete:
 *    summary: Delete car
 *    description: Delete car by id
 *    tags:
 *      - Cars
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *          format: uuid
 *        description: UUID of car
 *    responses:
 *      200:
 *        description: OK
 *        content:
 *          application/json:
 *            schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 *                 statusCode:
 *                   type: number
 *      401:
 *        description: Unauthorized
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: Invalid Token
 */
apiRouter.delete('/api/v1/cars/:id', authToken, carsController.deleteCarById)

/**
 * @openapi
 * /api/v1/cars:
 *  post:
 *    summary: Create a new car
 *    description: Create a new car
 *    tags:
 *      - Cars
 *    security:
 *      - bearerAuth: []
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/jsonBodyCar'
 *    responses:
 *      200:
 *        description: OK
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                type: object
 *                properties:
 *                 id:
 *                  type: string
 *                 plate:
 *                  type: string
 *                 manufacture:
 *                  type: string
 *                 model:
 *                  type: string
 *                 image:
 *                  type: string
 *                 rentPerDay:
 *                  type: number
 *                 capacity:
 *                  type: number
 *                 description:
 *                  type: string
 *                 availableAt:
 *                  type: date
 *                 transmission:
 *                  type: string
 *                 available:
 *                  type: boolean
 *                 type:
 *                  type: string
 *                 year:
 *                  type: number
 *                 options:
 *                  type: array
 *                 specs:
 *                  type: array
 *                 created_by:
 *                  type: string
 *                 updated_by:
 *                  type: string
 *      401:
 *        description: Unauthorized
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: Invalid Token
 */
apiRouter.post('/api/v1/cars', authToken, upload.single('image'), carsController.postSaveCar)

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
apiRouter.post('/api/v1/users/login', usersController.login)

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
apiRouter.post('/api/v1/users/register', usersController.register)

/**
 * @openapi
 * /api/v1/users/add:
 *  post:
 *    summary: Add a new user
 *    description: Add a new user
 *    tags:
 *      - Users
 *    security:
 *      - bearerAuth: []
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - email
 *              - name
 *              - password
 *              - role
 *            properties:
 *              email:
 *                type: string
 *                format: email
 *                example: dummy@gmail.com
 *              name:
 *                type: string
 *                example: Dummy
 *              password:
 *                type: string
 *              role:
 *                type: string
 *                example: admin
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
 *                      example: admin
 *      400:
 *        description: Bad Request
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: The value of role is not allowed
 *      401:
 *        description: Unauthorized
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: Invalid token!
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
apiRouter.post('/api/v1/users/add', authToken, usersController.addUser)

/**
 * @openapi
 * /api/v1/users/profile:
 *  get:
 *    summary: Get current user
 *    description: Get profile user
 *    tags:
 *      - Users
 *    security:
 *      - bearerAuth: []
 *    responses:
 *      200:
 *        description: OK
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                id:
 *                  type: number
 *                email:
 *                  type: string
 *                  format: email
 *                name:
 *                  type: string
 *                role:
 *                  type: string
 *                iat:
 *                  type: number
 *                exp:
 *                  type: number
 *      401:
 *        description: Unauthorized
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: Invalid token!
 */
apiRouter.get('/api/v1/users/profile', authToken, usersController.profile)

/**
 * @openapi
 * components:
 *      schemas:
 *          jsonBodyCar:
 *              type: object
 *              properties:
 *                  plate:
 *                      type: string
 *                  manufacture:
 *                      type: string
 *                  model:
 *                      type: string
 *                  image:
 *                      type: string
 *                  rentPerDay:
 *                      type: integer
 *                  capacity:
 *                      type: integer
 *                      minimum: 1
 *                  description:
 *                      type: string
 *                  availableAt:
 *                      type: string
 *                      format: date-time
 *                  transmission:
 *                      type: string
 *                  available:
 *                      type: boolean
 *                  type:
 *                      type: string
 *                  year:
 *                      type: integer
 *                  options:
 *                      type: array
 *                      items:
 *                          type: string
 *                  specs:
 *                      type: array
 *                      items:
 *                          type: string
 */

apiRouter.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec))

export { appRouter, apiRouter }
