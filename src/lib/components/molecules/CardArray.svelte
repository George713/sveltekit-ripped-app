<script lang="ts">
	import { page } from '$app/stores';
	import { deserialize } from '$app/forms';

	import { plannedItems, showSpinner, visibleView } from '$lib/stores';
	import type { FoodItem, PlannedItem } from '$lib/types';

	import ItemCard from '$atoms/ItemCard.svelte';

	export let items: FoodItem[];

	// Function for adding item to the list of already planned items
	const addToPlannedItems = async (itemId: number) => {
		// Show spinner
		$showSpinner = true;

		const newPlannedItem: PlannedItem = {
			id: plannedItems.maxId + 1,
			eaten: false,
			createdAt: new Date(),
			foodId: itemId
		};

		// Submit planned items to server
		const formData = new FormData();
		formData.append('plannedItems', JSON.stringify([newPlannedItem]));
		formData.append('username', JSON.stringify($page.data.user.name));
		const response = await fetch('?/finishPlanning', {
			method: 'POST',
			body: formData
		});

		const result = deserialize(await response.text());

		if (result.type === 'success' && result.data) {
			plannedItems.set(result.data.createdPlannedItems as PlannedItem[]);
		}

		// Return to eating view
		visibleView.update('eat');

		// Hide spinner
		$showSpinner = false;
	};
</script>

<div class="scrollbar-hide flex h-52 grow flex-col flex-wrap gap-1 overflow-x-auto px-1.5">
	{#each items as { id, itemName, kcal, protein, portionSize }}
		<ItemCard
			type="dark"
			{id}
			foodId={id}
			{itemName}
			{kcal}
			{protein}
			portionUnit="ptn"
			{portionSize}
			plusButton={$page.data.dailyProgress.planned ? () => addToPlannedItems(id) : undefined}
		/>
	{/each}
</div>
