import { writable } from 'svelte/store';
import type { FoodItem } from './types';

export const foodLibrary = writable<FoodItem[]>([]);  