import swaggerJSDoc from 'swagger-jsdoc'

const options: swaggerJSDoc.Options = {
    definition: {
        openapi: '3.1.0',
        info: {
            title: 'REST API Car Management Docs',
            version: '1.0.0',
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        security: {
            bearerAuth: [],
        },
        servers: [
            {
                url: 'http://127.0.0.1:3000',
                description: 'Development Server',
            },
            {
                url: 'https://rest-api-cars.fly.dev',
                description: 'Production Server',
            },
        ],
    },
    apis: ['./src/config/routes.ts'],
}

export const swaggerSpec = swaggerJSDoc(options)
