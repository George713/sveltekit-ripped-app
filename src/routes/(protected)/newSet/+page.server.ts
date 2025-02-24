// +page.server.ts
import type { Actions } from '@sveltejs/kit';

import { prisma } from '$lib/prismaClient.server';

export const actions = {
    newSet: async ({ locals, request }) => {
        const formData = await request.formData();
        const { name, items } = Object.fromEntries(formData.entries());

        // Create the FoodSet
        const newSet = await prisma.foodSet.create({
            data: {
                name: name.toString(),
                user: {
                    connect: { id: locals.user.id }
                }
            }
        });

        // Parse items and create FoodItemInSet entries
        const itemsArray = JSON.parse(items.toString());
        await prisma.foodItemInSet.createMany({
            data: itemsArray.map((item: { foodId: string; unitIsPtn: string; unitAmount: string }) => ({
                unitIsPtn: item.unitIsPtn === 'true',
                unitAmount: parseFloat(item.unitAmount),
                setId: newSet.id,
                foodId: parseInt(item.foodId),
            })),
        });

        return { success: true, setId: newSet.id };
    }
} satisfies Actions;
