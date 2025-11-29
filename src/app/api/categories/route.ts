import { db } from '../db';

export async function GET() {
    const client = await db();
    const result = await client.query(`SELECT * FROM categories ORDER BY id`);
    return Response.json(result.rows);
}
