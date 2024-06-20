<!-- UpdateItem.svelte -->
<script lang="ts">
	import { onMount } from 'svelte';
	import { deserialize } from '$app/forms';
	import { foodLibrary, originItem, showSpinner, visibleView } from '$lib/stores';
	import type { FoodItem } from '$lib/types';

	import ItemDetails from '$molecules/ItemDetails.svelte';

	let item: FoodItem | undefined;

	onMount(() => {
		item = foodLibrary.findItemById($originItem);
	});

	const handleSubmit = async (event: Event) => {
		// Show spinner
		$showSpinner = true;

		// const response = await fetch('?/newItem', {
		// 	method: 'POST',
		// 	body: new FormData(event.target as HTMLFormElement)
		// });

		// const result = deserialize(await response.text());

		// if (result.type === 'success' && result.data) {
		// 	// Upload image to s3 using presignURL
		// 	// @ts-ignore
		// 	await fetch(result.data.presignedURL, {
		// 		method: 'PUT',
		// 		body: imageString
		// 	});
		// 	const newItem = result.data.newItem as FoodItem;

		// 	// Update foodLibrary
		// 	foodLibrary.update((items) => {
		// 		// @ts-ignore
		// 		return [...items, newItem];
		// 	});
		// }

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
