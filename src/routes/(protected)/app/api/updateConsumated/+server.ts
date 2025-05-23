import { prisma } from '$lib/prismaClient.server';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ locals, request }) => {
    const { calories, protein } = await request.json();

    // Update the latest dailyProgress entry
    await prisma.dailyProgress.update({
        where: {
            userId_createdAt: {
                userId: locals.user.id,
                createdAt: locals.dailyProgress.createdAt
            }
        },
        data: {
            consumedCalories: {
                increment: calories
            },
            consumedProtein: {
                increment: protein
            }
        }
    });

    return json({ success: true });
};
