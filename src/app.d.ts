// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user: {
				name: string;
				role: string;
				pointBalance: number;
				streakMeter: number;
				currentBF: number;
				currentWeight: number;
				currentCalorieTarget: number;
				initBF: boolean;
				initPhoto: boolean;
				initCalories: boolean;
			};
			dailyProgress: {
				weighIn: boolean;
				calories: number;
				protein: number;
				planned: boolean;
			};
		}
		// interface PageData {}
		// interface Platform {}
	}
}

export { };
