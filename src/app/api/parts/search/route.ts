import { db } from '../../db';
export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get('q');

    if (!q) return new Response('Missing q', { status: 400 });

    const client = await db();
    const result = await client.query(
        `SELECT * FROM parts WHERE LOWER(product_name) LIKE LOWER('%' || $1 || '%')`,
        [q],
    );

    return Response.json(result.rows);
}
