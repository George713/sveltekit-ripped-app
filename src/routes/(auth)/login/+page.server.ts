import { fail, redirect } from '@sveltejs/kit'
import type { Action, Actions, PageServerLoad } from './$types'
import bcrypt from 'bcrypt'

import { db } from '$lib/database.server'

export const load: PageServerLoad = async ({ locals }) => {
    if (locals.user) {
        throw redirect(302, '/')
    }
}

const login: Action = async ({ cookies, request }) => {
    const data = await request.formData()
    const username = data.get('username')
    const password = data.get('password')

    if (
        typeof username !== 'string' ||
        typeof password !== 'string' ||
        !username ||
        !password
    ) {
        return fail(400, { invalid: true })
    }

    const user = await db.user.findUnique({
        where: { username }
    })

    if (!user) {
        return fail(400, { credentials: true })
    }

    const userPassword = await bcrypt.compare(password, user.passwordHash)

    if (!userPassword) {
        return fail(400, { credentials: true })
    }

    // generate new auth token just in case
    const authenticatedUser = await db.user.update({
        where: { username: user.username },
        data: { userAuthToken: crypto.randomUUID() }
    })

    cookies.set('session', authenticatedUser.userAuthToken, {
        // send cookie for every page
        path: '/',
        // server side cookie only so you can't use `document.cookie`
        httpOnly: true,
        // only requests from the same site can send cookies
        sameSite: 'strict',
        // only sent over HTTPS in production
        secure: process.env.NODE_ENV === 'production',
        // set cookie to expire after a month
        maxAge: 60 * 60 * 24 * 30,
    })

    throw redirect(302, '/')
}

export const actions: Actions = { login }