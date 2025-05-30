import { prisma } from "$lib/prismaClient.server";
import type { Action, Actions } from "@sveltejs/kit";
import type { PageServerLoad } from '../$types';
import { fail } from "@sveltejs/kit";
import { convertInputToKg } from "$lib/utils/units";

export const load: PageServerLoad = async ({ locals }) => {
    const unlockProgress = await prisma.user.findUnique({
        where: {
            id: locals.user.id
        },
        select: {
            unlockedRank: true,
            unlockedControls: true,
            unlockedAddons: true
        }
    });

    return {
        unlockProgress
    }
}

const logWeight: Action = async ({ locals, request }) => {
    const data = await request.formData();
    let weight: any = data.get('weight');
    let weightInKg: number;

    // Check if 'weight' is a number
    if (isNaN(weight)) {
        return fail(400);
    } else {
        weight = parseFloat(weight);
        weightInKg = convertInputToKg(weight, locals.user.useMetricSystem);
    }

    // Use transaction to combine both operations
    // Atomicity - Either both operations succeed or both fail together, ensuring data consistency
    // Simplified Error Handling - You only need to catch errors once for the entire transaction
    // Reduced Network Requests - The transaction is sent as a single database operation, which can be more efficient
    await prisma.$transaction(async (tx) => {
        // Create weight entry for current user
        await tx.user.update({
            where: {
                id: locals.user.id
            },
            data: {
                weights: {
                    create: [{ weight: weightInKg }]
                }
            }
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
                weighIn: true,
                targetProtein: Math.round(weightInKg * 1.6)
            }
        });
    });

    // const collectible = getRandomCollectible()

    return {
        rewards: {
            powerups: 1,
            // collectible: collectible,
        }
    }
};

const unlockRank: Action = async ({ locals }) => {
    await prisma.user.update({
        where: { id: locals.user.id },
        data: { unlockedRank: true }
    })
}

const unlockControls: Action = async ({ locals }) => {
    await prisma.user.update({
        where: { id: locals.user.id },
        data: { unlockedControls: true }
    })
}

const unlockAddons: Action = async ({ locals }) => {
    await prisma.user.update({
        where: { id: locals.user.id },
        data: { unlockedAddons: true }
    })
}

const setUserTimeZoneOffset: Action = async ({ locals, request }) => {
    const formData = await request.formData()
    const timeZoneOffset = formData.get('timeZoneOffset');

    await prisma.user.update({
        where: { id: locals.user.id },
        data: { timeZoneOffset: JSON.parse(timeZoneOffset as string) }
    })
}

export const actions: Actions = {
    logWeight,
    unlockRank,
    unlockControls,
    unlockAddons,
    setUserTimeZoneOffset
};