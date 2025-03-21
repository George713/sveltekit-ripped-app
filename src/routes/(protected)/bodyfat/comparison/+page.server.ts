import { prisma } from '$lib/prismaClient.server';
import { type Actions } from '@sveltejs/kit';

export const actions: Actions = {
    addBFComparison: async ({ locals, request }) => {
        const data = await request.formData();
        const bodyfat = Number(data.get('bodyfat'));

        await prisma.bodyFat.create({
            data: {
                userId: locals.user.id,
                bodyfat,
                method: 'comparison'
            }
        });
    }
}