import { redirect } from '@sveltejs/kit'
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
	if (!locals.user) {
		throw redirect(302, '/new/login')
	}
	return {
		user: locals.user,
		dailyProgress: locals.dailyProgress,
		schedule: locals.schedule,
		session: await locals.getSession()
	};
};
