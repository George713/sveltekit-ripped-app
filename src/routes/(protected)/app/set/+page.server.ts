// +page.server.ts
import type { Actions } from '@sveltejs/kit';

import { prisma } from '$lib/prismaClient.server';

export const actions = {
    upsertSet: async ({ locals, request }) => {
        const formData = await request.formData();
        const { name, items, setId } = Object.fromEntries(formData.entries());
        const itemsParsed = JSON.parse(items.toString());
        const itemsArray = itemsParsed.map((item: { foodId: string; }) => ({
            foodId: parseInt(item.foodId),
        }))

        // Create or update entry in db
        const foodSet = await prisma.foodSet.upsert({
            where: { id: setId ? Number(setId) : -1 }, // -1 is a placeholder for non-existent ID
            update: {
                name: name.toString(),
                foodItemsInSet: {
                    // Delete all existing items in set
                    deleteMany: {},
                    // Create new items
                    create: itemsArray
                },
            },
            create: {
                name: name.toString(),
                user: {
                    connect: {
                        id: locals.user.id
                    }
                },
                foodItemsInSet: {
                    create: itemsArray
                },
            }
        });

        return { success: true, setId: foodSet.id };
    },
    deleteSet: async ({ request }) => {
        const formData = await request.formData();
        const { setId } = Object.fromEntries(formData.entries());
        await prisma.foodSet.delete({
            where: { id: Number(setId) },
        });
        return { success: true };
    }
} satisfies Actions;
