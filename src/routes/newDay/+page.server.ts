import { redirect } from '@sveltejs/kit';
import { goto } from '$app/navigation';
import type { Action, Actions } from './$types';

import { db } from '$lib/database.server';

const newDay: Action = async ({ locals }) => {
    const user = await db.user.update({
        where: { username: locals.user.name },
        data: {
            activeDay: new Date().toISOString(),
            dailyPlanned: false,
            dailyEaten: false,
            dailyHarvest: false,
            weeklyPic: false,
        }
    })
}

export const actions: Actions = {
    newDay
}