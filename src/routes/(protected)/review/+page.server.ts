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
        "ConsumedCalories" AS (
            -- PlannedItem calories
            SELECT
                pi."createdAt"::date AS "date",
                fi."kcal" AS "calories"
            FROM "PlannedItem" pi
            JOIN "FoodItem" fi ON pi."foodId" = fi."id"
            WHERE pi."eaten" = true AND fi."userId" = ${locals.user.id}
            
            UNION ALL
            
            -- EatEstimate calories
            SELECT
                ee."createdAt"::date AS "date",
                ee."kcal" AS "calories"
            FROM "EatEstimate" ee
            WHERE ee."eaten" = true AND ee."userId" = ${locals.user.id}
        ),
        "CalorieData" AS (
            SELECT
                ds."date",
                COALESCE(SUM(cc."calories"), 0) AS "kcal_consumed",
                (
                    SELECT ct."calories"
                    FROM "CalorieTarget" ct
                    WHERE ct."createdAt"::date <= ds."date" AND ct."userId" = ${locals.user.id}
                    ORDER BY ct."createdAt" DESC
                    LIMIT 1
                ) AS "kcal_target"
            FROM "DateSeries" ds
            LEFT JOIN "ConsumedCalories" cc ON cc."date" = ds."date"
            GROUP BY ds."date"
        )
        SELECT
            "date",
            "kcal_target",
            "kcal_consumed",
            CASE
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

        await prisma.user.update({
            where: {
                id: locals.user.id
            },
            data: {
                calorieTargets: {
                    create: [{ calories }]
                },
                lastReviewOn: new Date()
            }
        });
    }
}