import type { Actions } from "@sveltejs/kit";
import { prisma } from "$lib/prismaClient.server";

export const actions: Actions = {
    addCalorieTarget: async ({ locals, request }) => {
        const formData = await request.formData();
        const calories = Number(formData.get('calories'));

        // Add calorie target to database
        await prisma.calorieTarget.create({
            data: {
                userId: locals.user.id,
                calories
            }
        });

        return { success: true };
    }
};
