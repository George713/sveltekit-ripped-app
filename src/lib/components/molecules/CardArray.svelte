<script lang="ts">
	import { page } from '$app/stores';
	import { deserialize } from '$app/forms';

	import { plannedItems, foodLibrary, estimatesLog, showSpinner, visibleView } from '$lib/stores';
	import type { PlannedItem } from '$lib/types';

	import ItemCard from '$atoms/ItemCard.svelte';

	export let items: String[];

	// Function for adding item to the list of already planned items
	const addToPlannedItems = async (itemId: number, unitIsPtn: boolean, unitAmount: number) => {
		// Show spinner
		$showSpinner = true;

		const newPlannedItem: PlannedItem = {
			id: plannedItems.maxId + 1,
			eaten: false,
			createdAt: new Date(),
			foodId: itemId,
			unitIsPtn: unitIsPtn,
			unitAmount: unitAmount
		};

		// Submit planned items to server
		const formData = new FormData();
		formData.append('plannedItems', JSON.stringify([newPlannedItem]));
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

	const eatItem = async (id: number, type: string) => {
		if (type === 'planned') {
			plannedItems.update((items) => {
				const index = items.findIndex((item) => item.id === id);
				if (index !== -1) {
					items[index].eaten = true;
				}
				return items;
			});
		} else if (type === 'estimate') {
			estimatesLog.update((items) => {
				const index = items.findIndex((item) => item.id === id);
				if (index !== -1) {
					items[index].eaten = true;
				}
				return items;
			});
		}

		// Updaten eaten flag in db
		const formData = new FormData();
		formData.append('id', id.toString());
		formData.append('type', type);
		const response = await fetch('?/eatItem', {
			method: 'POST',
			body: formData
		});
	};
</script>

<!-- h-1 prevents the container from overflowing -->
<div
	class="scrollbar-hide m-1 flex h-1 grow flex-wrap content-start justify-center gap-1 overflow-y-auto"
>
	{#if items.includes('food')}
		{#each $foodLibrary as { id, itemName, kcal, protein, unitIsPtn, unitAmount }}
			<ItemCard
				type="dark"
				{id}
				foodId={id}
				{itemName}
				{kcal}
				{protein}
				{unitIsPtn}
				{unitAmount}
				plusButton={$page.data.dailyProgress.planned
					? () => addToPlannedItems(id, unitIsPtn, unitAmount)
					: undefined}
			/>
		{/each}
	{/if}
	{#if items.includes('planned')}
		<!-- 
		[...$plannedItems].reverse()
		============================
		This first creates a shallow copy of $plannedItems,
		then reverses the order of the items in it.
		
		This is required as toggling the `eaten` status would
		have modified $plannedItems in place again.
		-->
		{#each [...$plannedItems].reverse() as { id, foodId, eaten, unitIsPtn, unitAmount }}
			<ItemCard
				type="bright"
				{id}
				{foodId}
				itemName={foodLibrary.getItemNameByIndex(foodId)}
				kcal={foodLibrary.getKcalByIndex(foodId, unitIsPtn, unitAmount)}
				protein={foodLibrary.getProteinByIndex(foodId, unitIsPtn, unitAmount)}
				{unitIsPtn}
				{unitAmount}
				eatingMenu={true}
				{eaten}
				eatItem={() => eatItem(id, 'planned')}
			/>
		{/each}
	{/if}
	{#if items.includes('estimates')}
		{#each $estimatesLog as { id, eaten, kcal, protein }}
			<ItemCard
				type="bright"
				{id}
				itemName="Estimate"
				{kcal}
				{protein}
				unitIsPtn={true}
				unitAmount={1}
				eatingMenu={true}
				{eaten}
				eatItem={() => eatItem(id, 'estimate')}
			/>
		{/each}
	{/if}
</div>
