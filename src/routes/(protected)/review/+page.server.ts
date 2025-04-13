import { prisma } from '$lib/prismaClient.server';
import { fail, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
    const weights = await prisma.weight.findMany({
        where: { userId: locals.user.id },
        select: {
            weight: true,
            createdAt: true
        },
        orderBy: { createdAt: 'asc' }
    });

    const eattingHistory: Array<{
        date: Date;
        kcal_target: number;
        kcal_consumed: number;
        status: 'success' | 'failure' | 'unknown'
    }> = await prisma.$queryRaw`
        WITH "DateSeries" AS (
            SELECT generate_series(
                CURRENT_DATE - INTERVAL '14 days',
                CURRENT_DATE - INTERVAL '1 day',
                '1 day'
            )::date AS "date"
        ),
        "DailyCalorieData" AS (
            SELECT
                dp."createdAt"::date AS "date",
                dp."consumedCalories" AS "kcal_consumed",
                dp."targetCalories" AS "kcal_target"
            FROM "DailyProgress" dp
            WHERE dp."userId" = ${locals.user.id}
            AND dp."createdAt"::date >= CURRENT_DATE - INTERVAL '14 days'
            AND dp."createdAt"::date <= CURRENT_DATE - INTERVAL '1 day'
        ),
        "CalorieData" AS (
            SELECT
                ds."date",
                dcd."kcal_consumed",
                dcd."kcal_target"
            FROM "DateSeries" ds
            LEFT JOIN "DailyCalorieData" dcd ON dcd."date" = ds."date"
        )
        SELECT
            "date",
            "kcal_target",
            "kcal_consumed",
            CASE
                WHEN "kcal_target" IS NULL OR "kcal_target" = 0 THEN 'unknown'
                WHEN ABS("kcal_consumed" - "kcal_target") <= 25 THEN 'success'
                WHEN "kcal_consumed" > "kcal_target" THEN 'failure'
                ELSE 'unknown'
            END AS "status"
        FROM "CalorieData"
        ORDER BY "date" ASC;
    `;

    const twoWeekData = eattingHistory.map((item) => item.status);

    return { weights, twoWeekData };
};

export const actions: Actions = {
    keepTarget: async ({ locals }) => {
        await prisma.user.update({
            where: {
                id: locals.user.id
            },
            data: {
                lastReviewOn: new Date()
            }
        });
    },
    adjustTarget: async ({ locals, request }) => {
        const data = await request.formData();
        let calories: any = data.get('calories');

        // Check if 'calories' is a number
        if (isNaN(calories)) {
            return fail(400);
        } else {
            calories = parseFloat(calories);
        }

        // Use transaction to combine both operations
        await prisma.$transaction(async (tx) => {
            // Create items
            await tx.user.update({
                where: {
                    id: locals.user.id
                },
                data: {
                    calorieTargets: {
                        create: [{ calories }]
                    }
                }
            })

            // Update daily progress
            await tx.dailyProgress.update({
                where: {
                    userId_createdAt: {
                        userId: locals.user.id,
                        createdAt: locals.dailyProgress.createdAt
                    }
                },
                data: {
                    targetCalories: calories,
                    review: true
                }
            });
        });
    }
}