// +page.server.ts
import type { Actions } from '@sveltejs/kit';

import { prisma } from '$lib/prismaClient.server';
import type { PlannedItem } from '$lib/types';

export const actions = {
    finishPlanning: async ({ locals, request }) => {
        const formData = await request.formData()
        const items = JSON.parse(formData.get('items') as string) as PlannedItem[]

        // Create items
        await prisma.plannedItem.createMany({
            data: items
        });

        // Update last planned date
        await prisma.user.update({
            where: { id: locals.user.id },
            data: { lastPlannedOn: new Date() }
        })
    }
} satisfies Actions;
