// +page.server.ts
import type { Actions } from '@sveltejs/kit';

import { prisma } from '$lib/prismaClient.server';

export const actions = {
    eatItem: async ({ request }) => {
        const formData = await request.formData()
        const { id, type } = Object.fromEntries(formData.entries());

        if (type === 'planned') {
            await prisma.plannedItem.update({
                where: { id: parseInt(id as string) },
                data: { eaten: true }
            })
        }
        else if (type === 'estimate') {
            await prisma.eatEstimate.update({
                where: { id: parseInt(id as string) },
                data: { eaten: true }
            })
        }
    }
} satisfies Actions;
