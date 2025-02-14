import type { Action, Actions } from "@sveltejs/kit";
import { fail } from "@sveltejs/kit";

const logWeight: Action = async ({ locals, request }) => {
    const data = await request.formData();
    let weight: any = data.get('weight');

    // Check if 'weight' is a number
    if (isNaN(weight)) {
        return fail(400);
    } else {
        weight = parseFloat(weight);
    }

    console.log(`Logged weight: ${weight}`);

    // Create weight entry for current user
    // await prisma.user.update({
    //     where: {
    //         id: locals.user.id
    //     },
    //     data: {
    //         weights: {
    //             create: [{ weight }]
    //         }
    //     }
    // });

    // const collectible = getRandomCollectible()

    return {
        rewards: {
            powerups: 1,
            // collectible: collectible,
        }
    }
};



export const actions: Actions = {
    logWeight,
};