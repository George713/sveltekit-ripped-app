import { fail } from '@sveltejs/kit';
import type { Action } from '../$types';

import { prisma } from '$lib/prismaClient.server';

const collect: Action = async ({ locals, request }) => {
    const data = await request.formData();
    const collectibleName = data.get('collectibleName') as string;

    if (!collectibleName) {
        return fail(400, { message: 'Collectible name is required' });
    }

    // Find the collectible by name
    const collectible = await prisma.collectible.findUnique({
        where: { name: collectibleName },
    });

    if (!collectible) {
        return fail(404, { message: 'Collectible not found' });
    }

    // Upsert the collected item for the current user and the collectible
    await prisma.collectedItem.upsert({
        where: {
            userId_collectibleId: {
                userId: locals.user.id,
                collectibleId: collectible.id,
            },
        },
        update: {
            count: { increment: 1 },
        },
        create: {
            count: 1,
            collectible: { connect: { id: collectible.id } },
            user: { connect: { id: locals.user.id } },
        },
    });
}