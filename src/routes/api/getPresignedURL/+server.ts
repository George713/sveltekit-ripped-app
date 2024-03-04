import { json } from '@sveltejs/kit';

import { db } from '$lib/database.server';
import { supabase } from '$lib/supabaseClient.server';
import type { RequestHandler } from './$types';

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
	const { data, error } = await supabase.storage
		.from('ripped-images-bucket')
		.createSignedUploadUrl(filename)

	return json({ url: data.signedUrl });
};
