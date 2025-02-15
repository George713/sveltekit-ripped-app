import type { LayoutServerLoad } from '../$types';

export const load: LayoutServerLoad = async ({ locals }) => {
	return {
		user: locals.user,
		dailyProgress: locals.dailyProgress,
		schedule: locals.schedule,
		session: await locals.getSession()
	};
};
