import App from './app'

const port = process.env.PORT ?? 4000

export const server = new App().startServer(port)
