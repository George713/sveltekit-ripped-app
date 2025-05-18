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

	import Button from '$atoms/Button.svelte';
	import Minimizer from '$atoms/Minimizer.svelte';
	import NutrientSum from '$atoms/NutrientSum.svelte';
	import PhotoFrame from '$atoms/PhotoFrame.svelte';

	import IngredientInput from '$molecules/IngredientInput.svelte';
	import type { FoodItem } from '$lib/types';

	const origin = page.url.searchParams.get('origin') || '/';
	const foodId = page.url.searchParams.get('foodId')
		? Number(page.url.searchParams.get('foodId'))
		: null;

	let itemName = $state(foodId ? foodItemManager.getById(foodId)?.itemName : '');
	let imageBlob = $state<Blob | null>(null);
	if (foodId) {
		foodItemManager.getById(foodId)?.ingredients.forEach((ingredient) => {
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

	const handleUpsert = async () => {
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

				// If previous image existed, delete cache entry for it
				if (foodId && navigator.serviceWorker && navigator.serviceWorker.controller) {
					const urlToInvalidateInCache = `https://cdswqmabrloxyfswpggl.supabase.co/storage/v1/object/public/foodItems/foodItem_${foodId}`;
					navigator.serviceWorker.controller.postMessage({
						type: 'INVALIDATE_CACHE',
						url: urlToInvalidateInCache
					});
				}
			}
		}

		goto(origin);

		visibilityManager.toggleSpinnerOverlay();
	};

	const handleDelete = async (foodId: number) => {
		visibilityManager.toggleSpinnerOverlay();

		const formData = new FormData();
		formData.append('foodId', foodId.toString());

		const response = await fetch('?/deleteItem', {
			method: 'POST',
			body: formData
		});

		if (response.ok) {
			foodItemManager.items = foodItemManager.items.filter((item) => item.id !== foodId);
			goto(origin);
		}

		visibilityManager.toggleSpinnerOverlay();
	};
</script>

<div class="relative mt-3 flex min-h-6 w-full items-center justify-center">
	<div class="absolute left-2">
		<Minimizer onclick={() => goto(origin)} direction="left" />
	</div>
	{#if foodId}
		<button class="rounded px-3 py-1 text-xs text-stone-600" onclick={() => handleDelete(foodId)}>
			Delete Item
		</button>
	{/if}
</div>
<form class="flex h-screen w-screen flex-col items-center px-6">
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
			onclick={handleUpsert}
			disabled={ingredientManager.items.length === 0}
			classAddons="px-4"
		/>
	</div>
</form>
