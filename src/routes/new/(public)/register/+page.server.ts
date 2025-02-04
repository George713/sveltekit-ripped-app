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

const register: Action = async ({ request, locals: { supabase } }) => {
    const formData = await request.formData()
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const repeatPassword = formData.get('repeatPassword') as string

    if (password != repeatPassword) {
        return Fail({ message: "Passwords do not match.", status: 400 })
    }

    const { error } = await supabase.auth.signUp({
        email,
        password
    })

    if (error)
        return Fail(error, { email })
    else
        return { success: true }
}

export const actions: Actions = {
    register
}
