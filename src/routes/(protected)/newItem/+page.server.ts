// +page.server.ts
import type { Actions } from '@sveltejs/kit';

import { prisma } from '$lib/prismaClient.server';
import { supabase } from '$lib/supabaseClient.server';

export const actions = {
    upsertItem: async ({ locals, request }) => {
        const formData = await request.formData();
        const { name, kcal, protein, ingredients, foodId } = Object.fromEntries(formData.entries());
        const ingredientsArray = JSON.parse(ingredients as string);

        // Create or update entry in db
        const foodItem = await prisma.foodItem.upsert({
            where: { id: foodId ? Number(foodId) : -1 },
            update: {
                itemName: (name as string),
                kcal: parseInt(kcal as string),
                protein: parseFloat(protein as string),
                ingredients: {
                    // Delete all existing ingredients
                    deleteMany: {},
                    // Create new ingredients
                    create: ingredientsArray.map((ingredient: any) => ({
                        icon: ingredient.icon,
                        name: ingredient.name,
                        kcal: parseInt(ingredient.kcal),
                        protein: parseFloat(ingredient.protein)
                    }))
                }
            },
            create: {
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
        const filename = 'foodItem_' + foodItem.id;

        // Make presignedURL for upload from client
        // upsert: true will create a new file if it doesn't exist, or update the existing file
        const { data, error } = await supabase.storage
            .from('foodItems')
            .createSignedUploadUrl(filename, { upsert: true })

        if (!data) {
            throw new Error('Presigned URL could not be generated');
        }

        // return URL to user for upload
        return { presignedURL: data.signedUrl, foodItem }
    }
} satisfies Actions;
