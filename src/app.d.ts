// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

import { SupabaseClient, Session } from '@supabase/supabase-js'
import type { Collectible, ScheduledEvent } from '$lib/types';

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			supabase: SupabaseClient
			getSession(): Promise<Session | null>
			user: {
				id: string,
				isMale: boolean;
				timeZoneOffset: number;
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
				reviewToday: boolean;
				enterBodyfatToday: boolean;
				collection: Collectible[];
			};
			dailyProgress: {
				weighIn: boolean;
				targetProtein: number;
				planned: boolean;
				eaten: boolean;
				harvest: boolean;
				weeklyPic: boolean;
				weeklyReview: boolean;
			};
			schedule: {
				nextProgressPic: ScheduledEvent;
				nextReview: ScheduledEvent;
				nextBodyfatMeasurement: ScheduledEvent;
			};
		}
		// interface PageData {}
		// interface Platform {}
	}
}

export { };
