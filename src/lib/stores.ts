import { derived, writable } from 'svelte/store';
import type { FoodItem } from './types';

export const foodLibrary = writable<FoodItem[]>([]);

export const dailySelection = derived(
    foodLibrary,
    ($foodLibrary) => $foodLibrary.filter((item) => item.intendedAmount > 0)
);

export const plannedKcal = derived(
    dailySelection,
    ($dailySelection) => $dailySelection.reduce((sum, item) => sum + item.kcal * item.intendedAmount, 0)
);

export const plannedProtein = derived(
    dailySelection,
    ($dailySelection) => $dailySelection.reduce((sum, item) => sum + item.protein * item.intendedAmount, 0)
);

export const eatenKcal = derived(
    dailySelection,
    ($dailySelection) => $dailySelection.reduce((sum, item) => sum + item.kcal * item.eatenAmount, 0)
);

export const eatenProtein = derived(
    dailySelection,
    ($dailySelection) => $dailySelection.reduce((sum, item) => sum + item.protein * item.eatenAmount, 0)
);  