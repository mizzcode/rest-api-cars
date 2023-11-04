import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex('cars').del();

    // Inserts seed entries
    await knex('cars').insert([
        {
            plate: 'M 019 TGL',
            manufacture: 'BMW',
            model: 'XS',
            image: 'https://res.cloudinary.com/dshomxqjc/image/upload/v1699074234/cars.jpg',
            rentPerDay: 920000,
            capacity: 4,
            description: 'Cargo compartment lamp. Body color fascias w/bright insert. Front/rear stabilizer bars.',
            transmission: 'Manual',
            available: true,
            type: 'Hatchback',
            year: 2023,
            options: 'Third Row Seats, Bucket Seats, Integrated Phone, Navigation, Leather Interior',
            specs: 'Cargo compartment lamp, Body color fascias w/bright insert, Front/rear stabilizer bars, Electrochromic pwr folding heated mirrors w/memory -inc: puddle lamps, integrated turn signals, auto reverse tilt-down, Multi-info display -inc: driving range, average MPG, current MPG, average speed, outside temp, elapsed time, maintenance & diagnostic messages',
        },
    ]);
    await knex('cars').insert([
        {
            plate: 'J 026 BKS',
            manufacture: 'Lincoln',
            model: 'Navigator',
            image: 'https://res.cloudinary.com/dshomxqjc/image/upload/v1699112721/cars.jpg',
            rentPerDay: 200000,
            capacity: 2,
            description: 'Cargo compartment lamp. Body color fascias w/bright insert. Front/rear stabilizer bars.',
            transmission: 'Automatic',
            available: false,
            type: 'Minivan',
            year: 2021,
            options: 'CD (Multi Disc), Cruise Control, Power Locks, Alloy Wheels, Tow Package',
            specs: 'Body color sill extension, Torsion beam rear suspension w/stabilizer bar, Front & rear passenger folding assist grips, Electronic control braking (ECB), Black windshield molding',
        },
    ]);
}
