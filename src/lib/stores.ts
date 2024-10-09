import { derived, writable, get } from 'svelte/store';
import type { EatEstimate, FoodItem, PlannedItem, FoodSet, Rewards, Collectible } from '$lib/types';

const foodLibraryStore = () => {
    const store = writable<FoodItem[]>([]);
    const { subscribe, set, update } = store

    const findItemById = (id: number) => {
        const items = get(store);
        return items.find(item => item.id === id);
    };

    const calculateKcal = (item: FoodItem, unitIsPtn: boolean, unitAmount: number) => {
        if (unitIsPtn) {
            return item.unitIsPtn
                ? item.kcal
                : (item.defaultPtnSizeInGram / 100 * item.kcalPer100) * unitAmount;
        } else {
            return unitAmount / 100 * item.kcalPer100;
        }
    };

    const calculateProtein = (item: FoodItem, unitIsPtn: boolean, unitAmount: number) => {
        if (unitIsPtn) {
            return item.unitIsPtn
                ? item.protein
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
        findItemById,
        getItemNameByIndex: (id: number) => {
            const item = findItemById(id);
            return item ? item.itemName : "null";
        },
        getKcalByIndex: (id: number, unitIsPtn: boolean, unitAmount: number) => {
            const item = findItemById(id);
            return item ? calculateKcal(item, unitIsPtn, unitAmount) : 0;
        },
        getProteinByIndex: (id: number, unitIsPtn: boolean, unitAmount: number) => {
            const item = findItemById(id);
            return item ? calculateProtein(item, unitIsPtn, unitAmount) : 0;
        },
        getUnitAmountByIndex: (id: number) => {
            const item = findItemById(id);
            return item ? item.unitAmount : 0;
        }
    };
};
export const foodLibrary = foodLibraryStore()

const plannedItemsStore = () => {
    const store = writable<PlannedItem[]>([]);
    const { subscribe, set, update } = store

    /**
     * Given the id of a FoodSet, adds the items from the set
     * to the respective store.
     */
    const addFromSetById = (id: number) => {
        const set = get(foodSets).find(set => set.id === id);
        const index_start = get(store).reduce((maxId, item) => Math.max(item.id, maxId), 0) + 1
        set?.foodItemsInSet.forEach((food, index) => {
            const foodItem = foodLibrary.findItemById(food.foodId);
            if (foodItem) {
                const newPlannedItem: PlannedItem = {
                    id: index_start + index,
                    eaten: false,
                    createdAt: new Date(),
                    foodId: foodItem.id,
                    unitIsPtn: foodItem.unitIsPtn,
                    unitAmount: foodItem.unitAmount,
                };
                update((items) => [...items, newPlannedItem]);
            }
        })
    }

    return {
        subscribe,
        set,
        update,
        add: (item: PlannedItem) => update((items) => [...items, item]),
        addFromSetById,
        remove: (id: number) => update((items) => items.filter((item) => item.id !== id)),
        get maxId() {
            const items = get(this);
            return items.reduce((maxId, item) => Math.max(item.id, maxId), 0);
        }
    };
}
export const plannedItems = plannedItemsStore()
export const selectedForNewSet = plannedItemsStore()

const foodSetStore = (foodSets: FoodSet[]) => {
    const store = writable<FoodSet[]>(foodSets);
    const { subscribe, set, update } = store

    const findSetById = (id: number) => {
        const items = get(store);
        return items.find(item => item.id === id);
    };

    const totalKcalByIndex = (id: number) => {
        const set = findSetById(id)
        return set ? set.foodItemsInSet.reduce((sum, item) =>
            sum + foodLibrary.getKcalByIndex(item.foodId, item.unitIsPtn, item.unitAmount
            ), 0) : 0
    }

    const totalProteinByIndex = (id: number) => {
        const set = findSetById(id)
        return set ? set.foodItemsInSet.reduce((sum, item) =>
            sum + foodLibrary.getProteinByIndex(item.foodId, item.unitIsPtn, item.unitAmount
            ), 0) : 0
    }

    return {
        subscribe,
        set,
        update,
        add: (set: FoodSet) => update((sets) => [...sets, set]),
        remove: (id: number) => update((sets) => sets.filter((set) => set.id !== id)),
        findSetById,
        totalKcalByIndex,
        totalProteinByIndex
    }
}
export const foodSets = foodSetStore([])

export const activeSetId = writable<number | undefined>(undefined)

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

export const setKcal = derived([foodLibrary, selectedForNewSet], ([$foodLibrary, $selectedForNewSet]) => {
    return $selectedForNewSet.reduce((total, item) => {
        const kcal = foodLibrary.getKcalByIndex(item.foodId, item.unitIsPtn, item.unitAmount);
        return total + kcal;
    }, 0);
})

export const setProtein = derived([foodLibrary, selectedForNewSet], ([$foodLibrary, $selectedForNewSet]) => {
    return $selectedForNewSet.reduce((total, item) => {
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

export const originItem = writable<number>()

const rewardStore = () => {
    const { subscribe, set } = writable<Rewards>({
        'powerups': 0,
        'collectible': null
    })

    return {
        subscribe,
        set,
        reset: () => {
            set({ powerups: 0, collectible: null })
        }
    }
}
export const rewards = rewardStore()

// Used for controlling animation of item card
export const newItem = writable<string>()

export const collectiblesStore = writable<Collectible[]>()