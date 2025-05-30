import { prisma } from '$lib/prismaClient.server';
import { type Actions } from '@sveltejs/kit';

export const actions: Actions = {
    addBFComparison: async ({ locals, request }) => {
        const data = await request.formData();
        const bodyfat = Number(data.get('bodyfat'));

        await prisma.$transaction([
            // Create bodyfat entry
            prisma.bodyFat.create({
                data: {
                    userId: locals.user.id,
                    bodyfat,
                    method: 'comparison'
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