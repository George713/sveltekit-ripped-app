<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import Minimizer from '$lib/components/newDesign/atoms/Minimizer.svelte';
	import WeightChart from '$lib/components/newDesign/molecules/WeightChart.svelte';
	import CalorieOverlay from '$lib/components/newDesign/organisms/CalorieOverlay.svelte';
	import ReviewInfo from '$lib/components/newDesign/organisms/ReviewInfo.svelte';
	import { calorieManager, toastManager, visibilityManager } from '$lib/stateManagers.svelte.js';

	let { data } = $props();

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

	// Review Text
	const measurements14days = $derived.by(() => {
		const twoWeeksAgo = new Date();
		twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);
		return weights.filter((weight) => weight[0] >= twoWeeksAgo).length;
	});
	const trend14days = $derived(
		trendWeight[trendWeight.length - 1][1] - trendWeight[trendWeight.length - 15][1]
	);
	const rateOfLoss = $derived(-trend14days / trendWeight[trendWeight.length - 15][1]);
	const category = $derived.by(() => {
		// rateOfLoss is the change in weight as a percentage of the weight 14 days ago
		// Category ranges are as follows:
		//  - gain: rateOfLoss < 0%
		//  - tooSlow: 0 <= rateOfLoss < 0.2%
		//  - slow: 0.2% <= rateOfLoss < 0.5%
		//  - good: < 0.5% <= rateOfLoss < 1%
		//  - fast: 1% <= rateOfLoss < 2%
		//  - tooFast: rateOfLoss > 2%

		return rateOfLoss < 0
			? 'gain'
			: rateOfLoss < 0.2 / 100
				? 'tooSlow'
				: rateOfLoss < 0.5 / 100
					? 'slow'
					: rateOfLoss < 1 / 100
						? 'good'
						: rateOfLoss < 2 / 100
							? 'fast'
							: 'tooFast';
	});
	const reviewText = $derived.by(() => {
		if (measurements14days < 3) {
			return "We don't have enough data to make a recommendation yet. Keep tracking your weight a little bit more often.";
		} else {
			if (category === 'gain') {
				return "If you stuck to your diet, it's time to tinker with your intake.";
			} else if (category === 'tooSlow') {
				return 'Your weightloss has become very slow. Consider lowering your calories.';
			} else if (category === 'slow') {
				return 'Your weightloss is still going (nice!), although it could be faster.';
			} else if (category === 'good') {
				return 'You are losing weight primarily from fat. Keep going like this!';
			} else if (category === 'fast') {
				return 'You are losing weight quite quickly. If there are still big rolls, keep at it. Otherwise consider slowing down a bit.';
			} else if (category === 'tooFast') {
				return 'You are shedding pounds! Only continue at this pace if you are obese. Otherwise: Slow down!';
			}
		}
	});

	const adjustBtnIsPrimary = $derived(
		category === 'gain' || category === 'tooSlow' || category === 'tooFast'
	);

	const keepTarget = async () => {
		try {
			await fetch('?/keepTarget', { method: 'POST', body: new FormData() });

			page.data.dailyProgress.review = true;
			goto('/');
		} catch (error) {
			toastManager.addToast({
				type: 'error',
				message:
					'Something went wrong. Check that you have internet, refresh the page and try adjusting again.',
				timeout: 10000
			});
			return;
		}
	};

	const adjustTarget = async (calories: number | undefined) => {
		if (calories === undefined) {
			return;
		}

		const formData = new FormData();
		formData.append('calories', calories.toString());
		try {
			await fetch('?/adjustTarget', {
				method: 'POST',
				body: formData
			});

			page.data.dailyProgress.review = true;
			page.data.dailyProgress.targetCalories = calories;
			calorieManager.target = calories;
			visibilityManager.toggleCalorieOverlay();
			goto('/');
		} catch (error) {
			visibilityManager.toggleCalorieOverlay();
			toastManager.addToast({
				type: 'error',
				message:
					'Something went wrong. Check that you have internet, refresh the page and try adjusting again.',
				timeout: 10000
			});
		}
	};
</script>

{#snippet buttonPrimary(text: string, onclick: () => void)}
	<button class="h-11 w-32 rounded bg-indigo-600 text-center font-semibold text-stone-200" {onclick}
		>{text}</button
	>
{/snippet}

{#snippet buttonSecondary(text: string, onclick: () => void)}
	<button class="h-11 w-32 rounded border border-stone-700 text-center text-stone-400" {onclick}
		>{text}</button
	>
{/snippet}

<div class="mt-5 flex h-full w-full flex-col items-center space-y-3.5 px-2">
	<WeightChart scaleWeight={weights} {trendWeight} periodInDays={30} />
	<ReviewInfo {trend14days} twoWeekData={data.twoWeekData} />
	<p class="p-10 text-center font-medium text-stone-200">{reviewText}</p>
	<div class="flex w-full justify-center space-x-2">
		{#if adjustBtnIsPrimary}
			{@render buttonSecondary('Keep Target', keepTarget)}
			{@render buttonPrimary('Adjust Target', visibilityManager.toggleCalorieOverlay)}
		{:else}
			{@render buttonSecondary('Adjust Target', visibilityManager.toggleCalorieOverlay)}
			{@render buttonPrimary('Keep Target', keepTarget)}
		{/if}
	</div>
</div>
<div class="mb-1.5 flex w-full justify-center">
	<Minimizer onclick={() => goto('/')} direction="down" />
</div>

{#if visibilityManager.calorieOverlay}
	<CalorieOverlay {adjustTarget} />
{/if}
