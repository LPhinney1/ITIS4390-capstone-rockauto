import { NextResponse } from 'next/server';
import { db } from '../db';

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);

        const year = searchParams.get('year');
        const make = searchParams.get('make');
        const model = searchParams.get('model');
        const categoryName = searchParams.get('category');
        const maxPrice = searchParams.get('maxPrice');

        const filters: string[] = [];
        const values: any[] = [];
        let i = 1;

        const client = await db();

        // Get category ID if category name is provided
        let categoryId: number | null = null;
        if (categoryName) {
            const categoryQuery = await client.query(
                `SELECT id FROM categories WHERE name ILIKE $1 LIMIT 1`,
                [`%${categoryName}%`],
            );
            if (categoryQuery.rows.length > 0) {
                categoryId = categoryQuery.rows[0].id;
            }
        }

        if (year) {
            filters.push(`v.year = $${i++}`);
            values.push(year);
        }
        if (make) {
            filters.push(`v.make ILIKE $${i++}`);
            values.push(`%${make}%`);
        }
        if (model) {
            filters.push(`v.model ILIKE $${i++}`);
            values.push(`%${model}%`);
        }
        if (categoryId) {
            filters.push(`p.category_id = $${i++}`);
            values.push(categoryId);
        }
        if (maxPrice) {
            filters.push(`p.price <= $${i++}`);
            values.push(Number(maxPrice));
        }

        const whereClause = filters.length
            ? `WHERE ${filters.join(' AND ')}`
            : '';

        const result = await client.query(
            `
            SELECT 
                p.id,
                p.product_name,
                p.product_description,
                p.price,
                p.product_image_url,
                c.name AS category_name,
                v.year,
                v.make,
                v.model
            FROM parts p
            JOIN vehicles v ON p.vehicle_id = v.id
            JOIN categories c ON p.category_id = c.id
            ${whereClause}
            ORDER BY p.id ASC;
            `,
            values,
        );

        return NextResponse.json(result.rows);
    } catch (error) {
        console.error('Search API error:', error);
        return NextResponse.json(
            { error: 'Search query failed' },
            { status: 500 },
        );
    }
}
