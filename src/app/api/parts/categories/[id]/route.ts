import { NextResponse } from 'next/server';
import { db } from '../../../db';
export const dynamic = 'force-dynamic';

export async function GET(
    req: Request,
    { params }: { params: { id: string } },
) {
    const categoryId = Number(params.id);

    if (isNaN(categoryId)) {
        return NextResponse.json(
            { error: 'Invalid category ID' },
            { status: 400 },
        );
    }

    try {
        const client = await db();
        const result = await client.query(
            `
      SELECT * FROM parts
      WHERE category_id = $1
      ORDER BY id ASC;
      `,
            [categoryId],
        );

        return NextResponse.json(result.rows);
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: 'Failed to fetch parts by category' },
            { status: 500 },
        );
    }
}
