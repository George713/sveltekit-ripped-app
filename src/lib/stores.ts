import { derived, writable, get } from 'svelte/store';
import type { FoodItem, PlannedItem } from './types';

const foodLibraryStore = () => {
    const store = writable<FoodItem[]>([]);
    const { subscribe, set, update } = store

    return {
        subscribe,
        set,
        update,
        add: (item: FoodItem) => update((items) => [...items, item]),
        remove: (id: number) => update((items) => items.filter((item) => item.id !== id)),
        getItemNameByIndex: (id: number) => {
            const items = get(store)
            return items.reduce((value, item) => (item.id === id ? item.itemName : value), "null")
        },
        getKcalByIndex: (id: number) => {
            const items = get(store)
            return items.reduce((value, item) => (item.id === id ? item.kcal : value), 0)
        },
        getProteinByIndex: (id: number) => {
            const items = get(store)
            return items.reduce((value, item) => (item.id === id ? item.protein : value), 0)
        },
        getPortionSizeByIndex: (id: number) => {
            const items = get(store)
            return items.reduce((value, item) => (item.id === id ? item.portionSize : value), 0)
        }
    }
}
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

export const plannedKcal = derived([foodLibrary, plannedItems], ([$foodLibrary, $plannedItems]) => {
    return $plannedItems.reduce((total, item) => {
        const kcal = foodLibrary.getKcalByIndex(item.foodId);
        return total + kcal;
    }, 0);
})

export const plannedProtein = derived([foodLibrary, plannedItems], ([$foodLibrary, $plannedItems]) => {
    return $plannedItems.reduce((total, item) => {
        const protein = foodLibrary.getProteinByIndex(item.foodId);
        return total + protein;
    }, 0);
})

export const eatenKcal = derived([foodLibrary, plannedItems], ([$foodLibrary, $plannedItems]) =>
    $plannedItems.reduce((sum, item) => sum + foodLibrary.getKcalByIndex(item.foodId) * (item.eaten ? 1 : 0), 0)
);

export const eatenProtein = derived([foodLibrary, plannedItems], ([$foodLibrary, $plannedItems]) =>
    $plannedItems.reduce((sum, item) => sum + foodLibrary.getProteinByIndex(item.foodId) * (item.eaten ? 1 : 0), 0)
);

export const showSpinner = writable(false);