import { redirect } from '@sveltejs/kit'
import type { LayoutServerLoad } from './$types';

import type { FoodItem } from '$lib/types';
import { getDateDayBegin } from '$lib/utils.svelte';
import { prisma } from '$lib/prismaClient.server';


export const load: LayoutServerLoad = async ({ url, locals, depends }) => {
	// Register dependencies for invalidation
	depends('layoutLoad');

	// If user is not logged in, redirect to login
	if (!locals.user) {
		throw redirect(302, '/login')
	}

	// If user has not completed setup, redirect to setup page, unless already on setup page
	if (!locals.user.didSetup && url.pathname !== '/setup') {
		throw redirect(303, '/setup');
	}

	const dateDayBegin = getDateDayBegin(locals.user.timeZoneOffset)
	const twoWeeksAgo = new Date();
	twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);

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

	const foodItems = await prisma.foodItem.findMany({
		where: { userId: locals.user.id },
		include: {
			PlannedItems: {
				where: {
					createdAt: { gte: twoWeeksAgo }
				}
			},
			ingredients: true
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
		estimatedItems,
		foodSets,
	};
};
