import { Knex } from 'knex';
import bcrypt from 'bcrypt';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('users').del();

  // Inserts seed entries
  await knex('users').insert([
    { email: 'mizz@gmail.com', name: 'Misbah', password: await bcrypt.hash('password', 10), role: 'superadmin' },
    { email: 'jani@gmail.com', name: 'Anjani', password: await bcrypt.hash('password', 10), role: 'admin' },
    { email: 'ende@gmail.com', name: 'Ende', password: await bcrypt.hash('password', 10), role: 'member' },
  ]);
}
