import { json } from '@sveltejs/kit';
import {
	AWS_BUCKET_REGION,
	AWS_ACCESS_KEY_ID,
	AWS_SECRET_ACCESS_KEY,
	AWS_BUCKET_NAME
} from '$env/static/private';

import { db } from '$lib/database.server';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

import type { RequestHandler } from './$types';

const s3 = new S3Client({
	region: AWS_BUCKET_REGION,
	credentials: {
		accessKeyId: AWS_ACCESS_KEY_ID,
		secretAccessKey: AWS_SECRET_ACCESS_KEY
	}
});

export const POST: RequestHandler = async ({ locals }) => {
	// Create picture reference
	const user = await db.user.update({
		where: {
			username: locals.user.name
		},
		data: {
			progressPictures: {
				create: [{}]
			},
			initPhoto: true
		}
	});
	// Get id of reference (for usage in filename)
	// @ts-ignore
	const { id } = await db.progressPicture.findFirst({
		where: { user },
		orderBy: { createdAt: 'desc' }
	});

	// Make filename = username + datetime
	const filename = 'progress_picture_' + id;

	// Make presignedURL
	const command = new PutObjectCommand({ Bucket: AWS_BUCKET_NAME, Key: filename });
	const presignedURL = await getSignedUrl(s3, command, { expiresIn: 60 * 5 });

	return json({ url: presignedURL });
};
