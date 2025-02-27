import { prisma } from '$lib/prismaClient.server';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
    const weights = await prisma.weight.findMany({
        where: { userId: locals.user.id },
        select: {
            weight: true,
            createdAt: true
        },
        orderBy: { createdAt: 'asc' }
    });

    return { weights };
};
