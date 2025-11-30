import { db } from '../../db';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const make = searchParams.get('make');
    const model = searchParams.get('model');
    const year = searchParams.get('year');

    if (!make || !model || !year) {
        return new Response('Missing query params', { status: 400 });
    }

    const client = await db();
    const result = await client.query(
        `
      SELECT * FROM vehicles
      WHERE LOWER(make) = LOWER($1)
        AND LOWER(model) = LOWER($2)
        AND year = $3
      LIMIT 1
    `,
        [make, model, year],
    );

    if (result.rows.length === 0) {
        return new Response('Not found', { status: 404 });
    }

    return Response.json(result.rows[0]);
}
