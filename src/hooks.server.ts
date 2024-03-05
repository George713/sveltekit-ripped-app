import type { Handle } from '@sveltejs/kit';
import { db } from '$lib/database.server';

export const handle: Handle = async ({ event, resolve }) => {
	// get cookies from browser
	const session = event.cookies.get('session');

	// if no cookies exist
	if (!session) {
		return await resolve(event);
	}

	const user = await db.user.findUnique({
		where: {
			userAuthToken: session
		},
		select: {
			id: true,
			username: true,
			pointBalance: true,
			// current calorie target
			calorieTargets: {
				orderBy: {
					createdAt: 'desc'
				},
				select: {
					calories: true
				},
				take: 1
			},
			// current bodyfat
			bodyfats: {
				orderBy: {
					createdAt: 'desc'
				},
				select: {
					bodyfat: true
				},
				take: 1
			},
			// weight measurements of the last 5 days
			weights: {
				where: {
					createdAt: {
						lte: getDateFromXDaysAgo(0),
						gte: getDateFromXDaysAgo(5)
					}
				},
				select: {
					createdAt: true
				}
			},
			// Daily progress
			dailyPlanned: true,
			dailyEaten: true,
			// Progess Player Journey
			initBF: true,
			initPhoto: true,
			initCalories: true
		}
	});

	if (user) {

		const userWeight = await db.weight.findFirst({
			where: {
				userId: user.id
			},
			orderBy: {
				createdAt: 'desc'
			}
		});

		event.locals.user = {
			name: user.username,
			pointBalance: user.pointBalance,
			streakMeter: user.weights.length,
			currentCalorieTarget: user.calorieTargets.length > 0 ? user.calorieTargets[0].calories : 9999,
			currentBF: user.bodyfats.length > 0 ? user.bodyfats[0].bodyfat : 999,
			currentWeight: userWeight ? userWeight.weight : 999,
			initBF: user.initBF,
			initPhoto: user.initPhoto,
			initCalories: user.initCalories
		};
		event.locals.dailyProgress = {
			weighIn: didWeightoday(user.weights),
			targetProtein: Math.round(event.locals.user.currentWeight * 2),
			planned: user.dailyPlanned,
			eaten: user.dailyEaten
		};
	}

	return await resolve(event);
};

const getDateFromXDaysAgo = (days: number) => {
	let date = new Date();
	date.setDate(date.getDate() - days);
	return date;
};

// @ts-ignore
const didWeightoday = (weights) => {
	const date = new Date().toLocaleDateString();
	// @ts-ignore
	const weightDateStrings = weights.map((weight) => weight.createdAt.toLocaleDateString());
	return weightDateStrings.includes(date);
};
