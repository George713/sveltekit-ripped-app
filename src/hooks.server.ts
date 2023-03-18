import type { Handle } from '@sveltejs/kit'
import { db } from '$lib/database.server'

export const handle: Handle = async ({ event, resolve }) => {
    // get cookies from browser
    const session = event.cookies.get('session')

    // if no cookies exist
    if (!session) {
        return await resolve(event)
    }

    const user = await db.user.findUnique({
        where: { userAuthToken: session },
        select: {
            username: true, role: true, initWeight: true, initBF: true, initPhoto: true, bodyfats: {
                orderBy: {
                    createdAt: 'desc',
                },
                select: {
                    bodyfat: true,
                },
                take: 1,
            }
        }
    })

    if (user) {
        event.locals.user = {
            name: user.username,
            role: user.role.name,
            initWeight: user.initWeight,
            initBF: user.initBF,
            initPhoto: user.initPhoto,
            currentBF: user.bodyfats[0].bodyfat,
        }
    }

    return await resolve(event)
}