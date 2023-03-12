import { writable } from 'svelte/store';

// used for toggling modals
export const modalWeight = writable(false);
export const modalBodyFat = writable(false);