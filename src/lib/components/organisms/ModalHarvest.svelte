<script lang="ts">
	import { page } from '$app/stores';
	import { invalidateAll } from '$app/navigation';
	import { eatenKcal, eatenProtein, visibleView } from '$lib/stores';
	import { calculateBasePoints } from '$lib/utils';

	const basePoints = calculateBasePoints($page.data.user.currentStatus);

	$: reachedTargetKcal =
		$page.data.user.currentCalorieTarget - 25 <= $eatenKcal &&
		$eatenKcal <= $page.data.user.currentCalorieTarget + 25;

	$: reachedTargetProtein = $eatenProtein >= $page.data.dailyProgress.targetProtein;

	$: points = {
		calories: reachedTargetKcal ? basePoints : 0,
		protein: reachedTargetProtein ? Math.round(basePoints / 3) : 0,
		weight: $page.data.dailyProgress.weighIn ? Math.round(basePoints / 6) : 0
	};

	let multiplier = $page.data.user.streakMeter * 0.1;

	const calcTotalPoints = (points: object, multiplier: number) => {
		const total = Object.values(points).reduce((sum, value) => sum + value, 0);
		return Math.round((1 + multiplier) * total);
	};

	$: totalPoints = calcTotalPoints(points, multiplier);

	const harvest = async (totalPoints: number) => {
		// - Add points to point balance
		// - Mark the daily activity as done
		// - Reset daily selection of food items
		const formData = new FormData();
		formData.append('points', totalPoints.toString()); // Convert number to string before appending
		const response = await fetch('?/harvestPoints', {
			method: 'POST',
			body: formData
		});

		// Return to main screen
		visibleView.update('none');

		// Reset page data
		invalidateAll();
	};
</script>

<div
	class="absolute left-0 top-0 h-screen w-screen bg-gray-300"
	role="button"
	tabindex={0}
	on:click={() => visibleView.update('none')}
	on:keydown={() => visibleView.update('none')}
>
	<div class="relative m-1 mt-12 flex flex-col bg-slate-100 shadow-xl">
		<!-- Base Points: Heading -->
		<div class="ml-8 mt-8">
			<span class="text-lg font-bold text-slate-400 [text-shadow:_1px_1px_2px_rgb(0_0_0_/_20%)]">
				Base Points
			</span>
		</div>
		<!-- Base Points: List -->
		<div class="ml-14 flex flex-col">
			<div class="relative my-2 flex">
				<span class="w-40">Weight Measured</span>
				<span class="mr-1 w-6 text-right">{points.weight}</span>
				<img src="/gcoins.svg" alt="gcoins" />
				<!-- <img class="ml-10" src="/star.svg" alt="star" /> -->
			</div>
			<div class="relative my-2 flex">
				<span class="w-40">Hit Protein Target</span>
				<span class="mr-1 w-6 text-right">{points.protein}</span>
				<img src="/gcoins.svg" alt="gcoins" />
				<!-- <img class="ml-10" src="/star.svg" alt="star" /> -->
			</div>
			<div class="relative my-2 flex">
				<span class="w-40">Hit Calorie Target</span>
				<span class="mr-1 w-6 text-right">{points.calories}</span>
				<img src="/gcoins.svg" alt="gcoins" />
				<!-- <img class="ml-10" src="/star.svg" alt="star" /> -->
			</div>
		</div>
		<!-- Multipliers: Heading -->
		<div class="ml-8 mt-5">
			<span class="text-lg font-bold text-slate-400 [text-shadow:_1px_1px_2px_rgb(0_0_0_/_20%)]">
				Multipliers
			</span>
		</div>
		<!-- Multipliers: List -->
		<div class="ml-14 flex flex-col">
			<div class="relative my-2 flex">
				<span class="w-36">Measure Streak</span>
				<span class="mr-1 w-10 text-right font-bold text-cyan-500"
					>+{Math.round(100 * multiplier)}%
				</span>
				<img src="/uparrows.svg" alt="gcoins" class="ml-2" />
			</div>
		</div>
		<!-- Summary: Horizontal Bar -->
		<div class="flex-span ml-[calc(45%)] mr-16 mt-8 h-[2px] rounded-lg bg-gray-500" />
		<!-- Summary: Points -->
		<div class="relative my-2 flex">
			<span class="ml-[calc(57%)] mr-1 w-6 text-right text-2xl font-bold text-gray-700"
				>{totalPoints}</span
			>
			<img src="/gcoins.svg" alt="gcoins" />
		</div>
		<button
			class="mx-auto mb-10 mt-20 w-36 rounded-sm bg-green-400 px-6 py-2 text-xl font-bold text-gray-700"
			on:click={() => harvest(totalPoints)}>HARVEST</button
		>
	</div>
</div>
