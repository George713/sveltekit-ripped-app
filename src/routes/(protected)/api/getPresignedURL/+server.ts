import { json } from '@sveltejs/kit';

import { prisma } from '$lib/prismaClient.server';
import { supabase } from '$lib/supabaseClient.server';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ locals, request }) => {
	const formData = await request.formData()
	const type = formData.get('type') as 'initial' | 'goofy' | 'weekly';

	// Declare user, as the if-clause is in another scope as the next statement needing user
	let user

	// Create picture reference
	if (type === 'initial' || type === 'goofy') {
		user = await prisma.user.update({
			where: {
				id: locals.user.id
			},
			data: {
				progressPictures: {
					create: [{ type }]
				},
			}
		});
	} else {
		user = await prisma.user.update({
			where: {
				id: locals.user.id
			},
			data: {
				progressPictures: {
					create: [{ type }]
				},
				lastWeeklyPicOn: new Date,
			}
		});
	}
	// Get id of reference (for usage in filename)
	// @ts-ignore
	const { id } = await prisma.progressPicture.findFirst({
		where: { user },
		orderBy: { createdAt: 'desc' }
	});

	// Make filename = username + datetime
	const filename = 'progress_picture_' + id;

	// Make presignedURL
	const { data, error } = await supabase.storage
		.from('ripped-images-bucket')
		.createSignedUploadUrl(filename)

	if (!data) {
		throw new Error('Presigned URL could not be generated');
	}

	return json({ url: data.signedUrl });
};
