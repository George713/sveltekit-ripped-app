import type { Handle } from '@sveltejs/kit';
import { db } from '$lib/database.server';

export const handle: Handle = async ({ event, resolve }) => {
	// get cookies from browser
	const session = event.cookies.get('session');

	// if no cookies exist
	if (!session) {
		return await resolve(event);
	}

	const user = await db.user.findUnique({
		where: {
			userAuthToken: session
		},
		select: {
			username: true,
			role: true,
			pointBalance: true,
			pointBalanceDaily: true,
			// current bodyfat
			bodyfats: {
				orderBy: {
					createdAt: 'desc'
				},
				select: {
					bodyfat: true
				},
				take: 1
			},
			initWeight: true,
			initBF: true,
			initPhoto: true
		}
	});

	if (user) {
		event.locals.user = {
			name: user.username,
			role: user.role.name,
			pointBalance: user.pointBalance,
			pointBalanceDaily: user.pointBalanceDaily,
			currentBF: user.bodyfats[0].bodyfat,
			initWeight: user.initWeight,
			initBF: user.initBF,
			initPhoto: user.initPhoto
		};
	}

	return await resolve(event);
};
