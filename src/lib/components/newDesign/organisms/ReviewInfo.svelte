<script lang="ts">
	import { page } from '$app/state';
	import InfoCard from '../molecules/InfoCard.svelte';
	import TwoWeekTracker from '../molecules/TwoWeekTracker.svelte';

	interface Props {
		trend14days: number;
		twoWeekData: Array<'success' | 'failure' | 'unknown'>;
	}

	let { trend14days, twoWeekData }: Props = $props();

	let showTracker = $state(false);
	let touchStartX = $state(0);

	const handleTouchStart = (e: TouchEvent) => {
		touchStartX = e.touches[0].clientX;
	};

	const handleTouchMove = (e: TouchEvent) => {
		const touchEndX = e.touches[0].clientX;
		const diffX = touchEndX - touchStartX;

		// If swiping left on InfoCard (and not showing tracker yet)
		if (diffX < -50 && !showTracker) {
			showTracker = true;
			touchStartX = touchEndX;
		}

		// If swiping right on TwoWeekTracker (and showing tracker)
		if (diffX > 50 && showTracker) {
			showTracker = false;
			touchStartX = touchEndX;
		}
	};

	const toggleTracker = () => {
		showTracker = !showTracker;
	};
</script>

<div class="relative min-h-31 w-full overflow-x-clip">
	<!-- InfoCards -->
	<div
		class="absolute flex w-full flex-col transition-transform duration-800"
		style="transform: translateX({showTracker ? '-100%' : '0'});"
		ontouchstart={handleTouchStart}
		ontouchmove={handleTouchMove}
	>
		<div class="flex w-full justify-center space-x-4">
			<InfoCard
				icon="bolt"
				color="amber"
				mainText="Calorie Target"
				subText="per day"
				value={page.data.user.currentCalorieTarget}
				unit="kcal"
			/>
			<InfoCard
				icon="scale"
				color="indigo"
				mainText="Weight Trend"
				subText="past 14 days"
				value={trend14days}
				unit="kg"
			/>
		</div>
		<div class="mt-2 flex w-full justify-end px-4">
			<button class="text-xs font-medium text-stone-600" onclick={toggleTracker}>
				Tracking Success &rarr;
			</button>
		</div>
	</div>

	<!-- Tracking Success -->
	<div
		class="absolute flex w-full flex-col transition-transform duration-800"
		style="transform: translateX({showTracker ? '0' : '100%'});"
		ontouchstart={handleTouchStart}
		ontouchmove={handleTouchMove}
	>
		<TwoWeekTracker {twoWeekData} />
		<div class="mt-2 flex w-full justify-start px-4">
			<button class="text-xs font-medium text-stone-600" onclick={toggleTracker}>
				&larr; Back to Info
			</button>
		</div>
	</div>
</div>
