import { fail } from '@sveltejs/kit';
import type { Action, Actions, PageServerLoad } from './$types';

import {
	AWS_BUCKET_REGION,
	AWS_ACCESS_KEY_ID,
	AWS_SECRET_ACCESS_KEY,
	AWS_BUCKET_NAME
} from '$env/static/private';

import { db } from '$lib/database.server';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const s3 = new S3Client({
	region: AWS_BUCKET_REGION,
	credentials: {
		accessKeyId: AWS_ACCESS_KEY_ID,
		secretAccessKey: AWS_SECRET_ACCESS_KEY
	}
});

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
	const data = await request.formData();
	const { itemName, kcal, protein, portionSize } = Object.fromEntries(data.entries());

	// Create entry in db
	const { id } = await db.foodItem.create({
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
		},
		select: {
			id: true,
		}
	});

	// Make unique filename
	const filename = 'foodItem_' + id;

	// Make presignedURL
	const command = new PutObjectCommand({ Bucket: AWS_BUCKET_NAME, Key: filename });
	const presignedURL = await getSignedUrl(s3, command, { expiresIn: 60 * 5 });

	// return URL to user for upload
	return { presignedURL: presignedURL }
}

const finishPlanning: Action = async ({ request }) => {
	const formData = await request.formData()
	const dailySelection = formData.get('dailySelection');

	if (dailySelection) {
		const parsedDailySelection = JSON.parse(dailySelection as string)

		for (const item of parsedDailySelection) {
			const { id, intendedAmount } = item;

			await db.foodItem.update({

				where: { id },
				data: { intendedAmount }
			})
		}

		const userId = parsedDailySelection[0].userId

		await db.user.update({
			where: { id: userId },
			data: { dailyPlanned: true }
		})
	}
	return
}

const reset: Action = async ({ request }) => {
	const formData = await request.formData()
	const username = formData.get('username');

	const user = await db.user.update({
		where: { username: JSON.parse(username as string) },
		data: { dailyPlanned: false }
	})

	await db.foodItem.updateMany({
		where: { user },
		data: { intendedAmount: 0 }
	})
}

export const load: PageServerLoad = async ({ locals }) => {
	// Get user which include user.id
	const user = await db.user.findUnique({
		where: { username: locals.user.name },
	})

	// Check that user was found
	if (!user) {
		return [] // Return an empty array if user is null  
	}

	// Get items of that user
	let foodItems = await db.foodItem.findMany({
		where: { userId: user.id },
	})

	return {
		foodItems
	};
}

export const actions: Actions = { logWeight, logCalories, logBodyFat, newItem, finishPlanning, reset };
