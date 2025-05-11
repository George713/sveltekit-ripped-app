// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

import { SupabaseClient, Session } from '@supabase/supabase-js'
import type { ScheduledEvent } from '$lib/types';

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
				totalXP: number;
				streakMeter: number;
				currentBF: number;
				currentStatus: string;
				currentWeight: number;
				initBF: boolean;
				initPhotos: boolean;
				initCalories: boolean;
				progressPicToday: boolean;
				reviewToday: boolean;
				enterBodyfatToday: boolean;
			};
			dailyProgress: {
				createdAt: Date;
				targetCalories: number;
				targetProtein: number;
				consumedCalories: number;
				consumedProtein: number;
				xpGained: number;
				vaultXP: number;
				weighIn: boolean;
				planned: boolean;
				vaultOpened: boolean;
				progressPic: boolean;
				review: boolean;
				bodyfat: boolean;
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
