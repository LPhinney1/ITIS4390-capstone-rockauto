import 'dotenv/config';
import { Client } from 'pg';

async function main(): Promise<void> {
    const client = new Client({
        connectionString: process.env.DATABASE_URL,
    });

    try {
        await client.connect();
        console.log('Connected to Postgres for migration.');

        // Create categories table
        await client.query(`
      CREATE TABLE IF NOT EXISTS categories (
        id SERIAL PRIMARY KEY,
        name TEXT UNIQUE NOT NULL
      );
    `);
        console.log('Table "categories" checked/created.');

        // Create vehicles table
        await client.query(`
      CREATE TABLE IF NOT EXISTS vehicles (
        id SERIAL PRIMARY KEY,
        make TEXT NOT NULL,
        model TEXT NOT NULL,
        year INTEGER NOT NULL
      );
    `);
        console.log('Table "vehicles" checked/created.');

        // Create parts table
        await client.query(`
      CREATE TABLE IF NOT EXISTS parts (
        id SERIAL PRIMARY KEY,
        vehicle_id INTEGER REFERENCES vehicles(id) ON DELETE CASCADE,
        category_id INTEGER REFERENCES categories(id) ON DELETE CASCADE,
        product_name TEXT NOT NULL,
        product_description TEXT,
        price NUMERIC
      );
    `);
        console.log('Table "parts" checked/created.');

        console.log('Migration complete!');
    } catch (err) {
        console.error('Migration error:', err);
    } finally {
        await client.end();
        console.log('Disconnected from Postgres.');
    }
}

main().catch((err) => {
    console.error('Unexpected error in migration:', err);
    process.exit(1);
});
