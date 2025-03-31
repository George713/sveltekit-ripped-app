// hooks.server.ts
import { type Handle } from '@sveltejs/kit'

import type { Session } from '@supabase/supabase-js'
import { createServerClient } from '@supabase/ssr'
import jwt from 'jsonwebtoken'

import { prisma } from '$lib/prismaClient.server'
import {
	getDateDayBegin,
	getCurrentCrestLevel,
	actionIsOlderThanXdays,
	getScheduledEvent,
} from '$lib/utils'

import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';
import { JWT_SECRET } from '$env/static/private';
import type { Collectible, SupabaseJwt } from '$lib/types.js'

import { collectibles } from '$lib/collectibles'


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

	// Is this needed?
	// const session = await event.locals.getSession()

	// Get user data
	const { data } = await event.locals.supabase.auth.getUser()

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
				vaultXP: true,
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
						bodyfat: true,
						createdAt: true
					},
					take: 1
				},
				// weight measurements of the last 5 days
				weights: {
					orderBy: {
						createdAt: 'desc' // or 'asc' depending on your requirement
					},
					select: {
						weight: true,
						createdAt: true
					},
					take: 5
				},
				// Progress Pictures
				progressPictures: {
					orderBy: {
						createdAt: 'desc'
					},
					select: {
						type: true,
						createdAt: true
					}
				},
				// Collectibles
				collectedItems: {
					select: {
						count: true,
						collectible: {
							select: {
								name: true
							}
						}
					}
				},
				dailyProgress: {
					orderBy: {
						createdAt: 'desc'
					},
					take: 1
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
					vaultXP: true,
					calorieTargets: { take: 0 },
					bodyfats: { take: 0 },
					weights: { take: 0 },
					// Progress Pictures
					progressPictures: { take: 0 },
					// Collectibles
					collectedItems: {
						select: {
							count: true,
							collectible: {
								select: {
									name: true
								}
							}
						}
					},
					dailyProgress: { take: 0 },
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
		const dateDayBegin = getDateDayBegin(user.timeZoneOffset)

		// Create new daily progress if none exists for current day
		if (user.dailyProgress.length === 0 || user.dailyProgress[0].createdAt < dateDayBegin) {
			const newDailyProgress = await prisma.dailyProgress.create({
				data: {
					userId: user.id,
					targetCalories: user.calorieTargets[0].calories,
					targetProtein: Math.round(user.weights[0].weight * 1.6)
				}
			});
			user.dailyProgress.push(newDailyProgress);
		}

		// Filter out old weight information
		user.weights = user.weights.filter(weight => weight.createdAt >= getDateDayBegin(user!.timeZoneOffset, 4));

		// Add collection counts to collectibles variable
		const collection = user.collectedItems.map(item => {
			const collectible = collectibles.find(c => c.name === item.collectible.name);
			return {
				...collectible,
				count: item.count
			} as Collectible;
		});

		// User properties
		event.locals.user = {
			id: user.id,
			isMale: user.isMale,
			timeZoneOffset: user.timeZoneOffset,
			pointBalance: user.pointBalance,
			streakMeter: user.weights.length,
			currentBF: user.bodyfats.length > 0 ? user.bodyfats[0].bodyfat : 999,
			currentStatus: 'tbd',
			currentWeight: user.weights.length > 0 ? user.weights[0].weight : 100, // userWeight ? userWeight.weight : 100,
			initBF: user.bodyfats.length > 0, // whether init body fat measurement was taken
			initPhotos: user.progressPictures.some(pic => pic.type === 'initial') && user.progressPictures.some(pic => pic.type === 'goofy'),
			initCalories: user.calorieTargets.length > 0, // whether init calorie target was entered
			progressPicToday: new Date().toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase() === user.progressPicOn ? true : false,
			reviewToday: new Date().toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase() === user.reviewOn ? true : false,
			enterBodyfatToday: user.bodyfats.length > 0 ? actionIsOlderThanXdays(user.timeZoneOffset, user.bodyfats[0].createdAt, 28) : false,
			collection: collection,
		};
		// Derived value for user
		event.locals.user.currentStatus = getCurrentCrestLevel(event.locals.user.currentBF, user.isMale)
		// Daily Progress
		event.locals.dailyProgress = user.dailyProgress[0]
		// Upcoming Events
		event.locals.schedule = {
			nextProgressPic: getScheduledEvent(
				'weekly', /* type */
				'Progress Picture', /* name */
				user.timeZoneOffset, /* timeZoneOffset */
				user.progressPictures.find(pic => pic.type === 'weekly')?.createdAt, /* lastDate */
				user.progressPicOn /* fixedWeekDay */
			),
			nextReview: getScheduledEvent(
				'weekly', /* type */
				'Weekly Review', /* name */
				user.timeZoneOffset, /* timeZoneOffset */
				user.lastReviewOn, /* lastDate */
				user.reviewOn /* fixedWeekDay */
			),
			nextBodyfatMeasurement: getScheduledEvent(
				'fourWeekly', /* type */
				'Bodyfat Measurement', /* name */
				user.timeZoneOffset, /* timeZoneOffset */
				user.bodyfats.length > 0 ? user.bodyfats[0].createdAt : undefined /* lastDate */
			),
		}
		// Collection
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
