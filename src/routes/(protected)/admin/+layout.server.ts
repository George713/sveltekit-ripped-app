import { redirect } from '@sveltejs/kit'
import type { LayoutServerLoad } from '../$types';


export const load: LayoutServerLoad = async ({ locals }) => {
	// If user is not an admin
	if (locals.user.role !== 'admin') {
		throw redirect(302, '/app')
	};
}
