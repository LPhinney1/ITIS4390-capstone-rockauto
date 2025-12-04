import { db } from '../../db';
export const dynamic = 'force-dynamic';

export async function GET(
    request: Request,
    { params }: { params: { id: string } },
) {
    const client = await db();
    const result = await client.query(`SELECT * FROM vehicles WHERE id = $1`, [
        params.id,
    ]);

    if (result.rows.length === 0) {
        return new Response('Not found', { status: 404 });
    }

    return Response.json(result.rows[0]);
}
