import { fail, redirect } from '@sveltejs/kit'
import type { Action, Actions, PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ locals }) => {
    if (locals.user) {
        throw redirect(302, '/')
    }
}

const Fail = (error: { message: string, status?: number, name?: string }, data?: { email?: string }) => {
    return fail(error.status ?? 400, {
        error: error.message,
        data: {
            email: data?.email
        }
    })
}

const login: Action = async ({ request, locals: { supabase } }) => {
    const formData = await request.formData()
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    if (!email || !password)
        return Fail(
            { message: 'Please enter an email and password' },
            { email }
        )

    const { error } = await supabase.auth.signInWithPassword({
        email,
        password
    })

    if (error)
        return Fail(error, { email })

    /* Login successful, redirect. */
    redirect(303, '/')
}

export const actions: Actions = { login }