// +page.server.ts
import type { Actions } from '@sveltejs/kit';

import { prisma } from '$lib/prismaClient.server';
import { supabase } from '$lib/supabaseClient.server';

export const actions = {
    upsertItem: async ({ locals, request }) => {
        const formData = await request.formData();
        const { name, kcal, protein, ingredients, foodId } = Object.fromEntries(formData.entries());
        const ingredientsParsed = JSON.parse(ingredients as string);
        const ingredientsArray = ingredientsParsed.map((ingredient: any) => ({
            icon: ingredient.icon,
            name: ingredient.name,
            kcal: parseInt(ingredient.kcal),
            protein: parseFloat(ingredient.protein)
        }))

        // Create or update entry in db
        const foodItem = await prisma.foodItem.upsert({
            where: { id: foodId ? Number(foodId) : -1 }, // -1 is a placeholder for non-existent ID
            update: {
                itemName: (name as string),
                kcal: parseInt(kcal as string),
                protein: parseFloat(protein as string),
                ingredients: {
                    // Delete all existing ingredients
                    deleteMany: {},
                    // Create new ingredients
                    create: ingredientsArray
                }
            },
            create: {
                itemName: (name as string),
                kcal: parseInt(kcal as string),
                protein: parseFloat(protein as string),
                user: {
                    connect: {
                        id: locals.user.id
                    },
                },
                // Create connected ingredients using the ingredients array
                ingredients: {
                    create: ingredientsArray
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
    },
    deleteItem: async ({ request }) => {
        const formData = await request.formData();
        const { foodId } = Object.fromEntries(formData.entries());

        // Delete entry from db
        await prisma.foodItem.delete({
            where: { id: Number(foodId) }
        });

        // Delete file from storage
        const { data, error } = await supabase.storage
            .from('foodItems')
            .remove(['foodItem_' + foodId]);

        if (error) {
            throw new Error('File could not be deleted');
        }

        return { success: true };
    }
} satisfies Actions;
