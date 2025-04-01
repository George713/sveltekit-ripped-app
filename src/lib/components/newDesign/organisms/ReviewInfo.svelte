<script lang="ts">
	import { page } from '$app/state';
	import InfoCard from '../molecules/InfoCard.svelte';
	import TwoWeekTracker from '../molecules/TwoWeekTracker.svelte';
	import { SwipeDetector } from '$lib/utils.svelte';

	interface Props {
		trend14days: number;
		twoWeekData: Array<'success' | 'failure' | 'unknown'>;
	}

	let { trend14days, twoWeekData }: Props = $props();

	let showTracker = $state(false);
	const swipeDetector = new SwipeDetector({
		threshold: 50,
		onSwipeLeft: () => (showTracker = true),
		onSwipeRight: () => (showTracker = false)
	});
</script>

<div class="relative min-h-31 w-full overflow-x-clip">
	<!-- InfoCards -->
	<div
		class="absolute flex w-full flex-col transition-transform duration-800"
		style="transform: translateX({showTracker ? '-100%' : '0'});"
		ontouchstart={swipeDetector.handleTouchStart}
		ontouchmove={swipeDetector.handleTouchMove}
	>
		<div class="flex w-full justify-center space-x-4">
			<InfoCard
				icon="bolt"
				color="amber"
				mainText="Calorie Target"
				subText="per day"
				value={page.data.dailyProgress.targetCalories}
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
			<button class="text-xs font-medium text-stone-600" onclick={() => (showTracker = true)}>
				Tracking Success &rarr;
			</button>
		</div>
	</div>

	<!-- Tracking Success -->
	<div
		class="absolute flex w-full flex-col transition-transform duration-800"
		style="transform: translateX({showTracker ? '0' : '100%'});"
		ontouchstart={swipeDetector.handleTouchStart}
		ontouchmove={swipeDetector.handleTouchMove}
	>
		<TwoWeekTracker {twoWeekData} />
		<div class="mt-2 flex w-full justify-start px-4">
			<button class="text-xs font-medium text-stone-600" onclick={() => (showTracker = false)}>
				&larr; Back to Info
			</button>
		</div>
	</div>
</div>
