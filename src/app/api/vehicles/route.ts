import { db } from '../db';
export const dynamic = 'force-dynamic';

export async function GET() {
    const client = await db();
    const result = await client.query(`SELECT * FROM vehicles ORDER BY id`);
    return Response.json(result.rows);
}
