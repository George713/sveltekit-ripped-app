<!-- NutrientsPer100.svelte -->
<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let defaultPtnSizeInGram: number | string = '';
	export let kcalPer100: number | string = '';
	export let proteinPer100: number | string = '';

	const dispatch = createEventDispatcher();
</script>

<div class="flex text-neutral-200/70 ml-2">
	<!-- Left: Default Portion Size -->
	<div class="flex flex-col justify-end w-1/4 items-center">
		<p class="text-xs text-center mb-1">default portion size (g)</p>
		<input
			class="w-[40px] text-center text-sm focus:outline-none bg-neutral-800/20 rounded py-0.5"
			name="defaultPtnSizeInGram"
			placeholder="..."
			type="number"
			bind:value={defaultPtnSizeInGram}
			on:input={() => dispatch('defaultPtnSizeInGram', defaultPtnSizeInGram)}
		/>
	</div>
	<!-- Right: kcal, protein per 100g -->
	<div class="flex flex-col text-sm items-end justify-end space-y-1 flex-grow pr-2">
		<p class="text-xs text-neutral-200/40">per 100g</p>
		<!-- kcal -->
		<div class="flex items-center">
			<p>kcal:</p>
			<input
				class="ml-2 mr-1 w-[40px] text-center focus:outline-none bg-neutral-800/20 rounded py-0.5"
				name="kcalPer100"
				placeholder="..."
				type="number"
				step="1"
				bind:value={kcalPer100}
				on:input={() => dispatch('kcalPer100', kcalPer100)}
			/>
		</div>
		<!-- protein -->
		<div class="flex items-center">
			<p>protein:</p>
			<input
				class="ml-2 mr-1 w-[40px] text-center focus:outline-none bg-neutral-800/20 rounded py-0.5"
				name="proteinPer100"
				placeholder="... g"
				type="number"
				step="0.1"
				bind:value={proteinPer100}
				on:input={() => dispatch('proteinPer100', proteinPer100)}
			/>
		</div>
	</div>
</div>
