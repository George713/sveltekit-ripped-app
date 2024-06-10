import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
	return {
		user: locals.user,
		dailyProgress: locals.dailyProgress,
		session: await locals.getSession()
	};
};
