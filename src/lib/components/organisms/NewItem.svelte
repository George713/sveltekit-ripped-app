<!-- NewItem.svelte -->
<script lang="ts">
	import { deserialize } from '$app/forms';
	import { foodLibrary, showSpinner, visibleView } from '$lib/stores';
	import type { FoodItem } from '$lib/types';

	import ItemDetails from '$molecules/ItemDetails.svelte';

	let imageString = '';

	let activeUnitIsPtn = true;
	let unitAmount = 1; // serves as umbrella for ptnAmount & gramAmount
	let ptnAmount = 1;
	let gramAmount = 100;
	let kcal: number | string = '';
	let protein: number | string = '';
	let defaultPtnSizeInGram: number | string = '';
	let kcalPer100: number | string = '';
	let proteinPer100: number | string = '';

	const handleSubmit = async (event: Event) => {
		// Show spinner
		$showSpinner = true;

		const response = await fetch('?/newItem', {
			method: 'POST',
			body: new FormData(event.target as HTMLFormElement)
		});

		const result = deserialize(await response.text());

		if (result.type === 'success' && result.data) {
			// Upload image to s3 using presignURL
			// @ts-ignore
			await fetch(result.data.presignedURL, {
				method: 'PUT',
				body: imageString
			});
			const newItem = result.data.newItem as FoodItem;

			// Update foodLibrary
			foodLibrary.update((items) => {
				// @ts-ignore
				return [...items, newItem];
			});
		}

		// Return to previous modal
		visibleView.update($visibleView.previous);

		// Hide spinner
		$showSpinner = false;
	};
</script>

<ItemDetails
	submitBtnText="Add Item"
	submitBtnSymbol="plus"
	{imageString}
	{activeUnitIsPtn}
	{unitAmount}
	{ptnAmount}
	{gramAmount}
	{kcal}
	{protein}
	{defaultPtnSizeInGram}
	{kcalPer100}
	{proteinPer100}
	{handleSubmit}
/>
