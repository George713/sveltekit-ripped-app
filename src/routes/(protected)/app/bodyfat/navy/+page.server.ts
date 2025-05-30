import { prisma } from '$lib/prismaClient.server';
import { type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
    const bodyFat = await prisma.bodyFat.findFirst({
        where: { userId: locals.user.id, method: 'navy' },
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

export const actions: Actions = {
    addNavyMeasurement: async ({ locals, request }) => {
        const data = await request.formData();
        const heightCm = Number(data.get('heightCm'));
        const waistCm = Number(data.get('waistCm'));
        const neckCm = Number(data.get('neckCm'));
        const hipCm = data.get('hipCm') ? Number(data.get('hipCm')) : null;
        const bodyfat = Number(data.get('bodyfat'));

        await prisma.$transaction([
            // Create bodyfat entry
            prisma.bodyFat.create({
                data: {
                    userId: locals.user.id,
                    heightCm,
                    waistCm,
                    neckCm,
                    hipCm,
                    bodyfat,
                    method: 'navy'
                }
            }),

            // Update daily progress to mark bodyfat as completed
            prisma.dailyProgress.update({
                where: {
                    userId_createdAt: {
                        userId: locals.user.id,
                        createdAt: locals.dailyProgress.createdAt
                    }
                },
                data: {
                    bodyfat: true
                }
            })
        ]);
    }
}