import { fail } from '@sveltejs/kit';
import type { Action, Actions, PageServerLoad } from './$types';

import { prisma } from '$lib/prismaClient.server';
import { supabase } from '$lib/supabaseClient.server';
import type { FoodItem, PlannedItem, UpdateDataCalories } from '$lib/types';
import { getRandomCollectible } from '$lib/collectibles';
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
	await prisma.user.update({
		where: {
			id: locals.user.id
		},
		data: {
			weights: {
				create: [{ weight }]
			}
		}
	});

	const collectible = getRandomCollectible()

	return {
		rewards: {
			powerups: 1,
			collectible: collectible,
		}
	}
};

const collect: Action = async ({ locals, request }) => {
	const data = await request.formData();
	const collectibleName = data.get('collectibleName') as string;

	if (!collectibleName) {
		return fail(400, { message: 'Collectible name is required' });
	}

	// Find the collectible by name
	const collectible = await prisma.collectible.findUnique({
		where: { name: collectibleName },
	});

	if (!collectible) {
		return fail(404, { message: 'Collectible not found' });
	}

	// Upsert the collected item for the current user and the collectible
	await prisma.collectedItem.upsert({
		where: {
			userId_collectibleId: {
				userId: locals.user.id,
				collectibleId: collectible.id,
			},
		},
		update: {
			count: { increment: 1 },
		},
		create: {
			count: 1,
			collectible: { connect: { id: collectible.id } },
			user: { connect: { id: locals.user.id } },
		},
	});
}

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
	await prisma.user.update({
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
		await prisma.user.update({
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
		await prisma.user.update({
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
	const newItem = await prisma.foodItem.create({
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
	const updatedItem = await prisma.foodItem.update({
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
	const { name, kcal, protein } = Object.fromEntries(formData.entries());

	// Create entry in db
	const newEstimate = await prisma.eatEstimate.create({
		data: {
			name: name as string,
			kcal: parseInt(kcal as string),
			protein: parseFloat(protein as string),
			user: {
				connect: {
					id: locals.user.id
				},
			},
		}
	})

	// const newEstimate = {
	// 	id: 5000,
	// 	createdAt: new Date,
	// 	kcal: parseInt(kcal as string),
	// 	protein: parseFloat(protein as string),
	// 	eaten: false,
	// 	name: name as string
	// }

	return {
		newEstimate
	}
}

const deleteItem: Action = async ({ request }) => {
	const formData = await request.formData();
	const { id } = Object.fromEntries(formData.entries());

	// Delete item from db
	await prisma.foodItem.delete({
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

		await prisma.plannedItem.createMany({
			data: cleanedPlannedItems
		});

		const today = new Date();
		const createdPlannedItems = await prisma.plannedItem.findMany({
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

		await prisma.user.update({
			where: { id: locals.user.id },
			data: { lastPlannedOn: new Date() }
		})

		// Send the created planned items back to the client
		return { createdPlannedItems }
	}
}

const createSet: Action = async ({ locals, request }) => {
	const formData = await request.formData()
	const setName = formData.get('setName')
	const setItems = formData.get('selectedForNewSet');
	const setId = formData.get('setId') !== 'false' ? formData.get('setId') : false;

	if (setItems) {
		if (!setId) {
			// Create entry in FoodSet table
			const { id } = await prisma.foodSet.create({
				data: {
					name: (setName as string),
					user: {
						connect: {
							id: locals.user.id
						},
					},
				}
			});

			// Prepare data for FoodSet references
			const parsedSetItems = JSON.parse(setItems as string)
			const cleanedSetItems = parsedSetItems.map((item: PlannedItem) => (
				{ foodId: item.foodId, unitIsPtn: item.unitIsPtn, unitAmount: item.unitAmount, setId: Number(id), }
			))

			// Create FoodSet references
			await prisma.foodItemInSet.createMany({
				data: cleanedSetItems
			})
		} else {
			// Update existing entry
			await prisma.foodSet.update({
				where: {
					id: Number(setId)
				},
				data: {
					name: setName as string
				}
			});

			// Delete existing entries in FoodItemInSet for the given setId
			await prisma.foodItemInSet.deleteMany({
				where: {
					setId: Number(setId)
				}
			});

			// Prepare data for new set references
			const parsedSetItems = JSON.parse(setItems as string);
			const cleanedSetItems = parsedSetItems.map((item: PlannedItem) => (
				{ foodId: item.foodId, unitIsPtn: item.unitIsPtn, unitAmount: item.unitAmount, setId: Number(setId) }
			));

			// Create new entries in FoodItemInSet
			await prisma.foodItemInSet.createMany({
				data: cleanedSetItems
			});
		}
	}
}

const deleteSet: Action = async ({ request }) => {
	const formData = await request.formData()
	const setId = formData.get('setId');

	if (setId) {
		const id = Number(setId);

		// Delete all FoodItemInSet records associated with the set
		await prisma.foodItemInSet.deleteMany({
			where: {
				setId: id
			}
		});

		// Delete the FoodSet record
		await prisma.foodSet.delete({
			where: {
				id
			}
		});
	}
}

const eatItem: Action = async ({ request }) => {
	const formData = await request.formData()
	const { id, type } = Object.fromEntries(formData.entries());

	if (type === 'planned') {
		await prisma.plannedItem.update({
			where: { id: parseInt(id as string) },
			data: { eaten: true }
		})
	}
	else if (type === 'estimate') {
		await prisma.eatEstimate.update({
			where: { id: parseInt(id as string) },
			data: { eaten: true }
		})
	}
}

const finishEating: Action = async ({ locals, request }) => {
	const formData = await request.formData()

	const user = await prisma.user.update({
		where: { id: locals.user.id },
		data: { lastFinishedEatingOn: new Date() }
	})
}

const harvestPoints: Action = async ({ locals, request }) => {
	const formData = await request.formData()
	const points = formData.get('points');

	// Update lastHarvestOn & pointBalance
	const user = await prisma.user.update({
		where: { id: locals.user.id },
		data: {
			lastHarvestOn: new Date(),
			pointBalance: { increment: parseInt(points as string, 10) },
		}
	})
}

const finishReview: Action = async ({ locals }) => {
	await prisma.user.update({
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

	await prisma.user.update({
		where: { id: locals.user.id },
		data: { timeZoneOffset: JSON.parse(timeZoneOffset as string) }
	})
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
		const eatEstimates = await prisma.eatEstimate.findMany({
			where: {
				createdAt: { gte: dateDayBegin }
			},
		});

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
			eatEstimates,
			foodSets,
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
	createSet,
	deleteSet,
	eatItem,
	finishEating,
	harvestPoints,
	finishReview,
	setUserTimeZoneOffset,
	collect,
};
