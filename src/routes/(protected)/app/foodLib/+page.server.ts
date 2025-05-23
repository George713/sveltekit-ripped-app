// +page.server.ts
import type { Actions } from '@sveltejs/kit';

import { prisma } from '$lib/prismaClient.server';
import type { PlannedItem } from '$lib/types';

export const actions = {
    addToLog: async ({ request }) => {
        const formData = await request.formData()
        const item = JSON.parse(formData.get('item') as string) as PlannedItem

        const newPlannedItem = await prisma.plannedItem.create({
            data: item
        });

        return { success: true, item: newPlannedItem }
    }
} satisfies Actions;
