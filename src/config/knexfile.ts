import { configDotenv } from 'dotenv'
import type { Knex } from 'knex'
import path from 'path'

// load .env
configDotenv({ path: path.join(process.cwd(), '..', '..', '.env') })

// Update with your config settings.

const config: Record<string, Knex.Config> = {
    development: {
        client: process.env.PGCLIENT ?? 'postgresql',
        connection: {
            database: process.env.PGDATABASE ?? 'binar-car-rental',
            user: process.env.PGUSER ?? 'mizz',
            password: process.env.PGPASSWORD ?? 'mizz',
        },
        pool: {
            min: 0,
            max: 10,
        },
        migrations: {
            tableName: 'knex_migrations',
            directory: '../migrations',
        },
        seeds: {
            directory: '../seeds',
        },
    },

    production: {
        client: process.env.PGCLIENT,
        connection: {
            database: process.env.PGDATABASE,
            user: process.env.PGUSER,
            password: process.env.PGPASSWORD,
        },
        pool: {
            min: 0,
            max: 10,
        },
        migrations: {
            tableName: 'knex_migrations',
        },
    },
}

export default config
