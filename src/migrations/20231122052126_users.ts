import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('users', (table: Knex.CreateTableBuilder) => {
        table.increments('id').primary()
        table.string('email').notNullable().unique()
        table.string('name').notNullable()
        table.string('password').notNullable()
        table.enum('role', ['superadmin', 'admin', 'member']).defaultTo('member')
    })
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists('users')
}
