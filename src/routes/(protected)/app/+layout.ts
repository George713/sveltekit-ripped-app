import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public'
import { createBrowserClient, createServerClient, isBrowser, parse } from '@supabase/ssr'

export const load = async ({ fetch, data, depends }) => {
    depends('supabase:auth')

    const supabase = isBrowser()
        ? createBrowserClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
            global: { fetch },
            cookies: {
                get(key) {
                    const cookie = parse(document.cookie)
                    return cookie[key]
                }
            }
        })
        : createServerClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
            global: { fetch },
            cookies: {
                get() {
                    return JSON.stringify(data.session)
                }
            }
        })

    return {
        user: data.user,
        dailyProgress: data.dailyProgress,
        schedule: data.schedule,
        supabase,
        foodItems: data.foodItems,
        estimatedItems: data.estimatedItems,
        foodSets: data.foodSets
    }
}