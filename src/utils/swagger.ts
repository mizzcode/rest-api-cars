import swaggerJSDoc from 'swagger-jsdoc';

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.1.0',
    info: {
      title: 'REST API Car Management Docs',
      version: '1.0.0',
    },
    servers: [
      {
        url: 'http://localhost:4000',
        description: 'Development Server',
      },
    ],
  },
  apis: ['./src/config/routes.ts'],
};

export const swaggerSpec = swaggerJSDoc(options);
