import { fail, redirect } from '@sveltejs/kit'
import type { Action, Actions } from './$types';

import { db } from '$lib/database.server';

const logWeight: Action = async ({ locals, request }) => {
    const data = await request.formData();
    let weight: any = data.get('weight');

    // Check if 'weight' is a number
    if (isNaN(weight)) {
        return fail(400);
    }
    else {
        weight = parseFloat(weight)
    }

    // Create weight entry for current user
    await db.user.update({
        where: {
            username: locals.user.name
        },
        data: {
            weights: {
                create: [{ weight }]
            }
        }
    });
};

const logBodyFat: Action = async ({ locals, request }) => {
    const data = await request.formData();
    let bodyfat: any = data.get('bodyfat');

    // Check if 'weight' is a number
    if (isNaN(bodyfat)) {
        return fail(400);
    }
    else {
        bodyfat = parseFloat(bodyfat)
    }

    // Create weight entry for current user
    await db.user.update({
        where: {
            username: locals.user.name
        },
        data: {
            bodyfats: {
                create: [{ bodyfat }]
            }
        }
    });
};

export const actions: Actions = { logWeight, logBodyFat }
