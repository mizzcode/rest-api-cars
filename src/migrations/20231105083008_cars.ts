import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('cars', (table: Knex.TableBuilder) => {
    table.uuid('id').defaultTo(knex.fn.uuid()).primary();
    table.string('plate').notNullable();
    table.string('manufacture').notNullable();
    table.string('model').notNullable();
    table.string('image').notNullable();
    table.integer('rentPerDay').notNullable();
    table.integer('capacity').notNullable();
    table.string('description').notNullable();
    table.timestamp('availableAt').notNullable().defaultTo(knex.fn.now());
    table.string('transmission').notNullable();
    table.boolean('available').notNullable().defaultTo(false);
    table.string('type').notNullable();
    table.integer('year').notNullable();
    table.json('options').notNullable();
    table.json('specs').notNullable();
    table.string('created_by').defaultTo('seed');
    table.string('updated_by').defaultTo('seed');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('cars');
}
