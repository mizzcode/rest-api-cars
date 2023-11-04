import type { Knex } from 'knex';

// Update with your config settings.

const config: { [key: string]: Knex.Config } = {
    development: {
        client: 'postgresql',
        connection: {
            database: 'binar_car_rental',
            user: 'mizz',
            password: 'mizz',
        },
        pool: {
            min: 0,
            max: 10,
        },
        migrations: {
            tableName: 'knex_migrations',
            extension: 'ts',
            directory: './migrations',
        },
        seeds: {
            directory: './seeds/dev',
        },
    },

    production: {
        client: 'postgresql',
        connection: {
            database: 'binar_car_rental',
            user: 'mizz',
            password: 'mizz',
        },
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            tableName: 'knex_migrations',
        },
    },
};

export default config;
