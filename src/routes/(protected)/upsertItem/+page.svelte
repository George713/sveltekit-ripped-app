<script lang="ts">
	import { onDestroy } from 'svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import { deserialize } from '$app/forms';

	import {
		foodItemManager,
		ingredientManager,
		toastManager,
		visibilityManager
	} from '$lib/stateManagers.svelte';

	import Button from '$lib/components/newDesign/atoms/Button.svelte';
	import Minimizer from '$lib/components/newDesign/atoms/Minimizer.svelte';
	import NutrientSum from '$lib/components/newDesign/atoms/NutrientSum.svelte';
	import PhotoFrame from '$lib/components/newDesign/atoms/PhotoFrame.svelte';
	import IngredientInput from '$lib/components/newDesign/molecules/IngredientInput.svelte';
	import type { FoodItem } from '$lib/types';

	const origin = page.url.searchParams.get('origin') || '/';
	const foodId = page.url.searchParams.get('foodId')
		? Number(page.url.searchParams.get('foodId'))
		: null;

	let itemName = $state(foodId ? foodItemManager.getById(foodId)!.itemName : '');
	let imageBlob = $state<Blob | null>(null);
	if (foodId) {
		foodItemManager.getById(foodId)!.ingredients.forEach((ingredient) => {
			ingredientManager.add({
				icon: ingredient.icon,
				name: ingredient.name,
				kcal: ingredient.kcal,
				protein: ingredient.protein
			});
		});
	}

	onDestroy(() => {
		ingredientManager.clear();
	});

	const handleSubmit = async () => {
		if (!itemName) {
			return;
		}
		if (!foodId && !imageBlob) {
			toastManager.addToast({
				type: 'error',
				message: 'An image is required for new items.',
				timeout: 5000
			});
			return;
		}

		visibilityManager.toggleSpinnerOverlay();

		const formData = new FormData();
		formData.append('name', itemName);
		formData.append('kcal', ingredientManager.totalKcal.toFixed(0));
		formData.append('protein', ingredientManager.totalProtein.toFixed(1));
		formData.append('ingredients', JSON.stringify(ingredientManager.toJSON()));
		formData.append('foodId', foodId ? foodId.toString() : '');

		const response = await fetch('?/upsertItem', {
			method: 'POST',
			body: formData
		});

		const result = deserialize(await response.text());

		if (result.type === 'success' && result.data) {
			const foodItem = result.data.foodItem as FoodItem;
			foodItemManager.items = [
				...foodItemManager.items.filter((item) => item.id !== foodId),
				foodItem
			];

			if (imageBlob) {
				// Upload image to s3 using presignURL
				// @ts-ignore
				await fetch(result.data.presignedURL, {
					method: 'PUT',
					body: imageBlob
				});
			}
		}

		goto(origin);

		visibilityManager.toggleSpinnerOverlay();
	};
</script>

<form class="flex h-screen w-screen flex-col items-center px-6">
	<div class="justify-left mt-2 flex w-full translate-x-[-18px]">
		<Minimizer onclick={() => goto(origin)} direction="left" />
	</div>
	<div class="mt-2 mb-1">
		<PhotoFrame bind:imageBlob {foodId} />
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
			text={foodId ? 'Update Item' : 'Create Item'}
			onclick={handleSubmit}
			disabled={ingredientManager.items.length === 0}
			classAddons="px-4"
		/>
	</div>
</form>
