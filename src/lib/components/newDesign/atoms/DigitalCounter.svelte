<script lang="ts">
	import { calorieManager, proteinManager } from '$lib/stateManagers.svelte';
</script>

<div class="ml-5 flex items-center">
	<!-- Calories -->
	<div class="flex flex-col items-center">
		<!-- Icon with Label -->
		<div class="flex items-center space-x-1.5">
			<!-- Yellow Ring -->
			<div class="mb-0.5 size-0.5 rounded-full ring-2 ring-amber-300"></div>
			<!-- Label -->
			<p class="text-xs text-stone-500">Calories</p>
		</div>
		<!-- Digital Counter -->
		<p class="text-[10px] text-stone-200">
			{Math.floor(calorieManager.eaten).toLocaleString('en-US')} | {Math.floor(
				calorieManager.target
			).toLocaleString('en-US')} kcal
		</p>
	</div>
	<!-- Separator -->
	<div class="mx-2 h-6 w-0.5 rounded-full bg-stone-700"></div>
	<!-- Protein -->
	<div class="flex flex-col items-center">
		<!-- Icon with Label -->
		<div class="flex items-center space-x-1.5">
			<!-- Yellow Ring -->
			<div class="mb-0.5 size-0.5 rounded-full ring-2 ring-cyan-300"></div>
			<!-- Label -->
			<p class="text-xs text-stone-500">Protein</p>
		</div>
		<!-- Digital Counter -->
		<p class="text-[10px] text-stone-200">
			{proteinManager.eaten.toFixed(0)} | {proteinManager.target.toFixed(0)} g
		</p>
	</div>
</div>
