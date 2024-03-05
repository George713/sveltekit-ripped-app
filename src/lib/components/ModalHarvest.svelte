<script lang="ts">
	import { page } from '$app/stores';
	import { invalidateAll } from '$app/navigation';
	import { eatenKcal, eatenProtein } from '$lib/stores';

	export let toggleModal: (modal: string) => void;

	$: reachedTargetKcal =
		$page.data.user.currentCalorieTarget - 50 <= $eatenKcal &&
		$eatenKcal <= $page.data.user.currentCalorieTarget + 50;

	$: reachedTargetProtein = $eatenProtein >= $page.data.dailyProgress.targetProtein;

	const calculateBasePoints = (currentStatus: string) => {
		if (currentStatus === 'Wood') {
			return 20;
		} else if (currentStatus === 'Bronze') {
			return 35;
		} else if (currentStatus === 'Silver') {
			return 60;
		} else if (currentStatus === 'Gold') {
			return 100;
		} else if (currentStatus === 'Platinum') {
			return 200;
		} else {
			return 0;
		}
	};

	$: basePoints = calculateBasePoints($page.data.user.currentStatus);

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
		// Add points to point balance & mark the daily activity as done
		const formData = new FormData();
		formData.append('username', JSON.stringify($page.data.user.name));
		formData.append('points', totalPoints.toString()); // Convert number to string before appending
		const response = await fetch('?/harvestPoints', {
			method: 'POST',
			body: formData
		});

		// Return to main screen
		toggleModal('none');

		// Reset page data
		invalidateAll();
	};
</script>

<div
	class="absolute top-0 left-0 w-screen h-screen bg-gray-300"
	role="button"
	tabindex={0}
	on:click={() => toggleModal('none')}
	on:keydown={() => toggleModal('none')}
>
	<div class="relative m-1 mt-12 bg-slate-100 shadow-xl flex flex-col">
		<!-- Base Points: Heading -->
		<div class="mt-8 ml-8">
			<span class="text-lg font-bold text-slate-400 [text-shadow:_1px_1px_2px_rgb(0_0_0_/_20%)]">
				Base Points
			</span>
		</div>
		<!-- Base Points: List -->
		<div class="ml-14 flex flex-col">
			<div class="relative my-2 flex">
				<span class="w-40">Weight Measured</span>
				<span class="text-right w-6 mr-1">{points.weight}</span>
				<img src="/gcoins.svg" alt="gcoins" />
				<!-- <img class="ml-10" src="/star.svg" alt="star" /> -->
			</div>
			<div class="relative my-2 flex">
				<span class="w-40">Hit Protein Target</span>
				<span class="text-right w-6 mr-1">{points.protein}</span>
				<img src="/gcoins.svg" alt="gcoins" />
				<!-- <img class="ml-10" src="/star.svg" alt="star" /> -->
			</div>
			<div class="relative my-2 flex">
				<span class="w-40">Hit Calorie Target</span>
				<span class="text-right w-6 mr-1">{points.calories}</span>
				<img src="/gcoins.svg" alt="gcoins" />
				<!-- <img class="ml-10" src="/star.svg" alt="star" /> -->
			</div>
		</div>
		<!-- Multipliers: Heading -->
		<div class="mt-5 ml-8">
			<span class="text-lg font-bold text-slate-400 [text-shadow:_1px_1px_2px_rgb(0_0_0_/_20%)]">
				Multipliers
			</span>
		</div>
		<!-- Multipliers: List -->
		<div class="ml-14 flex flex-col">
			<div class="relative my-2 flex">
				<span class="w-36">Measure Streak</span>
				<span class="text-right w-10 mr-1 font-bold text-cyan-500">+{100 * multiplier}% </span>
				<img src="/uparrows.svg" alt="gcoins" class="ml-2" />
			</div>
		</div>
		<!-- Summary: Horizontal Bar -->
		<div class="bg-gray-500 flex-span h-[2px] rounded-lg mt-8 ml-[calc(45%)] mr-16" />
		<!-- Summary: Points -->
		<div class="relative my-2 flex">
			<span class="text-right font-bold text-2xl text-gray-700 w-6 ml-[calc(57%)] mr-1"
				>{totalPoints}</span
			>
			<img src="/gcoins.svg" alt="gcoins" />
		</div>
		<button
			class="mx-auto mt-20 mb-10 w-36 px-6 py-2 bg-green-400 rounded text-gray-700 font-bold text-xl"
			on:click={() => harvest(totalPoints)}>HARVEST</button
		>
	</div>
</div>
