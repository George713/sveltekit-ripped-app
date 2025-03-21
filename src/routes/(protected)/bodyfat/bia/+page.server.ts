import { prisma } from '$lib/prismaClient.server';
import { type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
    const bodyFat = await prisma.bodyFat.findFirst({
        where: { userId: locals.user.id, method: 'bia' },
        select: {
            bodyfat: true
        },
        orderBy: { createdAt: 'desc' }
    });

    if (!bodyFat) {
        return { bodyfat: null };
    }

    return { bodyfat: bodyFat.bodyfat };
};

export const actions: Actions = {
    addBIAMeasurement: async ({ locals, request }) => {
        const data = await request.formData();
        const bodyfat = Number(data.get('bodyfat'));

        await prisma.bodyFat.create({
            data: {
                userId: locals.user.id,
                bodyfat,
                method: 'bia'
            }
        });
    }
}