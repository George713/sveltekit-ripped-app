import { redirect } from '@sveltejs/kit'
import type { LayoutServerLoad } from './$types';

import type { FoodItem } from '$lib/types';
import { getDateDayBegin } from '$lib/utils.svelte';
import { prisma } from '$lib/prismaClient.server';


export const load: LayoutServerLoad = async ({ locals, depends }) => {
	// Register dependencies for invalidation
	depends('layoutLoad');

	if (!locals.user) {
		throw redirect(302, '/login')
	}

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
		user: locals.user,
		dailyProgress: locals.dailyProgress,
		schedule: locals.schedule,
		session: await locals.getSession(),
		foodItems,
		plannedItems,
		estimatedItems,
		foodSets,
	};
};
