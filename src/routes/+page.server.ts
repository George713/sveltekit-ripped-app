import { fail } from '@sveltejs/kit';
import type { Action, Actions } from './$types';

import { db } from '$lib/database.server';

const logWeight: Action = async ({ locals, request }) => {
	const data = await request.formData();
	let weight: any = data.get('weight');

	// Check if 'weight' is a number
	if (isNaN(weight)) {
		return fail(400);
	} else {
		weight = parseFloat(weight);
	}

	// Create weight entry for current user
	await db.user.update({
		where: {
			username: locals.user.name
		},
		data: {
			weights: {
				create: [{ weight }]
			}
		}
	});
};

const logCalories: Action = async ({ locals, request }) => {
	const data = await request.formData();
	let calories: any = data.get('calories');

	// Check if 'calories' is a number
	if (isNaN(calories)) {
		return fail(400);
	} else {
		calories = parseFloat(calories);
	}

	// Create calorie target entry for current user
	await db.user.update({
		where: {
			username: locals.user.name
		},
		data: {
			calorieTargets: {
				create: [{ calories }]
			},
			initCalories: true
		}
	});
};

const logBodyFat: Action = async ({ locals, request }) => {
	const data = await request.formData();
	let bodyfat: any = data.get('bodyfat');

	// Check if 'bodyweight' is a number
	if (isNaN(bodyfat)) {
		return fail(400);
	} else {
		bodyfat = parseFloat(bodyfat);
	}

	// Create bodyweight entry for current user
	await db.user.update({
		where: {
			username: locals.user.name
		},
		data: {
			bodyfats: {
				create: [{ bodyfat }]
			},
			initBF: true
		}
	});
};

export const actions: Actions = { logWeight, logCalories, logBodyFat };
