<script lang="ts">
	import { page } from '$app/stores';
	import {
		eatenKcal,
		eatenProtein,
		plannedKcal,
		plannedProtein,
		setKcal,
		setProtein
	} from '$lib/stores';

	export let large: boolean = false;
	export let mode: string;

	$: targetKcal = $page.data.user.currentCalorieTarget;
	$: targetProtein = $page.data.dailyProgress.targetProtein;

	$: currentKcal = (() => {
		switch (mode) {
			case 'planning':
				return $plannedKcal;
			case 'eating':
				return $eatenKcal;
			case 'set':
				return $setKcal;
			default:
				return -1; // Default value if mode is not recognized
		}
	})();

	$: currentProtein = (() => {
		switch (mode) {
			case 'planning':
				return $plannedProtein;
			case 'eating':
				return $eatenProtein;
			case 'set':
				return $setProtein;
			default:
				return -1; // Default value if mode is not recognized
		}
	})();

	// $: currentKcal = planningMode ? $plannedKcal : $eatenKcal;
	// $: currentProtein = planningMode ? $plannedProtein : $eatenProtein;
</script>

{#if large}
	<div class="ml-2 mt-1 flex h-8 grow items-center justify-center">
		<!-- Calories -->
		<div class="flex flex-col items-center">
			<div class="flex">
				<svg class="mr-0.5 mt-[5px] h-[10px] w-[10px] stroke-yellow-200">
					<circle cx="5" cy="5" r="3" stroke-width="2.5" fill="none" />
				</svg>
				<p class="text-[12px] font-light text-neutral-500">Calories</p>
			</div>
			<p class="text-[10px] font-light text-neutral-500">
				{currentKcal.toLocaleString('en')} | {targetKcal.toLocaleString('en')} kcal
			</p>
		</div>
		<!-- Border -->
		<span class="mx-2 mt-0.5 h-6 w-0.5 rounded-full bg-neutral-500" />
		<!-- Protein -->
		<div class="flex flex-col items-center">
			<div class="flex">
				<svg class="mr-0.5 mt-[5px] h-[10px] w-[10px] stroke-cyan-400">
					<circle cx="5" cy="5" r="3" stroke-width="2.5" fill="none" />
				</svg>
				<p class="text-[12px] font-light text-neutral-500">Protein</p>
			</div>
			<p class="text-[10px] font-light text-neutral-500">
				{currentProtein.toFixed(0)} | {targetProtein} g
			</p>
		</div>
	</div>
{:else}
	<div class="flex h-8 items-center justify-center px-5">
		<!-- Calories -->
		<div class="flex flex-col items-center">
			<div class="flex">
				<svg class="mr-0.5 mt-[3px] h-[10px] w-[10px] stroke-yellow-200">
					<circle cx="5" cy="5" r="2.5" stroke-width="2.5" fill="none" />
				</svg>
				<p class="text-[10px] font-light text-neutral-500">Calories</p>
			</div>
			<p class="text-[8px] font-light text-neutral-500">
				{currentKcal.toLocaleString('en')} | {targetKcal.toLocaleString('en')} kcal
			</p>
		</div>
		<!-- Border -->
		<span class="mx-2 mt-0.5 h-5 w-0.5 rounded-full bg-neutral-400" />
		<!-- Protein -->
		<div class="flex flex-col items-center">
			<div class="flex">
				<svg class="mr-0.5 mt-[3px] h-[10px] w-[10px] stroke-cyan-400">
					<circle cx="5" cy="5" r="2.5" stroke-width="2.5" fill="none" />
				</svg>
				<p class="text-[10px] font-light text-neutral-500">Protein</p>
			</div>
			<p class="text-[8px] font-light text-neutral-500">
				{currentProtein.toFixed(0)} | {targetProtein} g
			</p>
		</div>
	</div>
{/if}
