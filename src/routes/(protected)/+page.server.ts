import type { PageServerLoad } from "./$types";
import type { Action, Actions } from "@sveltejs/kit";
import { fail } from "@sveltejs/kit";

import { prisma } from '$lib/prismaClient.server';
import { getDateDayBegin } from "$lib/utils";

import type { FoodItem } from "$lib/types";

export const load: PageServerLoad = async ({ locals }) => {
    if (locals.user) {
        const dateDayBegin = getDateDayBegin(locals.user.timeZoneOffset)

        // Get items of that user
        // prisma.js issue: https://github.com/prisma/prisma/issues/22631
        // Code, once its resolved:
        // ========================
        // const thirtyDaysAgo = new Date();
        // thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

        // let foodItems = await prisma.foodItem.findMany({
        // 	where: { userId: locals.user.id },
        // 	include: {
        // 		PlannedItems: {
        // 			where: {
        // 				createdAt: { gte: thirtyDaysAgo }
        // 			}
        // 		}
        // 	},
        // 	orderBy: {
        // 		_count: {
        // 			PlannedItems: 'desc'
        // 		}
        // 	}
        // });
        const twoWeeksAgo = new Date();
        twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);

        const foodItems: [FoodItem] = await prisma.$queryRaw`
            SELECT "fi".*
            FROM "FoodItem" "fi"
            LEFT JOIN "PlannedItem" "pi" ON "fi"."id" = "pi"."foodId" AND "pi"."createdAt" >= ${twoWeeksAgo}
            WHERE "fi"."userId" = ${locals.user.id}
            GROUP BY "fi"."id"
            ORDER BY COUNT("pi"."id") DESC
        `;

        // Get planned items for the current day
        const plannedItems = await prisma.plannedItem.findMany({
            where: {
                foodId: { in: foodItems.map(item => item.id) },
                createdAt: { gte: dateDayBegin }
            },
            orderBy: {
                createdAt: 'asc'
            }
        });

        // Get eating estimate for the current day
        const estimatedItems = (await prisma.eatEstimate.findMany({
            where: {
                createdAt: { gte: dateDayBegin }
            },
        })).map(item => ({
            ...item,
            name: item.name ?? undefined // Convert null to undefined for correct typing
        }));

        // Get food sets
        const foodSets = await prisma.foodSet.findMany({
            where: { userId: locals.user.id },
            select: {
                id: true,
                name: true,
                foodItemsInSet: {
                    select: {
                        unitIsPtn: true,
                        unitAmount: true,
                        foodId: true
                    }
                }
            }
        })

        return {
            foodItems,
            plannedItems,
            estimatedItems,
            foodSets,
        };
    }
}

const logWeight: Action = async ({ locals, request }) => {
    const data = await request.formData();
    let weight: any = data.get('weight');

    // Check if 'weight' is a number
    if (isNaN(weight)) {
        return fail(400);
    } else {
        weight = parseFloat(weight);
    }

    console.log(`Logged weight: ${weight}`);

    // Create weight entry for current user
    // await prisma.user.update({
    //     where: {
    //         id: locals.user.id
    //     },
    //     data: {
    //         weights: {
    //             create: [{ weight }]
    //         }
    //     }
    // });

    // const collectible = getRandomCollectible()

    return {
        rewards: {
            powerups: 1,
            // collectible: collectible,
        }
    }
};



export const actions: Actions = {
    logWeight,
};