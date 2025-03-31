import { prisma } from '$lib/prismaClient.server';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ locals, request }) => {
    const { gainedDirectXP, gainedVaultXP, openVault } = await request.json();

    // Update the user's point balance and harvest date if vault opened
    const user = await prisma.user.update({
        where: {
            id: locals.user.id
        },
        data: {
            pointBalance: {
                increment: gainedDirectXP
            }
        }
    });

    // Find the latest dailyProgress entry for the user
    const latestProgress = await prisma.dailyProgress.findFirst({
        where: {
            userId: locals.user.id
        },
        orderBy: {
            createdAt: 'desc'
        }
    });

    // Update the latest dailyProgress entry
    if (latestProgress) {
        await prisma.dailyProgress.update({
            where: {
                userId_createdAt: {
                    userId: locals.user.id,
                    createdAt: latestProgress.createdAt
                }
            },
            data: {
                xpGained: {
                    increment: gainedDirectXP
                },
                vaultXP: {
                    increment: gainedVaultXP
                },
                ...(openVault ? { vaultOpened: true } : {})
            }
        });
    }

    return json({ success: true });
};
