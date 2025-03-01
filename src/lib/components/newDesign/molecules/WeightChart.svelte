<!-- /**
	 * Component to display a line chart of a user's weight over time.
	 *
	 * The chart shows two lines: one for the user's actual weight, and one for
	 * the user's weight trend (calculated using an exponential moving average).
	 *
	 * The chart only shows data for the last 30 days, and linearly interpolates
	 * any missing data points.
	 *
	 * @prop {Array<{ weight: number; createdAt: Date }>} weights - An array of
	 *     objects containing the user's weight and the date at which the weight
	 *     was recorded.
	 */ -->
<script lang="ts">
	import { echarts } from '$lib/echarts';
	import { onMount } from 'svelte';
	import CardArrayBackground from '../atoms/CardArrayBackground.svelte';
	import Graph from '../icons/Graph.svelte';

	interface Props {
		scaleWeight: [Date, number][];
		trendWeight: [Date, number][];
		periodInDays: number;
	}

	let { scaleWeight, trendWeight, periodInDays }: Props = $props();

	const scaleWeightSelected = $derived.by(() => {
		const thirtyDaysAgo = new Date();
		thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - periodInDays);
		return scaleWeight.filter((weight) => weight[0] >= thirtyDaysAgo);
	});

	const trendWeightSelected = $derived.by(() => {
		const thirtyDaysAgo = new Date();
		thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - periodInDays);
		return trendWeight.filter((weight) => weight[0] >= thirtyDaysAgo);
	});

	let chartContainer: HTMLElement;

	onMount(() => {
		const meanWeight =
			scaleWeightSelected.reduce((sum, [_, weight]) => sum + weight, 0) /
			scaleWeightSelected.length;
		const min = Math.round(meanWeight - 2);
		const max = Math.round(meanWeight + 2);

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
				name: 'Weight (kg)',
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
				interval: 0.5,
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

<div class="flex items-center space-x-2 px-3 py-0.5">
	<Graph scale={1.1} />
	<p class="font-medium text-stone-400">Weight Progress</p>
</div>
<CardArrayBackground color="dark" classAddons="w-full">
	<div bind:this={chartContainer} class="" style="width: 100%; height: 250px;"></div>
</CardArrayBackground>
