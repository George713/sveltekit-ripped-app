<script lang="ts">
	import { goto } from '$app/navigation';
	import { onDestroy } from 'svelte';

	import { foodItemManager, ingredientManager, visibilityManager } from '$lib/stateManagers.svelte';

	import Button from '$lib/components/newDesign/atoms/Button.svelte';
	import Minimizer from '$lib/components/newDesign/atoms/Minimizer.svelte';
	import NutrientSum from '$lib/components/newDesign/atoms/NutrientSum.svelte';
	import PhotoFrame from '$lib/components/newDesign/atoms/PhotoFrame.svelte';
	import IngredientInput from '$lib/components/newDesign/molecules/IngredientInput.svelte';
	import { deserialize } from '$app/forms';

	let itemName = $state('');

	onDestroy(() => {
		ingredientManager.clear();
	});

	const handleSubmit = async () => {
		visibilityManager.toggleSpinnerOverlay();

		const formData = new FormData();
		formData.append('name', itemName);
		formData.append('kcal', ingredientManager.totalKcal.toFixed(0));
		formData.append('protein', ingredientManager.totalProtein.toFixed(1));

		const response = await fetch('?/newItem', {
			method: 'POST',
			body: formData
		});

		const result = deserialize(await response.text());

		if (result.type === 'success' && result.data) {
			// Upload image to s3 using presignURL
			// @ts-ignore
			// await fetch(result.data.presignedURL, {
			// 	method: 'PUT',
			// 	body: imageBlob
			// });

			const newItem = result.data.newItem as FoodItem;
			foodItemManager.items = [...foodItemManager.items, newItem];
		}

		goto('/planner');

		visibilityManager.toggleSpinnerOverlay();
	};
</script>

<form class="flex h-screen w-screen flex-col items-center px-6">
	<div class="justify-left mt-2 flex w-full translate-x-[-18px]">
		<Minimizer onclick={() => goto('/planner')} direction="left" />
	</div>
	<div class="mt-2 mb-1">
		<PhotoFrame />
	</div>
	<input
		placeholder="Item Name..."
		name="itemName"
		type="text"
		spellcheck="false"
		autoComplete="off"
		autoCorrect="off"
		bind:value={itemName}
		required
		class="text-center text-xl text-stone-200 placeholder:text-stone-600"
	/>
	<IngredientInput />
	<div class="mt-3 w-full">
		<NutrientSum kcal={ingredientManager.totalKcal} protein={ingredientManager.totalProtein} />
	</div>
	<div class="my-6">
		<Button
			text="Create Item"
			onclick={handleSubmit}
			disabled={ingredientManager.items.length === 0}
		/>
	</div>
</form>
