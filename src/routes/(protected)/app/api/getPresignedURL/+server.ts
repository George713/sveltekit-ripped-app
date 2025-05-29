import { json } from '@sveltejs/kit';

import { prisma } from '$lib/prismaClient.server';
import { supabase } from '$lib/supabaseClient.server';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ locals, request }) => {
	const formData = await request.formData()
	const type = formData.get('type') as 'initial' | 'goofy' | 'weekly';

	// Use transaction to combine both operations
	const { id } = await prisma.$transaction(async (tx) => {
		// Create picture reference
		const updatedUser = await tx.user.update({
			where: {
				id: locals.user.id
			},
			data: {
				progressPictures: {
					create: [{ type }]
				},
			},
			include: {
				progressPictures: {
					orderBy: { createdAt: 'desc' },
					take: 1
				}
			}
		});
		// Update daily progress
		await tx.dailyProgress.update({
			where: {
				userId_createdAt: {
					userId: locals.user.id,
					createdAt: locals.dailyProgress.createdAt
				}
			},
			data: {
				progressPic: true
			}
		});
		return updatedUser.progressPictures[0];
	});

	const filename = id.toString();

	// Make presignedURL
	const { data, error } = await supabase.storage
		.from('progress-pictures/' + locals.user.id)
		.createSignedUploadUrl(filename)

	if (!data) {
		throw new Error('Presigned URL could not be generated');
	}

	return json({ url: data.signedUrl });
};
