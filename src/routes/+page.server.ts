import { fail } from '@sveltejs/kit';
import type { Action, Actions, PageServerLoad } from './$types';

import { db } from '$lib/prismaClient.server';
import { supabase } from '$lib/supabaseClient.server';
import type { FoodItem, PlannedItem, UpdateDataCalories } from '$lib/types';
import { getDateDayBegin } from '$lib/utils';

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
			id: locals.user.id
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
	const reviewMode = data.get('reviewMode');

	// Check if 'calories' is a number
	if (isNaN(calories)) {
		return fail(400);
	} else {
		calories = parseFloat(calories);
	}

	// Create data for update
	let updateData: UpdateDataCalories = {
		calorieTargets: {
			create: [{ calories }]
		}
	}
	if (reviewMode) {
		updateData.lastReviewOn = new Date()
	}

	// Create calorie target entry for current user
	await db.user.update({
		where: {
			id: locals.user.id
		},
		data: updateData
	});
};

const logBodyFat: Action = async ({ locals, request }) => {
	const data = await request.formData();
	let bodyfat: any = data.get('bodyfat');
	let isMale = data.get('isMale') === 'true';

	// Check if 'bodyweight' is a number
	if (isNaN(bodyfat)) {
		return fail(400);
	} else {
		bodyfat = parseFloat(bodyfat);
	}

	/**
	 * Create bodyweight entry for current user
	 * If it's initial measurement, the gender is also requested.
	 */
	if (data.has('isMale')) {
		await db.user.update({
			where: {
				id: locals.user.id
			},
			data: {
				bodyfats: {
					create: [{ bodyfat }]
				},
				isMale
			}
		});
	} else {
		await db.user.update({
			where: {
				id: locals.user.id
			},
			data: {
				bodyfats: {
					create: [{ bodyfat }]
				},
			}
		});
	}
};

const newItem: Action = async ({ locals, request }) => {
	const formData = await request.formData();
	const {
		itemName,
		unitAmount,
		unitIsPtn,
		kcal,
		protein,
		defaultPtnSizeInGram,
		kcalPer100,
		proteinPer100
	} = Object.fromEntries(formData.entries());

	// Create entry in db
	const newItem = await db.foodItem.create({
		data: {
			itemName: (itemName as string),
			unitAmount: parseFloat(unitAmount as string),
			unitIsPtn: unitIsPtn === 'true',
			kcal: parseInt(kcal as string),
			protein: parseFloat(protein as string),
			defaultPtnSizeInGram: defaultPtnSizeInGram ? parseFloat(defaultPtnSizeInGram as string) : null,
			kcalPer100: kcalPer100 ? parseInt(kcalPer100 as string) : null,
			proteinPer100: proteinPer100 ? parseFloat(proteinPer100 as string) : null,
			user: {
				connect: {
					id: locals.user.id
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

const updateItem: Action = async ({ request }) => {
	const formData = await request.formData();
	const {
		id,
		itemName,
		unitAmount,
		unitIsPtn,
		kcal,
		protein,
		defaultPtnSizeInGram,
		kcalPer100,
		proteinPer100
	} = Object.fromEntries(formData.entries());

	// Ensure id is provided and is a number
	if (!id || isNaN(Number(id))) {
		return {
			status: 400,
			body: { error: 'Invalid or missing ID' }
		};
	}

	// Update the item in the database
	const updatedItem = await db.foodItem.update({
		where: { id: Number(id) },
		data: {
			itemName: itemName as string,
			unitAmount: parseFloat(unitAmount as string),
			unitIsPtn: unitIsPtn === 'true',
			kcal: parseInt(kcal as string),
			protein: parseFloat(protein as string),
			defaultPtnSizeInGram: defaultPtnSizeInGram ? parseFloat(defaultPtnSizeInGram as string) : null,
			kcalPer100: kcalPer100 ? parseInt(kcalPer100 as string) : null,
			proteinPer100: proteinPer100 ? parseFloat(proteinPer100 as string) : null
		}
	});

	return {
		message: 'Item updated successfully',
		updatedItem
	}
};

const addEstimate: Action = async ({ locals, request }) => {
	const formData = await request.formData();
	const { kcal, protein } = Object.fromEntries(formData.entries());

	// Create entry in db
	const newEstimate = await db.eatEstimate.create({
		data: {
			kcal: parseInt(kcal as string),
			protein: parseInt(protein as string),
			user: {
				connect: {
					id: locals.user.id
				},
			},
		}
	})

	return {
		newEstimate
	}
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

const finishPlanning: Action = async ({ locals, request }) => {
	const formData = await request.formData()
	const plannedItems = formData.get('plannedItems');

	if (plannedItems) {
		const parsedPlannedItems = JSON.parse(plannedItems as string)
		const cleanedPlannedItems = parsedPlannedItems.map((item: PlannedItem) => ({ ...item, id: undefined }))

		await db.plannedItem.createMany({
			data: cleanedPlannedItems
		});

		const today = new Date();
		const createdPlannedItems = await db.plannedItem.findMany({
			where: {
				foodItem: {
					user: {
						id: locals.user.id
					}
				},
				createdAt: {
					gte: new Date(today.setHours(3, 0, 0, 0))
				}
			}
		})

		await db.user.update({
			where: { id: locals.user.id },
			data: { lastPlannedOn: new Date() }
		})

		// Send the created planned items back to the client
		return { createdPlannedItems }
	}
}

const eatItem: Action = async ({ request }) => {
	const formData = await request.formData()
	const { id, type } = Object.fromEntries(formData.entries());

	if (type === 'planned') {
		await db.plannedItem.update({
			where: { id: parseInt(id as string) },
			data: { eaten: true }
		})
	}
	else if (type === 'estimate') {
		await db.eatEstimate.update({
			where: { id: parseInt(id as string) },
			data: { eaten: true }
		})
	}
}

const finishEating: Action = async ({ locals, request }) => {
	const formData = await request.formData()

	const user = await db.user.update({
		where: { id: locals.user.id },
		data: { lastFinishedEatingOn: new Date() }
	})
}

const harvestPoints: Action = async ({ locals, request }) => {
	const formData = await request.formData()
	const points = formData.get('points');

	// Update lastHarvestOn & pointBalance
	const user = await db.user.update({
		where: { id: locals.user.id },
		data: {
			lastHarvestOn: new Date(),
			pointBalance: { increment: parseInt(points as string, 10) },
		}
	})
}

const finishReview: Action = async ({ locals }) => {
	await db.user.update({
		where: {
			id: locals.user.id
		},
		data: {
			lastReviewOn: new Date()
		}
	});
}


const setUserTimeZoneOffset: Action = async ({ locals, request }) => {
	const formData = await request.formData()
	const timeZoneOffset = formData.get('timeZoneOffset');

	await db.user.update({
		where: { id: locals.user.id },
		data: { timeZoneOffset: JSON.parse(timeZoneOffset as string) }
	})
}

const reset: Action = async ({ locals }) => {
	const user = await db.user.update({
		where: { id: locals.user.id },
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
		const dateDayBegin = getDateDayBegin(locals.user.timeZoneOffset)

		// Get items of that user
		// prisma.js issue: https://github.com/prisma/prisma/issues/22631
		// Code, once its resolved:
		// ========================
		// const thirtyDaysAgo = new Date();
		// thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

		// let foodItems = await db.foodItem.findMany({
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

		const foodItems: [FoodItem] = await db.$queryRaw`
			SELECT "fi".*
			FROM "FoodItem" "fi"
			LEFT JOIN "PlannedItem" "pi" ON "fi"."id" = "pi"."foodId" AND "pi"."createdAt" >= ${twoWeeksAgo}
			WHERE "fi"."userId" = ${locals.user.id}
			GROUP BY "fi"."id"
			ORDER BY COUNT("pi"."id") DESC
		`;

		// Get planned items for the current day
		const plannedItems = await db.plannedItem.findMany({
			where: {
				foodId: { in: foodItems.map(item => item.id) },
				createdAt: { gte: dateDayBegin }
			},
			orderBy: {
				createdAt: 'asc'
			}
		});

		// Get eating estimate for the current day
		const eatEstimates = await db.eatEstimate.findMany({
			where: {
				createdAt: { gte: dateDayBegin }
			},
		});

		return {
			foodItems,
			plannedItems,
			eatEstimates,
		};
	}
}

export const actions: Actions = {
	logWeight,
	logCalories,
	logBodyFat,
	newItem,
	updateItem,
	addEstimate,
	deleteItem,
	finishPlanning,
	eatItem,
	finishEating,
	harvestPoints,
	finishReview,
	reset,
	setUserTimeZoneOffset,
};
