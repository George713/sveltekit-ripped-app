import { prisma } from '$lib/prismaClient.server';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ locals, request }) => {
    const { gainedDirectXP, gainedVaultXP, openVault } = await request.json();

    // Use transaction to combine both operations
    await prisma.$transaction(async (tx) => {
        // Update the user's point balance
        await tx.user.update({
            where: {
                id: locals.user.id
            },
            data: {
                pointBalance: {
                    increment: gainedDirectXP
                }
            }
        });

        // Update the latest dailyProgress entry
        await tx.dailyProgress.update({
            where: {
                userId_createdAt: {
                    userId: locals.user.id,
                    createdAt: locals.dailyProgress.createdAt
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
    });

    return json({ success: true });
};
