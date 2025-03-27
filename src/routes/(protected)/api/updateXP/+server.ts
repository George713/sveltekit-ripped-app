import { prisma } from '$lib/prismaClient.server';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ locals, request }) => {
    const { totalXP, vaultXP } = await request.json();

    const user = await prisma.user.update({
        where: {
            id: locals.user.id
        },
        data: {
            pointBalance: totalXP,
            vaultXP
        }
    });

    return json({ success: true });
};
