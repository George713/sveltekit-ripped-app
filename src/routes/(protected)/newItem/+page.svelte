<script lang="ts">
	import { goto } from '$app/navigation';
	import { onDestroy } from 'svelte';

	import { ingredientManager } from '$lib/stateManagers.svelte';

	import Button from '$lib/components/newDesign/atoms/Button.svelte';
	import ItemName from '$lib/components/newDesign/atoms/inputs/ItemName.svelte';
	import Minimizer from '$lib/components/newDesign/atoms/Minimizer.svelte';
	import NutrientSum from '$lib/components/newDesign/atoms/NutrientSum.svelte';
	import PhotoFrame from '$lib/components/newDesign/atoms/PhotoFrame.svelte';
	import IngredientInput from '$lib/components/newDesign/molecules/IngredientInput.svelte';

	onDestroy(() => {
		ingredientManager.clear();
	});
</script>

<div class="flex h-screen w-screen flex-col items-center px-6">
	<div class="justify-left mt-2 flex w-full translate-x-[-18px]">
		<Minimizer onclick={() => goto('/planner')} direction="left" />
	</div>
	<div class="mt-2 mb-1">
		<PhotoFrame />
	</div>
	<ItemName />
	<IngredientInput />
	<div class="mt-3 w-full">
		<NutrientSum kcal={ingredientManager.totalKcal} protein={ingredientManager.totalProtein} />
	</div>
	<div class="my-6">
		<Button text="Create Item" onclick={() => {}} disabled={ingredientManager.items.length === 0} />
	</div>
</div>
