import App from './app'

export const port = Number(process.env.PORT) ?? 3000

export const server = new App().startServer(port)
