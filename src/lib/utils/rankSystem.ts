export const RANK_DICT = {
    wood: {
        range: {
            male: {
                min: 20,
                max: 100,
                label: '>20%'
            },
            female: {
                min: 27,
                max: 100,
                label: '>27%'
            }
        }
    },
    bronze: {
        range: {
            male: {
                min: 15,
                max: 20,
                label: '15-20%'
            },
            female: {
                min: 21,
                max: 27,
                label: '21-27%'
            }
        }
    },
    silver: {
        range: {
            male: {
                min: 12,
                max: 15,
                label: '12-15%'
            },
            female: {
                min: 17,
                max: 21,
                label: '17-21%'
            }
        }
    },
    gold: {
        range: {
            male: {
                min: 10,
                max: 12,
                label: '10-12%'
            },
            female: {
                min: 14,
                max: 17,
                label: '14-17%'
            }
        }
    },
    platinum: {
        range: {
            male: {
                min: 0,
                max: 10,
                label: '<10%'
            },
            female: {
                min: 0,
                max: 14,
                label: '<14%'
            }
        }
    }
}

// Define Rank types based on RANK_DICT keys
type RankLiteral = keyof typeof RANK_DICT;
export type Rank = RankLiteral | 'tbd';

export const getCurrentCrestLevel = (bodyfatPercentage: number, isMale: boolean): Rank => {
    // This if clause triggers when no measurement has been taken yet
    if (bodyfatPercentage === 999) {
        return "tbd";
    }

    const genderKey = isMale ? 'male' : 'female';

    // Check platinum first (lowest bodyfat %)
    // Original logic: bodyfatPercentage < limit
    const platinumRankInfo = RANK_DICT.platinum.range[genderKey];
    if (bodyfatPercentage < platinumRankInfo.max) {
        return 'platinum';
    }

    // Check intermediate ranks: gold, silver, bronze
    // Original logic: bodyfatPercentage >= min_limit && bodyfatPercentage < max_limit
    const goldRankInfo = RANK_DICT.gold.range[genderKey];
    if (bodyfatPercentage >= goldRankInfo.min && bodyfatPercentage < goldRankInfo.max) {
        return 'gold';
    }

    const silverRankInfo = RANK_DICT.silver.range[genderKey];
    if (bodyfatPercentage >= silverRankInfo.min && bodyfatPercentage < silverRankInfo.max) {
        return 'silver';
    }

    const bronzeRankInfo = RANK_DICT.bronze.range[genderKey];
    if (bodyfatPercentage >= bronzeRankInfo.min && bodyfatPercentage < bronzeRankInfo.max) {
        return 'bronze';
    }

    // Check wood last (highest bodyfat %)
    // Original logic: bodyfatPercentage >= limit
    const woodRankInfo = RANK_DICT.wood.range[genderKey];
    if (bodyfatPercentage >= woodRankInfo.min) {
        return 'wood';
    }

    // Default return if no other condition is met (should ideally not be reached for valid percentages)
    return "tbd";
}

export const isValidRank = (rank: string): rank is Rank => {
    return ['tbd', 'wood', 'bronze', 'silver', 'gold', 'platinum'].includes(rank);
};