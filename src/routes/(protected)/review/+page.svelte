<script lang="ts">
	import WeightChart from '$lib/components/newDesign/molecules/WeightChart.svelte';
	import ReviewInfo from '$lib/components/newDesign/organisms/ReviewInfo.svelte';

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
	const rateOfLoss = $derived(trend14days / trendWeight[trendWeight.length - 15][1]);
	const reviewText = $derived.by(() => {
		if (measurements14days < 3) {
			return "We don't have enough data to make a recommendation yet. Keep tracking your weight a little bit more often.";
		} else {
			if (rateOfLoss > 0) {
				return "If you stuck to your diet, it's time to tinker with your intake.";
			} else if (rateOfLoss > -0.25 / 100 && rateOfLoss < 0) {
				return 'Your weightloss is still going (nice!), although it could be faster.';
			} else if (rateOfLoss > -0.5 / 100 && rateOfLoss <= -0.25 / 100) {
				return 'You are losing weight primarily from fat. Keep going like this!';
			} else if (rateOfLoss > -1 / 100 && rateOfLoss <= -0.5 / 100) {
				return 'You are losing weight quite quickly. If there are still big rolls, keep at it. Otherwise consider slowing down a bit.';
			} else
				return 'You are shedding pounds! Only continue at this pace if you are obese. Otherwise: Slow down!';
		}
	});
</script>

<div class="mt-5 flex flex-col space-y-3 px-2">
	<WeightChart scaleWeight={weights} {trendWeight} periodInDays={30} />
	<ReviewInfo {trend14days} twoWeekData={data.twoWeekData} />
	<p class="p-7 text-center font-medium text-stone-200">{reviewText}</p>
</div>
