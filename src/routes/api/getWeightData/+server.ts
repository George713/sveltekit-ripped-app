import { json } from '@sveltejs/kit';

import { db } from '$lib/database.server';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ locals }) => {
    const weights = await db.weight.findMany({
        where: {
            user: { id: locals.user.id }
        },
        select: {
            weight: true,
            createdAt: true
        },
        orderBy: {
            createdAt: 'asc'
        }
    });

    return json({ weights });
};
