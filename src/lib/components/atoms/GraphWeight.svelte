<script lang="ts">
	import { onMount } from 'svelte';
	import { echarts } from '$lib/echarts.ts';

	import { weightTrend } from '$lib/stores';
	import type { WeightData } from '$lib/types';

	let weights: WeightData[] = [];
	let error: string | null = null;
	let scale: { weights?: number[]; measure_dates?: Date[] } = {};
	let imputedScale: {
		weights: number[];
		measure_dates: Date[];
		interpolatedWeights: number[];
		weightTrend: number[];
	};
	let letterArray: string[] = [];
	let option: any = null;

	const convertToDateWithoutTime = (dateString: string) => {
		const date = new Date(dateString);
		date.setHours(0, 0, 0, 0);
		return date;
	};

	const getNextDay = (input_date: Date) => {
		// Create a new Date object from input_date
		const date = new Date(input_date);

		// Add one day to the date
		date.setDate(date.getDate() + 1);

		// Return the new date
		return date;
	};

	const datesAreEqual = (date1: Date, date2: Date) => {
		return (
			date1.getFullYear() === date2.getFullYear() &&
			date1.getMonth() === date2.getMonth() &&
			date1.getDate() === date2.getDate()
		);
	};

	const datesAreUnequal = (date1: Date, date2: Date) => {
		return !datesAreEqual(date1, date2);
	};

	const getDayDiff = (date1: Date, date2: Date) => {
		const diffTime = Math.abs(date2.getTime() - date1.getTime());
		return Math.ceil(diffTime / (1000 * 3600 * 24));
	};

	const imputeScale = (scale: any) => {
		let dates = [...scale.measure_dates];
		let weights = [...scale.weights];
		let interpolatedWeights = [...scale.weights];
		const endDay = scale.measure_dates.slice(-1)[0];

		let i = 0;
		while (datesAreUnequal(dates[i], endDay)) {
			let currentDay = dates[i];
			let nextDay = getNextDay(currentDay);

			if (datesAreUnequal(dates[i + 1], nextDay)) {
				const dayDiff = getDayDiff(currentDay, dates[i + 1]);
				// Impute missing date
				dates.splice(i + 1, 0, nextDay);
				// Impute NaN into weights
				weights.splice(i + 1, 0, NaN);
				// Impute weight interpolation
				const currentWeight = interpolatedWeights[i];
				const nextWeight = interpolatedWeights[i + 1];
				const weightDiff = nextWeight - currentWeight;
				const interpolatedWeightNextDay = currentWeight + weightDiff * (1 / dayDiff);
				interpolatedWeights.splice(i + 1, 0, interpolatedWeightNextDay);
			}

			i++;
		}
		// Calculate weight trend by applying a moving average with decreasing weights to the interpolatedWeights array.
		// For each index in the array, take the last 7 values and calculate a weighted average using a decay factor of 0.1.
		weightTrend.set(
			interpolatedWeights.map((value: number, index: number) => {
				let total = 0;
				let factorSum = 0;
				if (index < 6) {
					return value; // return the original value if there are not enough previous values to calculate a weighted average
				}
				for (let i = 0; i <= 6; i++) {
					const factor = 1.0 - i * 0.1; // apply decay factor
					factorSum += factor;
					total += interpolatedWeights[index - i] * factor; // calculate weighted sum
				}
				return total / factorSum; // return weighted average
			})
		);

		return { measure_dates: dates, weights, interpolatedWeights, weightTrend: $weightTrend };
	};

	const getWeekdayLetters = (dates: Date[]) => {
		const result: string[] = [];
		dates.forEach((date) => {
			const day = date.getDay();
			switch (day) {
				case 0: // Sunday
					result.push('S');
					break;
				case 1: // Monday
					result.push('M');
					break;
				case 2: // Tuesday
					result.push('T');
					break;
				case 3: // Wednesday
					result.push('W');
					break;
				case 4: // Thursday
					result.push('T');
					break;
				case 5: // Friday
					result.push('F');
					break;
				case 6: // Saturday
					result.push('S');
					break;
			}
		});
		return result;
	};

	onMount(async () => {
		try {
			const response = await fetch('/api/getWeightData');
			if (!response.ok) {
				throw new Error('Failed to fetch weights');
			}
			const data = await response.json();
			weights = data.weights;
			scale.weights = weights.map((weight) => weight.weight);
			scale.measure_dates = weights.map((weight) => convertToDateWithoutTime(weight.createdAt));

			imputedScale = imputeScale(scale);
			letterArray = getWeekdayLetters(imputedScale.measure_dates);

			option = {
				title: {
					text: 'Scale Weight',
					textStyle: {
						fontSize: 12,
						fontWeight: 'bolder'
					},
					show: false
					// padding: 0,
					// itemGap: 0
				},
				grid: {
					left: 40,
					top: 40,
					right: 20,
					bottom: 60
				},
				xAxis: {
					type: 'category',
					data: letterArray.splice(-14),
					axisLine: {
						show: false
					},
					axisTick: {
						show: false
					},
					axisLabel: {
						color: 'rgba(0,0,0,.3)'
					}
				},
				yAxis: {
					type: 'value',
					name: 'Weight / kg',
					// @ts-ignore
					min: (val: Array<number>) => Math.floor(val.min - 0.5) + 0.5,
					// @ts-ignore
					max: (val: Array<number>) => Math.ceil(val.max * 2) / 2,
					offset: -5,
					nameLocation: 'end',
					nameGap: 18,
					nameTextStyle: {
						fontWeight: 600,
						fontSize: 12,
						align: 'center'
					},
					axisLabel: {
						color: 'rgba(0,0,0,.5)'
					}
				},
				legend: {
					// show: true,
					data: ['Scale', 'Trend'],
					bottom: 7,
					textStyle: {
						color: 'rgba(0,0,0,.5)'
					}
				},
				series: [
					{
						name: 'Scale',
						data: imputedScale.weights.slice(-14),
						type: 'line',
						connectNulls: true,
						lineStyle: {
							width: 4
							// type: 'dashed'
						},
						symbolSize: 8
						// smooth: true
					},
					{
						name: 'Trend',
						data: imputedScale.weightTrend.slice(-14),
						type: 'line',
						connectNulls: true,
						lineStyle: {
							width: 4
							// type: 'dashed'
						},
						color: 'rgba(245, 40, 145, 0.8)',
						symbol: 'none',
						smooth: true
					}
				]
			};
		} catch (err) {
			error = (err as Error).message;
		}
	});
</script>

{#if option}
	<div
		class="w-full h-64 bg-gray-50 rounded-md shadow-[0px_0px_2px_0px_rgba(0,0,0,0.25)]"
		use:echarts={option}
	/>
{:else}
	<div class="w-full h-64 bg-gray-50 rounded-md shadow-[0px_0px_2px_0px_rgba(0,0,0,0.25)]" />
{/if}
