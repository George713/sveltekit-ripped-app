import type { Actions } from "@sveltejs/kit";
import { prisma } from "$lib/prismaClient.server";

export const actions: Actions = {
    addCalorieTarget: async ({ locals, request }) => {
        const formData = await request.formData();
        const calories = Number(formData.get('calories'));
        const isMale = formData.get('isMale') === 'true'; // Convert string to boolean

        await prisma.$transaction([
            prisma.calorieTarget.create({
                data: {
                    userId: locals.user.id,
                    calories
                }
            }),
            prisma.dailyProgress.update({
                where: {
                    userId_createdAt: {
                        userId: locals.user.id,
                        createdAt: locals.dailyProgress.createdAt
                    }
                },
                data: {
                    targetCalories: calories,
                    review: true
                }
            }),
            prisma.user.update({
                where: {
                    id: locals.user.id
                },
                data: {
                    isMale
                }
            })
        ]);

        return { success: true };
    }
};