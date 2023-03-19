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
				pointBalanceDaily: number;
				streakMeter: number;
				currentBF: number;
				initWeight: boolean;
				initBF: boolean;
				initPhoto: boolean;
			};
		}
		// interface PageData {}
		// interface Platform {}
	}
}

export {};
