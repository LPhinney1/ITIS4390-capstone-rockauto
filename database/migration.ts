import 'dotenv/config';
import { Client } from 'pg';

async function main(): Promise<void> {
    const client = new Client({
        connectionString: process.env.DATABASE_URL,
    });

    try {
        await client.connect();
        console.log('Connected.');

        // Create categories table
        await client.query(`
      CREATE TABLE IF NOT EXISTS categories (
        id SERIAL PRIMARY KEY,
        name TEXT UNIQUE NOT NULL,
        image_url TEXT
      );
    `);
        console.log('Table "categories" created.');

        // Create vehicles table
        await client.query(`
      CREATE TABLE IF NOT EXISTS vehicles (
        id SERIAL PRIMARY KEY,
        make TEXT NOT NULL,
        model TEXT NOT NULL,
        year INTEGER NOT NULL,
        car_image_url TEXT
      );
    `);
        console.log('Table "vehicles" created.');

        // Create parts table
        await client.query(`
      CREATE TABLE IF NOT EXISTS parts (
        id SERIAL PRIMARY KEY,
        vehicle_id INTEGER REFERENCES vehicles(id) ON DELETE CASCADE,
        category_id INTEGER REFERENCES categories(id) ON DELETE CASCADE,
        product_name TEXT NOT NULL,
        product_description TEXT,
        price NUMERIC(10,2),
        product_image_url TEXT
      );
    `);
        console.log('Table "parts" created.');

        console.log('Migration complete!');
    } catch (err) {
        console.error('Migration error:', err);
    } finally {
        await client.end();
        console.log('Disconnected from Postgres.');
    }
}

main().catch((err) => {
    console.error('Error in migration:', err);
    process.exit(1);
});
