// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user: {
				name: string;
				pointBalance: number;
				streakMeter: number;
				currentBF: number;
				currentStatus: string;
				currentWeight: number;
				currentCalorieTarget: number;
				initBF: boolean;
				initPhoto: boolean;
				initCalories: boolean;
				progressPicToday: boolean;
			};
			dailyProgress: {
				weighIn: boolean;
				targetProtein: number;
				planned: boolean;
				eaten: boolean;
				harvest: boolean;
				weeklyPic: boolean;
			};
		}
		// interface PageData {}
		// interface Platform {}
	}
}

export { };
