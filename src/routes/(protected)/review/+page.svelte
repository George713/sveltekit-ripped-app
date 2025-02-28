<script lang="ts">
	import { page } from '$app/state';
	import InfoCard from '$lib/components/newDesign/molecules/InfoCard.svelte';
	import TwoWeekTracker from '$lib/components/newDesign/molecules/TwoWeekTracker.svelte';
	import WeightChart from '$lib/components/newDesign/molecules/WeightChart.svelte';

	let { data } = $props();
	let showTracker = $state(false);
	let touchStartX = $state(0);

	const weights = $derived.by((): [Date, number][] => {
		return data.weights.map((weight) => [weight.createdAt as Date, weight.weight as number]);
	});

	const interpolatedWeights = $derived.by(() => {
		const interpolated: [Date, number][] = [];

		if (weights.length < 2) {
			interpolated.push([weights[0][0] as Date, weights[0][1] as number]);
			return interpolated;
		}

		const oneDay = 24 * 60 * 60 * 1000; // milliseconds in one day

		for (let i = 0; i < weights.length - 1; i++) {
			const [currentDate, currentWeight] = [weights[i][0] as Date, weights[i][1] as number];
			const [nextDate, nextWeight] = [weights[i + 1][0] as Date, weights[i + 1][1] as number];
			const daysBetween = Math.round((nextDate.getTime() - currentDate.getTime()) / oneDay);

			interpolated.push([currentDate, currentWeight]);

			if (daysBetween > 1) {
				const weightStep = (nextWeight - currentWeight) / daysBetween;
				for (let day = 1; day < daysBetween; day++) {
					const newDate = new Date(currentDate.getTime() + day * oneDay);
					const newWeight = currentWeight + day * weightStep;
					interpolated.push([newDate, newWeight]);
				}
			}
		}

		interpolated.push([
			weights[weights.length - 1][0] as Date,
			weights[weights.length - 1][1] as number
		]);
		return interpolated;
	});

	// Exponential moving average
	const trendWeight = $derived.by(() => {
		const smoothingFactor = 0.1;
		const ema: [Date, number][] = [];
		ema[0] = interpolatedWeights[0]; // Initialize with first date and weight

		for (let i = 1; i < interpolatedWeights.length; i++) {
			const [date, weight] = interpolatedWeights[i];
			const emaValue = smoothingFactor * weight + (1 - smoothingFactor) * ema[i - 1][1];
			ema[i] = [date, emaValue];
		}

		return ema;
	});

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

<WeightChart scaleWeight={weights} {trendWeight} periodInDays={30} />

<div class="relative w-full overflow-x-clip bg-red-500/20">
	<!-- InfoCard Section -->
	<div
		class="absolute mt-3 flex w-full flex-col transition-transform duration-800"
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
				value={trendWeight[trendWeight.length - 1][1] - trendWeight[trendWeight.length - 15][1]}
				unit="kg"
			/>
		</div>
		<div class="mt-2 flex w-full justify-end px-4">
			<button class="text-xs font-medium text-stone-600" onclick={toggleTracker}>
				Tracking Success &rarr;
			</button>
		</div>
	</div>

	<!-- TwoWeekTracker Section -->
	<div
		class="absolute mt-3 flex w-full flex-col transition-transform duration-800"
		style="transform: translateX({showTracker ? '0' : '100%'});"
		ontouchstart={handleTouchStart}
		ontouchmove={handleTouchMove}
	>
		<TwoWeekTracker twoWeekData={data.twoWeekData} />
		<div class="mt-2 flex w-full justify-start px-4">
			<button class="text-xs font-medium text-stone-600" onclick={toggleTracker}>
				&larr; Back to Info
			</button>
		</div>
	</div>
</div>
