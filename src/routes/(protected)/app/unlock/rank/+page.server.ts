import type { Actions } from "@sveltejs/kit";
import { prisma } from "$lib/prismaClient.server";

export const actions: Actions = {
    updateSex: async ({ locals, request }) => {
        const formData = await request.formData();
        const isMale = formData.get('isMale') === 'true'; // Convert string to boolean

        await prisma.user.update({
            where: {
                id: locals.user.id
            },
            data: {
                isMale
            }
        })

        return { success: true };
    }
};
