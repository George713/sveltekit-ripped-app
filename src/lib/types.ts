export type SupabaseJwt = {
    aal: string;
    aud: string;
    email: string;
    exp: number;
    iat: number;
    phone: string;
    role: string;
    session_id: string;
    sub: string;
    amr?: { method: string; timestamp: number; }[];
    app_metadata?: {
        provider?: string;
        providers?: string[];
        [key: string]: any;
    };
    is_anonymous?: boolean;
    iss?: string;
    jti?: string;
    nbf?: string;
    user_metadata?: {
        [key: string]: any;
    };
}

export interface FoodItem {
    id: number;
    itemName: string;
    unitIsPtn: boolean;
    unitAmount: number;
    kcal: number;
    protein: number;
    defaultPtnSizeInGram: number;
    kcalPer100: number;
    proteinPer100: number;
}

export interface PlannedItem {
    id: number;
    eaten: boolean;
    createdAt: Date;
    foodId: number;
    unitIsPtn: boolean;
    unitAmount: number;
}

export interface FoodSet {
    id: number;
    name: string;
    foodItemsInSet: FoodItemInSet[]
}

interface FoodItemInSet {
    foodId: number;
    unitIsPtn: boolean;
    unitAmount: number
}

export interface EatEstimate {
    id: number;
    eaten: boolean;
    createdAt: Date;
    kcal: number;
    protein: number;
}

export interface WeightData {
    weight: number;
    createdAt: string;
};

export interface UpdateDataCalories {
    calorieTargets: {
        create: { calories: number }[];
    };
    lastReviewOn?: Date;
}

export interface ScheduledEvent {
    date: Date;
    name: string;
    remainingDays: number;
}

export interface Collectible {
    set: 'quotes' | 'nuts' | 'sports' | 'statues' | '?';
    name: string;
    text: string;
    imgPath: string;
    thumbPath: string;
    rarity: 'blue' | 'bronze' | 'silver' | 'gold';
    count?: number;
}

export interface Rewards {
    powerups: number;
    collectible: Collectible | null;
}