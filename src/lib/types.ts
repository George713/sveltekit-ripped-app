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
    kcal: number;
    protein: number;
    imageVersion: number;
    PlannedItems: PlannedItem[];
    ingredients: Ingredient[]
}

export interface Ingredient {
    id: number;
    icon: string;
    name: string;
    kcal: number;
    protein: number;
    foodId: number;
}

export interface PlannedItem {
    id: number;
    eaten: boolean;
    createdAt: Date;
    foodId: number;
}

export interface EstimatedItem {
    id: number;
    eaten: boolean;
    createdAt: Date;
    kcal: number;
    protein: number;
    name?: string
}

export interface DailySelectionItem {
    id: number;
    foodId: number;
    itemName: string;
    kcal: number;
    protein: number;
    imageVersion: number;
}

export interface FoodSet {
    id: number;
    name: string;
    foodItemsInSet: FoodItemInSet[]
}

interface FoodItemInSet {
    foodId: number;
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
    animate?: boolean;
}

export interface Rewards {
    powerups: number;
    collectible: Collectible | null;
}

export interface Toast {
    type: 'error' | 'attention' | 'note';
    message: string;
    timeout?: number;
    id?: number;
};

export interface RecordedItem {
    name: string;
    kcal: number;
    protein: number;
    icon: string;
    shouldFocus?: boolean;
}

export interface RecordingResult {
    items: RecordedItem[];
    sumKcal: number;
    sumProtein: number;
}