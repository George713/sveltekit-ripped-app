// import { fail, redirect } from '@sveltejs/kit'
import type { Action, Actions } from './$types';

import { db } from '$lib/database.server';

const logWeight: Action = async ({ request }) => {
    // const data = await request.formData();
    // const weight = data.get('weight');

    // if (typeof weight !== 'number') {
    // 	return fail(400, { invalid: true });
    // }


    console.log('weight');
    // get user

    // save weight to db

    // throw closing of modal
};

export const actions: Actions = { logWeight }
