import { derived, writable, get } from 'svelte/store';
import type { EatEstimate, FoodItem, PlannedItem } from './types';

const foodLibraryStore = () => {
    const store = writable<FoodItem[]>([]);
    const { subscribe, set, update } = store

    const findItemById = (items: FoodItem[], id: number) => items.find(item => item.id === id);

    const calculateKcal = (item: FoodItem, unitIsPtn: boolean, unitAmount: number) => {
        if (unitIsPtn) {
            return item.unitIsPtn
                ? unitAmount * item.kcal
                : (item.defaultPtnSizeInGram / 100 * item.kcalPer100) * unitAmount;
        } else {
            return unitAmount / 100 * item.kcalPer100;
        }
    };

    const calculateProtein = (item: FoodItem, unitIsPtn: boolean, unitAmount: number) => {
        if (unitIsPtn) {
            return item.unitIsPtn
                ? unitAmount * item.protein
                : (item.defaultPtnSizeInGram / 100 * item.proteinPer100) * unitAmount;
        } else {
            return unitAmount / 100 * item.proteinPer100;
        }
    };

    return {
        subscribe,
        set,
        update,
        add: (item: FoodItem) => update((items) => [...items, item]),
        remove: (id: number) => update((items) => items.filter((item) => item.id !== id)),
        getItemNameByIndex: (id: number) => {
            const items = get(store);
            const item = findItemById(items, id);
            return item ? item.itemName : "null";
        },
        getKcalByIndex: (id: number, unitIsPtn: boolean, unitAmount: number) => {
            const items = get(store);
            const item = findItemById(items, id);
            return item ? calculateKcal(item, unitIsPtn, unitAmount) : 0;
        },
        getProteinByIndex: (id: number, unitIsPtn: boolean, unitAmount: number) => {
            const items = get(store);
            const item = findItemById(items, id);
            return item ? calculateProtein(item, unitIsPtn, unitAmount) : 0;
        },
        getUnitAmountByIndex: (id: number) => {
            const items = get(store);
            const item = findItemById(items, id);
            return item ? item.unitAmount : 0;
        }
    };
};
export const foodLibrary = foodLibraryStore()

const plannedItemsStore = () => {
    const { subscribe, set, update } = writable<PlannedItem[]>([]);

    return {
        subscribe,
        set,
        update,
        add: (item: PlannedItem) => update((items) => [...items, item]),
        remove: (id: number) => update((items) => items.filter((item) => item.id !== id)),
        get maxId() {
            const items = get(this);
            return items.reduce((maxId, item) => Math.max(item.id, maxId), 0);
        },
    };
}
export const plannedItems = plannedItemsStore()

export const estimatesLog = writable<EatEstimate[]>([]);

export const plannedKcal = derived([foodLibrary, plannedItems], ([$foodLibrary, $plannedItems]) => {
    return $plannedItems.reduce((total, item) => {
        const kcal = foodLibrary.getKcalByIndex(item.foodId, item.unitIsPtn, item.unitAmount);
        return total + kcal;
    }, 0);
})

export const plannedProtein = derived([foodLibrary, plannedItems], ([$foodLibrary, $plannedItems]) => {
    return $plannedItems.reduce((total, item) => {
        const protein = foodLibrary.getProteinByIndex(item.foodId, item.unitIsPtn, item.unitAmount);
        return total + protein;
    }, 0);
})

export const eatenKcal = derived([foodLibrary, plannedItems, estimatesLog], ([$foodLibrary, $plannedItems, $estimatesLog]) => {
    const kcalFromPlannedItems = $plannedItems.reduce((sum, item) => sum + foodLibrary.getKcalByIndex(item.foodId, item.unitIsPtn, item.unitAmount) * (item.eaten ? 1 : 0), 0)
    const kcalFromEstimates = $estimatesLog.reduce((sum, item) => sum + item.kcal * (item.eaten ? 1 : 0), 0)

    return kcalFromPlannedItems + kcalFromEstimates
})

export const eatenProtein = derived([foodLibrary, plannedItems, estimatesLog], ([$foodLibrary, $plannedItems, $estimatesLog]) => {
    const proteinFromPlannedItems = $plannedItems.reduce((sum, item) => sum + foodLibrary.getProteinByIndex(item.foodId, item.unitIsPtn, item.unitAmount) * (item.eaten ? 1 : 0), 0)
    const proteinFromEstimates = $estimatesLog.reduce((sum, item) => sum + item.protein * (item.eaten ? 1 : 0), 0)

    return proteinFromPlannedItems + proteinFromEstimates
})

export const showSpinner = writable(false);

const visibleViewStore = () => {
    const { subscribe, update } = writable({
        'previous': 'none',
        'current': 'none'
    })

    return {
        subscribe,
        update: (newView: string) => {
            update(state => {
                state.previous = state.current;
                state.current = newView;
                return state;
            });
        }
    }
}
export const visibleView = visibleViewStore()

const visibleOverlayStore = () => {
    const { subscribe, set } = writable('none')

    return {
        subscribe,
        set,
    }
}
export const visibleOverlay = visibleOverlayStore()

export const weightTrend = writable<number[]>([])