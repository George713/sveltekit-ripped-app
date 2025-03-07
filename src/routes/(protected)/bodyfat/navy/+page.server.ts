import { prisma } from '$lib/prismaClient.server';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
    const bodyFat = await prisma.bodyFat.findFirst({
        where: { userId: locals.user.id, method: 'bia' },
        select: {
            heightCm: true,
            neckCm: true,
            waistCm: true,
            hipCm: true
        },
        orderBy: { createdAt: 'desc' }
    });

    if (!bodyFat) {
        return { heightCm: 0, neckCm: 0, waistCm: 0, hipCm: 0 };
    }

    const { heightCm, neckCm, waistCm, hipCm } = bodyFat;

    return { heightCm, neckCm, waistCm, hipCm };
};