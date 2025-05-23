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
    },
    addEstimate: async ({ locals, request }) => {
        const formData = await request.formData();
        const { kcal, protein } = Object.fromEntries(formData.entries());

        const newEstimate = await prisma.eatEstimate.create({
            data: {
                name: "Estimate",
                kcal: parseInt(kcal as string),
                protein: parseFloat(protein as string),
                user: {
                    connect: {
                        id: locals.user.id
                    },
                },
            }
        })

        return { success: true, id: newEstimate.id }
    }
} satisfies Actions;
