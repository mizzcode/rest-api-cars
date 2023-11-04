import knex from 'knex';
import knexFile from './knexfile';

export const db = knex(knexFile.development);
