import App from './app'

const port = Number(process.env.PORT) ?? 3000

export const server = new App().startServer(port)
