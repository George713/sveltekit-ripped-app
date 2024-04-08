import { fail, redirect } from '@sveltejs/kit';
import type { Action, Actions, PageServerLoad } from './$types';

import { db } from '$lib/database.server';
import { supabase } from '$lib/supabaseClient.server';

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

const newItem: Action = async ({ locals, request }) => {
	const formData = await request.formData();
	const { itemName, kcal, protein, portionSize } = Object.fromEntries(formData.entries());

	// Create entry in db
	const newItem = await db.foodItem.create({
		data: {
			itemName: (itemName as string),
			kcal: parseInt(kcal as string),
			protein: parseInt(protein as string),
			portionSize: parseFloat(portionSize as string),
			user: {
				connect: {
					username: locals.user.name,
				},
			},
		}
	});

	// Make unique filename
	const filename = 'foodItem_' + newItem.id;

	// Make presignedURL for upload from client
	const { data, error } = await supabase.storage
		.from('foodItems')
		.createSignedUploadUrl(filename)

	if (!data) {
		throw new Error('Presigned URL could not be generated');
	}

	// return URL to user for upload
	return { presignedURL: data.signedUrl, newItem: newItem }
}

const deleteItem: Action = async ({ request }) => {
	const formData = await request.formData();
	const { id } = Object.fromEntries(formData.entries());

	// Delete item from db
	await db.foodItem.delete({
		where: { id: parseInt(id as string) }
	})

	// Delete image from S3
	const filename = 'foodItem_' + id;
	const { data, error } = await supabase
		.storage
		.from('foodItems')
		.remove([filename])
}

const finishPlanning: Action = async ({ request }) => {
	const formData = await request.formData()
	const plannedItems = formData.get('plannedItems');
	const username = formData.get('username')

	if (plannedItems) {
		const parsedPlannedItems = JSON.parse(plannedItems as string)

		const createdPlannedItems = await db.plannedItem.createMany({
			data: parsedPlannedItems,
			skipDuplicates: true, // Skip duplicates if you don't want to create them again
		});

		await db.user.update({
			where: { username: JSON.parse(username as string) },
			data: { lastPlannedOn: new Date() }
		})
	}
}

const eatItem: Action = async ({ request }) => {
	const formData = await request.formData()
	const { id } = Object.fromEntries(formData.entries());

	await db.plannedItem.update({
		where: { id: parseInt(id as string) },
		data: { eaten: true }
	})
}

const finishEating: Action = async ({ request }) => {
	const formData = await request.formData()
	const username = formData.get('username');

	const user = await db.user.update({
		where: { username: JSON.parse(username as string) },
		data: { lastFinishedEatingOn: new Date() }
	})
}

const harvestPoints: Action = async ({ locals, request }) => {
	const formData = await request.formData()
	const username = formData.get('username');
	const points = formData.get('points');

	// Update lastHarvestOn & pointBalance
	const user = await db.user.update({
		where: { username: JSON.parse(username as string) },
		data: {
			lastHarvestOn: new Date(),
			pointBalance: { increment: parseInt(points as string, 10) },
		}
	})
}

const reset: Action = async ({ request }) => {
	const formData = await request.formData()
	const username = formData.get('username');

	const user = await db.user.update({
		where: { username: JSON.parse(username as string) },
		data: {
			lastPlannedOn: new Date("1970-01-01"),
			lastFinishedEatingOn: new Date("1970-01-01"),
			lastHarvestOn: new Date("1970-01-01"),
			lastWeeklyPicOn: new Date("1970-01-01"),
		}
	})

	// Delete all PlannedItems associated with the user
	await db.plannedItem.deleteMany({
		where: { foodItem: { userId: user.id } },
	});

	// Delete latest record in weight table
	const latestWeight = await db.weight.findFirst({
		where: { userId: user.id },
		orderBy: {
			createdAt: 'desc', // Order by `createdAt` in descending order
		},
	});

	if (latestWeight) {
		// If a record was found, delete it
		await db.weight.delete({
			where: {
				id: latestWeight.id,
			},
		});
	}
}

export const load: PageServerLoad = async ({ locals }) => {
	if (locals.user) {
		// Get user which include user.id
		const user = await db.user.findUnique({
			where: { username: locals.user.name },
		})

		// Check that user was found
		if (!user) {
			return { foodItems: [], plannedItems: [] } // Return empty arrays if user is null  
		}

		// Get items of that user
		let foodItems = await db.foodItem.findMany({
			where: { userId: user.id },
		})

		// Get planned items for the current day
		const today = new Date();
		const plannedItems = await db.plannedItem.findMany({
			where: {
				foodId: { in: foodItems.map(item => item.id) },
				createdAt: { gte: new Date(today.setHours(3, 0, 0, 0)) }
			},
		});

		return {
			foodItems,
			plannedItems
		};
	}
}

export const actions: Actions = {
	logWeight,
	logCalories,
	logBodyFat,
	newItem,
	deleteItem,
	finishPlanning,
	eatItem,
	finishEating,
	harvestPoints,
	reset,
};
