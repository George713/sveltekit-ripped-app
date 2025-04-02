// +page.server.ts
import type { Actions } from '@sveltejs/kit';

import { prisma } from '$lib/prismaClient.server';
import { supabase } from '$lib/supabaseClient.server';

export const actions = {
    newItem: async ({ locals, request }) => {
        const formData = await request.formData();
        const { name, kcal, protein, ingredients } = Object.fromEntries(formData.entries());
        const ingredientsArray = JSON.parse(ingredients as string);

        // Create entry in db
        const newItem = await prisma.foodItem.create({
            data: {
                itemName: (name as string),
                unitAmount: 1,
                unitIsPtn: true,
                kcal: parseInt(kcal as string),
                protein: parseFloat(protein as string),
                defaultPtnSizeInGram: null,
                kcalPer100: null,
                proteinPer100: null,
                user: {
                    connect: {
                        id: locals.user.id
                    },
                },
                // Create connected ingredients using the ingredients array
                ingredients: {
                    create: ingredientsArray.map((ingredient: any) => ({
                        icon: ingredient.icon,
                        name: ingredient.name,
                        kcal: parseInt(ingredient.kcal),
                        protein: parseFloat(ingredient.protein)
                    }))
                }
            }
        });

        // Make unique filename
        const filename = 'foodItem_' + newItem.id;

        // Make presignedURL for upload from client
        const { data, error } = await supabase.storage
            .from('foodItems')
            .createSignedUploadUrl(filename)

        if (!data) {
            throw new Error('Presigned URL could not be generated');
        }

        // return URL to user for upload
        return { presignedURL: data.signedUrl, newItem: newItem }
    }
} satisfies Actions;
