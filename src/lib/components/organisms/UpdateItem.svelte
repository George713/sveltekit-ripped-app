<!-- UpdateItem.svelte -->
<script lang="ts">
	import { onMount } from 'svelte';
	import { deserialize } from '$app/forms';
	import { foodLibrary, originItem, showSpinner, visibleView } from '$lib/stores';
	import type { FoodItem } from '$lib/types';

	import ItemDetails from '$molecules/ItemDetails.svelte';

	let item: FoodItem | undefined;
	let imageBlob: Blob;

	onMount(() => {
		item = foodLibrary.findItemById($originItem);
	});

	const handleSubmit = async (event: Event) => {
		// Show spinner
		$showSpinner = true;

		// Prepare request
		const formData = new FormData(event.target as HTMLFormElement);
		formData.append('id', JSON.stringify(item?.id));
		const response = await fetch('?/updateItem', {
			method: 'POST',
			body: formData
		});

		const result = deserialize(await response.text());

		if (result.type === 'success' && result.data) {
			// Upload image to s3 using presignURL
			if (imageBlob) {
				// @ts-ignore
				await fetch(result.data.presignedURL, {
					method: 'PUT',
					body: imageBlob
				});
			}
			const updatedItem = result.data.updatedItem as FoodItem;

			// Update foodLibrary
			foodLibrary.update((items) => {
				const index = items.findIndex((i) => i.id === updatedItem.id);
				items[index] = updatedItem;
				return items;
			});
		}

		// Return to previous modal
		visibleView.update($visibleView.previous);

		// Hide spinner
		$showSpinner = false;
	};
</script>

{#if item}
	<ItemDetails
		title="Update Item"
		submitBtnText="Update"
		submitBtnSymbol="plus"
		bind:imageBlob
		itemName={item.itemName}
		foodId={item.id}
		activeUnitIsPtn={item.unitIsPtn}
		unitAmount={item.unitAmount}
		ptnAmount={item.unitIsPtn ? item.unitAmount : 1}
		gramAmount={!item.unitIsPtn ? item.unitAmount : 100}
		kcal={item.kcal}
		protein={item.protein}
		defaultPtnSizeInGram={item.defaultPtnSizeInGram}
		kcalPer100={item.kcalPer100}
		proteinPer100={item.proteinPer100}
		{handleSubmit}
	/>
{/if}
