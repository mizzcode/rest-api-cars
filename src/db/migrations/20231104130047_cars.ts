import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('cars', (table: Knex.TableBuilder) => {
        table.increments('id').primary();
        table.string('plate').notNullable();
        table.string('manufacture').notNullable();
        table.string('model').notNullable();
        table.string('image').notNullable();
        table.integer('rentPerDay').notNullable();
        table.integer('capacity').notNullable();
        table.string('description').notNullable();
        table.timestamp('availableAt').notNullable().defaultTo(knex.fn.now());
        table.string('transmission').notNullable();
        table.boolean('available').notNullable();
        table.string('type').notNullable();
        table.integer('year').notNullable();
        table.text('options').notNullable();
        table.text('specs').notNullable();
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists('cars');
}
