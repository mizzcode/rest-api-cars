import SwaggerJSDOC from 'swagger-jsdoc';

const swaggerDefinition = {
  openapi: '3.1.0',
  info: {
    title: 'BCR',
    version: '1.0.0',
    description: 'BCR API Docs',
  },
  servers: [
    {
      url: 'http://localhost:4000',
      description: 'Development server',
    },
  ],
};

const options = {
  swaggerDefinition,
  // Path to the API docs
  apis: ['../config/routes.ts'],
};

export const swaggerSpec = SwaggerJSDOC(options);
