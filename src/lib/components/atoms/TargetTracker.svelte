<script lang="ts">
	import { page } from '$app/stores';
	import { eatenKcal, eatenProtein } from '$lib/stores';

	export let large: boolean = false;

	$: targetKcal = $page.data.user.currentCalorieTarget;
	$: targetProtein = $page.data.dailyProgress.targetProtein;
</script>

{#if large}
	<div class="flex mt-1 ml-2 h-8 grow justify-center items-center">
		<!-- Calories -->
		<div class="flex flex-col items-center">
			<div class="flex">
				<svg class="h-[10px] w-[10px] mt-[5px] mr-0.5 stroke-yellow-200">
					<circle cx="5" cy="5" r="3" stroke-width="2.5" fill="none" />
				</svg>
				<p class="text-[12px] font-light text-neutral-500">Calories</p>
			</div>
			<p class="text-[10px] font-light text-neutral-500">
				{$eatenKcal.toLocaleString('en')} | {targetKcal.toLocaleString('en')} kcal
			</p>
		</div>
		<!-- Border -->
		<span class="mx-2 mt-0.5 h-6 w-0.5 bg-neutral-500 rounded-full" />
		<!-- Protein -->
		<div class="flex flex-col items-center">
			<div class="flex">
				<svg class="h-[10px] w-[10px] mt-[5px] mr-0.5 stroke-cyan-400">
					<circle cx="5" cy="5" r="3" stroke-width="2.5" fill="none" />
				</svg>
				<p class="text-[12px] font-light text-neutral-500">Protein</p>
			</div>
			<p class="text-[10px] font-light text-neutral-500">
				{$eatenProtein} | {targetProtein} g
			</p>
		</div>
	</div>
{:else}
	<div class="flex mt-1 ml-2 h-8 grow justify-center items-center">
		<!-- Calories -->
		<div class="flex flex-col items-center">
			<div class="flex">
				<svg class="h-[10px] w-[10px] mt-[3px] mr-0.5 stroke-yellow-200">
					<circle cx="5" cy="5" r="2.5" stroke-width="2.5" fill="none" />
				</svg>
				<p class="text-[10px] font-light text-neutral-500">Calories</p>
			</div>
			<p class="text-[8px] font-light text-neutral-500">
				{$eatenKcal.toLocaleString('en')} | {targetKcal.toLocaleString('en')} kcal
			</p>
		</div>
		<!-- Border -->
		<span class="mx-2 mt-0.5 h-5 w-0.5 bg-neutral-400 rounded-full" />
		<!-- Protein -->
		<div class="flex flex-col items-center">
			<div class="flex">
				<svg class="h-[10px] w-[10px] mt-[3px] mr-0.5 stroke-cyan-400">
					<circle cx="5" cy="5" r="2.5" stroke-width="2.5" fill="none" />
				</svg>
				<p class="text-[10px] font-light text-neutral-500">Protein</p>
			</div>
			<p class="text-[8px] font-light text-neutral-500">
				{$eatenProtein} | {targetProtein} g
			</p>
		</div>
	</div>
{/if}
