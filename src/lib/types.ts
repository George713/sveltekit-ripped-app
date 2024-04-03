export interface FoodItem {
    id: number;
    itemName: string;
    kcal: number;
    protein: number;
    portionSize: number;
    intendedAmount: number;
    eatenAmount: number;
}

export interface PlannedItem {
    id: number;
    eaten: boolean;
    createdAt: Date;
    foodId: number;
}