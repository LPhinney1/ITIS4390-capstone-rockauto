import 'dotenv/config';
import { Client } from 'pg';

async function main(): Promise<void> {
    console.log('DATABASE_URL:', process.env.DATABASE_URL);

    const client = new Client({
        connectionString: process.env.DATABASE_URL,
    });

    try {
        console.log('Connecting');
        await client.connect();
        console.log('Connected');

        const vehicleCount = await client.query<{ count: string }>(
            'SELECT COUNT(*) FROM vehicles;',
        );
        console.log('Total Vehicles:', vehicleCount.rows[0].count);

        const categoryCount = await client.query<{ count: string }>(
            'SELECT COUNT(*) FROM categories;',
        );
        console.log('Total Categories:', categoryCount.rows[0].count);

        const partsCount = await client.query<{ count: string }>(
            'SELECT COUNT(*) FROM parts;',
        );
        console.log('Total Parts:', partsCount.rows[0].count);

        console.log('DB test complete');
    } catch (err) {
        console.error('Error:', err);
    } finally {
        await client.end();
        console.log('Disconnected from Postgres.');
    }
}

main().catch((err) => {
    console.error(err);
    process.exit(1);
});
