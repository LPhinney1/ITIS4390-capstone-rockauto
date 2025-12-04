import { db } from '../../db';
export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const name = searchParams.get('name');

    if (!name) {
        return new Response('Missing name', { status: 400 });
    }

    const client = await db();
    const result = await client.query(
        `SELECT * FROM categories WHERE LOWER(name) = LOWER($1) LIMIT 1`,
        [name],
    );

    if (result.rows.length === 0) {
        return new Response('Not found', { status: 404 });
    }

    return Response.json(result.rows[0]);
}
