<script lang="ts">
	import { page } from '$app/stores';
	import { deserialize } from '$app/forms';

	import {
		plannedItems,
		foodLibrary,
		estimatesLog,
		showSpinner,
		visibleView,
		foodSets,
		selectedForNewSet
	} from '$lib/stores';
	import type { PlannedItem } from '$lib/types';

	import ItemCard from '$atoms/ItemCard.svelte';
	import SetCard from '$atoms/SetCard.svelte';

	export let items: String[];
	export let verticalScroll: boolean;
	export let setPlanningMode = false;

	let selection = setPlanningMode ? selectedForNewSet : plannedItems;

	// Function for adding item to the list of items currently in planning
	const addToPlanningProcess = (id: number, unitIsPtn: boolean, unitAmount: number) => {
		const newPlannedItem: PlannedItem = {
			id: selection.maxId + 1,
			eaten: false,
			createdAt: new Date(),
			foodId: id,
			unitIsPtn: unitIsPtn,
			unitAmount: unitAmount
		};
		selection.add(newPlannedItem);
	};

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
	class="scrollbar-hide mx-1.5 my-0.5 flex flex-wrap gap-1 {verticalScroll
		? 'h-1 grow content-start justify-center overflow-y-auto'
		: 'h-52 flex-col overflow-x-auto'}"
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
				plusButton={$page.data.dailyProgress.planned && !setPlanningMode
					? () => addToPlannedItems(id, unitIsPtn, unitAmount)
					: () => addToPlanningProcess(id, unitIsPtn, unitAmount)}
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
		{#each $estimatesLog as { id, eaten, kcal, protein, name }}
			<ItemCard
				type="bright"
				{id}
				itemName={name ? name : 'Estimate'}
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
	{#if items.includes('days')}
		{#each $foodSets as { id, name }}
			<SetCard {id} {name} />
		{/each}
	{/if}
</div>
