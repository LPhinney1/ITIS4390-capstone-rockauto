import { db } from '../../db';
export const dynamic = 'force-dynamic';

export async function GET(
    request: Request,
    { params }: { params: { id: string } },
) {
    const client = await db();

    const result = await client.query(
        `
        SELECT p.*, v.make, v.model, v.year
        FROM parts p
        LEFT JOIN vehicles v ON v.id = p.vehicle_id
        WHERE p.id = $1
        `,
        [params.id]
    );

    if (result.rows.length === 0) {
        return new Response('Not found', { status: 404 });
    }

    return Response.json(result.rows[0]);
}

