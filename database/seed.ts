import 'dotenv/config';
import { Client } from 'pg';
import { readFile } from 'fs/promises';

interface Product {
    make: string;
    model: string;
    year: number;
    category: string;
    product_name: string;
    product_description?: string;
    price?: number;
    product_image_url?: string;
}

async function main(): Promise<void> {
    const client = new Client({
        connectionString: process.env.DATABASE_URL,
    });

    await client.connect();

    // Clear DB
    await client.query(`
        TRUNCATE TABLE parts RESTART IDENTITY CASCADE;
        TRUNCATE TABLE categories RESTART IDENTITY CASCADE;
        TRUNCATE TABLE vehicles RESTART IDENTITY CASCADE;
    `);
    console.log('DB cleared');

    const data = await readFile('./data/products.json', 'utf8');
    const products: Product[] = JSON.parse(data);

    for (const p of products) {
        // Handle categories
        const catRes = await client.query<{ id: number }>(
            `SELECT id FROM categories WHERE name=$1`,
            [p.category],
        );

        let category_id: number;
        if (catRes.rows.length > 0) {
            category_id = catRes.rows[0].id;
        } else {
            const insertCat = await client.query<{ id: number }>(
                `INSERT INTO categories (name) VALUES ($1) RETURNING id`,
                [p.category],
            );
            category_id = insertCat.rows[0].id;
        }

        // Handle vehicles
        const vehRes = await client.query<{ id: number }>(
            `SELECT id FROM vehicles WHERE make=$1 AND model=$2 AND year=$3`,
            [p.make, p.model, p.year],
        );

        let vehicle_id: number;
        if (vehRes.rows.length > 0) {
            vehicle_id = vehRes.rows[0].id;
        } else {
            const insertVeh = await client.query<{ id: number }>(
                `INSERT INTO vehicles (make, model, year, car_image_url)
                 VALUES ($1, $2, $3, $4)
                 RETURNING id`,
                [p.make, p.model, p.year, `/vehicles/${p.make}.png`],
            );
            vehicle_id = insertVeh.rows[0].id;
        }

        // Insert part
        await client.query(
            `INSERT INTO parts (
                vehicle_id,
                category_id,
                product_name,
                product_description,
                price,
                product_image_url
            ) VALUES ($1, $2, $3, $4, $5, $6)`,
            [
                vehicle_id,
                category_id,
                p.product_name,
                p.product_description ?? null,
                p.price ?? null,
                `/products/${category_id}.png`,
            ],
        );
    }

    await client.end();
    console.log('Seed complete');
}

main().catch((err) => {
    console.error(err);
    process.exit(1);
});

