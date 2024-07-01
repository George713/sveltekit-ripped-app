// hooks.server.ts
import { type Handle } from '@sveltejs/kit'

import type { Session } from '@supabase/supabase-js'
import { createServerClient } from '@supabase/ssr'
import jwt from 'jsonwebtoken'
import { prisma } from '$lib/prismaClient.server'
import { getDateDayBegin, getCurrentCrestLevel } from '$lib/utils'

import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';
import { JWT_SECRET } from '$env/static/private';
import type { SupabaseJwt } from '$lib/types.js'


export const handle: Handle = async ({ event, resolve }) => {
	event.locals.supabase = createServerClient(
		PUBLIC_SUPABASE_URL,
		PUBLIC_SUPABASE_ANON_KEY,
		{
			cookies: {
				get: (key) => event.cookies.get(key),
				set: (key, value, options) => {
					event.cookies.set(key, value, { ...options, path: '/' })
				},
				remove: (key, options) => {
					event.cookies.delete(key, { ...options, path: '/' })
				}
			}
		}
	)

	event.locals.getSession = async (): Promise<Session | null> => {
		const {
			data: { session },
		} = await event.locals.supabase.auth.getSession()

		if (!session) return null

		/**
		 * Ensures the session is fully validated. See README Security section for details.
		 * 
		 * !!! Simply verifying the JWT does not validate the `session.user` object for use. !!!
		 * See "False Security" in https://github.com/orgs/supabase/discussions/23224
		 * The safest and easiest way to validate the session is by calling `getUser()`
		 * and using it's returned data. An alternative, which does not make a network call, 
		 * is to create a validated session; which we do below. 
		 */
		try {
			const decoded = jwt.verify(session.access_token, JWT_SECRET) as SupabaseJwt

			/**
			 * Create a validated session.
			 * 
			 * Most of these properties are required for functionality or typing.
			 * Add any data needed for your layouts or pages. In this example,
			 * the only properties which aren't required are `user.user_metadata.avatar_url & .nickname`,
			 * otherwise we'd just need to leave `user.user_metadata` as an empty object.
			 * 
			 * If possible, avoid using anything from `session.user` to populate these,
			 * especially unique user data like `id`, an email address, or any other
			 * user-unique data for queries.
			 */
			const validated_session: Session = {
				access_token: session.access_token,
				refresh_token: session.refresh_token,
				expires_at: decoded.exp,
				expires_in: decoded.exp - Math.round(Date.now() / 1000),
				token_type: 'bearer',
				user: {
					app_metadata: {},
					aud: 'authenticated',
					created_at: '',
					id: decoded.sub,
					user_metadata: {}
				}
			}

			return validated_session
		} catch (err) {
			return null
		}
	}

	const session = await event.locals.getSession()

	/**
	 * Only authenticated users can access these paths and their sub-paths.
	 * 
	 * If you'd rather do this in your routes, see (authenticated)/app/+page.server.ts
	 * for an example.
	 */
	// const auth_protected_paths = new Set(['']) //new Set(['app', 'self'])
	// if (!session && auth_protected_paths.has(event.url.pathname.split('/')[1]))
	// 	redirect(307, '/login')

	// Get user data
	const { data, error } = await event.locals.supabase.auth.getUser()

	if (data.user) {
		let user = await prisma.user.findUnique({
			where: {
				id: data.user.id
			},
			select: {
				id: true,
				isMale: true,
				timeZoneOffset: true,
				pointBalance: true,
				// current calorie target
				calorieTargets: {
					orderBy: {
						createdAt: 'desc'
					},
					select: {
						calories: true
					},
					take: 1
				},
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
				// weight measurements of the last 5 days
				weights: {
					where: {
						createdAt: {
							lte: getDateFromXDaysAgo(0),
							gte: getDateFromXDaysAgo(5)
						}
					},
					select: {
						createdAt: true
					},
					orderBy: {
						createdAt: 'desc' // or 'asc' depending on your requirement
					}
				},
				// Recurring activity progress
				lastPlannedOn: true,
				lastFinishedEatingOn: true,
				lastHarvestOn: true,
				lastWeeklyPicOn: true,
				lastReviewOn: true,
				// Appointments
				progressPicOn: true,
				reviewOn: true,
				// Progess Player Journey
				initPhoto: true
			}
		});

		if (!user) {
			user = await prisma.user.create({
				data: {
					id: data.user.id,
				},
				select: {
					id: true,
					isMale: true,
					timeZoneOffset: true,
					pointBalance: true,
					calorieTargets: { take: 0 },
					bodyfats: { take: 0 },
					weights: { take: 0 },
					// Recurring activity progress
					lastPlannedOn: true,
					lastFinishedEatingOn: true,
					lastHarvestOn: true,
					lastWeeklyPicOn: true,
					lastReviewOn: true,
					// Appointments
					progressPicOn: true,
					reviewOn: true,
					// Progess Player Journey
					initPhoto: true
				}
			});
		}

		const userWeight = await prisma.weight.findFirst({
			where: {
				userId: user.id
			},
			orderBy: {
				createdAt: 'desc'
			}
		});

		// User properties
		event.locals.user = {
			id: user.id,
			isMale: user.isMale,
			timeZoneOffset: user.timeZoneOffset,
			pointBalance: user.pointBalance,
			streakMeter: user.weights.length,
			currentCalorieTarget: user.calorieTargets.length > 0 ? user.calorieTargets[0].calories : 9999,
			currentBF: user.bodyfats.length > 0 ? user.bodyfats[0].bodyfat : 999,
			currentStatus: 'empty',
			currentWeight: userWeight ? userWeight.weight : 999,
			initBF: user.bodyfats.length > 0, // whether init body fat measurement was taken
			initPhoto: user.initPhoto,
			initCalories: user.calorieTargets.length > 0, // whether init calorie target was entered
			progressPicToday: new Date().toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase() === user.progressPicOn ? true : false,
			reviewToday: new Date().toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase() === user.reviewOn ? true : false
		};
		// Derived value for user
		event.locals.user.currentStatus = getCurrentCrestLevel(event.locals.user.currentBF, user.isMale)
		// Daily Progress
		const dateDayBegin = getDateDayBegin(user.timeZoneOffset)
		event.locals.dailyProgress = {
			weighIn: user.weights[0] ? user.weights[0].createdAt > dateDayBegin : false, // condition required for when user is new
			targetProtein: Math.round(event.locals.user.currentWeight * 1.6),
			planned: user.lastPlannedOn > dateDayBegin,
			eaten: user.lastFinishedEatingOn > dateDayBegin,
			harvest: user.lastHarvestOn > dateDayBegin,
			weeklyPic: user.lastWeeklyPicOn > dateDayBegin,
			weeklyReview: user.lastReviewOn > dateDayBegin,

		}
	}

	return resolve(event, {
		/**
		 * Supabase libraries use the `content-range` and `x-supabase-api-version`
		 * headers, so we need to tell SvelteKit to pass it through.
		 */
		filterSerializedResponseHeaders(name) {
			return name === 'content-range' || name === 'x-supabase-api-version'
		},
	})
};

const getDateFromXDaysAgo = (days: number) => {
	let date = new Date();
	date.setDate(date.getDate() - days);
	return date;
};
