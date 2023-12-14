import express from 'express'
import type { Express } from 'express'
import 'dotenv/config'
import knex from 'knex'
import path from 'path'
import config from './config/knexfile'
import { Model } from 'objection'
import { routeNotFound } from './utils/routeNotFound'
import { appRouter, apiRouter } from './config/routes'
import cors from 'cors'
import type { Server } from 'http'

// connect db postgres client
Model.knex(knex(config.development))

class App {
    public app: Express

    public constructor() {
        this.app = express()
        this.plugins()
        this.routes()
    }

    protected plugins(): void {
        this.app.set('views', path.join(process.cwd(), 'src', 'views'))
        this.app.set('view engine', 'ejs')
        this.app.use(express.static(path.join(process.cwd(), 'src', 'public')))
        this.app.use(express.json())
        this.app.use(
            cors({
                origin: ['http://localhost:5173'],
            })
        )
    }

    protected routes(): void {
        // inisiasi route
        this.app.use(appRouter)
        this.app.use(apiRouter)
        this.app.all('*', routeNotFound)
    }

    public startServer(port: number): Server {
        return this.app.listen(port, () => {
            console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
        })
    }
}

export default App
