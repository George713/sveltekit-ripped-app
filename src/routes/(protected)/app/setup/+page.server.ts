import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

import { prisma } from "$lib/prismaClient.server";
import type { LanguageCode } from '$lib/lang';

export const actions: Actions = {
	default: async ({ locals, request }) => {
		const data = await request.formData();
		const useMetricSystem = data.get('useMetricSystem') === 'true'; // formData values are strings
		const language = data.get('language') as LanguageCode;

		await prisma.user.update({
			where: { id: locals.user.id },
			data: {
				useMetricSystem: useMetricSystem,
				voiceLanguage: language,
				didSetup: true
			}
		});

		// Redirect to a main page after successful setup
		throw redirect(303, '/');
	}
};