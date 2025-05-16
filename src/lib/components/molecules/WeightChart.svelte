<!-- /**
	 * Component to display a line chart of a user's weight over time.
	 *
	 * The chart shows two lines: one for the user's actual weight, and one for
	 * the user's weight trend (calculated using an exponential moving average).
	 *
	 * The chart only shows data for the last 30 days, and linearly interpolates
	 * any missing data points.

	 * Note: When refreshing the page, the chart causes an error. To fix this,
	 * clear the cache.
	 *
	 * @prop {Array<{ weight: number; createdAt: Date }>} weights - An array of
	 *     objects containing the user's weight and the date at which the weight
	 *     was recorded.
	 */ -->
<script lang="ts">
	// Svelte & Sveltekit
	import { page } from '$app/state';
	import { onMount } from 'svelte';
	// Logic
	import { echarts } from '$lib/echarts';
	import { getWeightUnit, getDisplayWeight } from '$lib/utils/units';
	// Atoms
	import CardArrayBackground from '$atoms/CardArrayBackground.svelte';
	// Icons
	import Graph from '$icons/Graph.svelte';

	interface Props {
		scaleWeight: [Date, number][];
		trendWeight: [Date, number][];
		periodInDays: number;
	}

	let { scaleWeight, trendWeight, periodInDays }: Props = $props();

	const scaleWeightSelected = $derived.by(() => {
		const thirtyDaysAgo = new Date();
		thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - periodInDays);
		return scaleWeight
			.filter(([date, _]) => date >= thirtyDaysAgo)
			.map(
				([date, weightKg]) =>
					[date, getDisplayWeight(weightKg, page.data.user.useMetricSystem)!] as [Date, number]
			);
	});

	const trendWeightSelected = $derived.by(() => {
		const thirtyDaysAgo = new Date();
		thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - periodInDays);
		return trendWeight
			.filter(([date, _]) => date >= thirtyDaysAgo)
			.map(
				([date, weightKg]) =>
					[date, getDisplayWeight(weightKg, page.data.user.useMetricSystem)!] as [Date, number]
			);
	});

	let chartContainer: HTMLElement;

	onMount(() => {
		const meanWeight =
			scaleWeightSelected.reduce((sum, [_, weight]) => sum + weight, 0) /
			scaleWeightSelected.length;

		const extremaAdjustment = getDisplayWeight(0.2, page.data.user.useMetricSystem);
		const meanAdjustment = getDisplayWeight(2, page.data.user.useMetricSystem);

		// Calculate the minimum value from each data set
		const minScaleWeight =
			Math.min(...scaleWeightSelected.map(([_, weight]) => weight)) - extremaAdjustment;
		const minTrendWeight =
			Math.min(...trendWeightSelected.map(([_, weight]) => weight)) - extremaAdjustment;

		// Calculate the maximum value from each data set
		const maxScaleWeight =
			Math.max(...scaleWeightSelected.map(([_, weight]) => weight)) + extremaAdjustment;
		const maxTrendWeight =
			Math.max(...trendWeightSelected.map(([_, weight]) => weight)) + extremaAdjustment;

		// Use the minimum of the three values
		const min = Math.floor(Math.min(meanWeight - meanAdjustment, minScaleWeight, minTrendWeight));
		const max = Math.ceil(Math.max(meanWeight + meanAdjustment, maxScaleWeight, maxTrendWeight));

		const option = {
			grid: {
				left: 45,
				right: 20,
				top: 45,
				bottom: 55
			},
			xAxis: {
				type: 'time',
				axisLine: {
					show: false
				},
				axisTick: {
					show: false
				},
				axisLabel: {
					color: 'rgba(168, 162, 158, .5)'
				}
			},
			yAxis: {
				type: 'value',
				name: `Weight (${getWeightUnit(page.data.user.useMetricSystem)})`,
				nameGap: 18,
				nameTextStyle: {
					fontWeight: 600,
					fontSize: 12,
					padding: [0, 0, 0, 15],
					align: 'center',
					color: 'rgba(168, 162, 158, 1)'
				},
				min,
				max,
				interval: page.data.user.useMetricSystem ? 0.5 : 1,
				axisLabel: {
					formatter: (value: number, index: number) => (index % 2 === 0 ? value : ''),
					color: 'rgba(168, 162, 158, .5)'
				},
				splitLine: {
					lineStyle: {
						color: '#353535'
					}
				}
			},
			legend: {
				// show: true,
				data: ['Scale Weight', 'Trend Weight'],
				bottom: 7,
				textStyle: {
					color: 'rgba(168, 162, 158, 1)'
				}
			},
			series: [
				// Trend Weight
				{
					name: 'Trend Weight',
					data: trendWeightSelected,
					type: 'line',
					lineStyle: {
						width: 6,
						color: 'rgba(99, 102, 241, 1)'
					},
					symbol: 'none', // 'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow', 'none'
					smooth: true
				},
				// Scale Weight
				{
					name: 'Scale Weight',
					data: scaleWeightSelected,
					type: 'line',
					lineStyle: {
						width: 2,
						color: 'rgba(255, 191, 0, 1)'
					},
					symbol: 'circle', // 'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow', 'none'
					symbolSize: 5,
					itemStyle: {
						color: 'rgba(255, 191, 0, 1)' // Set the symbol color
					},
					smooth: true
				}
			]
		};

		echarts(chartContainer, option);
	});
</script>

<div class="flex w-full flex-col">
	<div class="flex items-center space-x-2 px-3 py-0.5">
		<Graph scale={1.1} />
		<p class="font-medium text-stone-400">Weight Progress</p>
	</div>
	<CardArrayBackground color="dark" classAddons="w-full">
		<div bind:this={chartContainer} class="" style="width: 100%; height: 250px;"></div>
	</CardArrayBackground>
</div>
