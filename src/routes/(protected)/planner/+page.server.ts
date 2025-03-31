// +page.server.ts
import type { Actions } from '@sveltejs/kit';

import { prisma } from '$lib/prismaClient.server';
import type { PlannedItem } from '$lib/types';

export const actions = {
    finishPlanning: async ({ locals, request }) => {
        const formData = await request.formData()
        const items = JSON.parse(formData.get('items') as string) as PlannedItem[]

        // Use transaction to combine both operations
        await prisma.$transaction(async (tx) => {
            // Create items
            await tx.plannedItem.createMany({
                data: items
            });

            // Update daily progress
            await tx.dailyProgress.update({
                where: {
                    userId_createdAt: {
                        userId: locals.user.id,
                        createdAt: locals.dailyProgress.createdAt
                    }
                },
                data: {
                    planned: true
                }
            });
        });

        return { success: true }
    }
} satisfies Actions;
