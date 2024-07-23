<script lang="ts">
	import { foodLibrary, plannedItems, visibleView } from '$lib/stores';
	import type { PlannedItem } from '$lib/types';

	import ItemCard from '$atoms/ItemCard.svelte';
	import PlannerCardTitle from '$atoms/planner/PlannerCardTitle.svelte';
	import SwitchItemsDays from '$atoms/SwitchItemsDays.svelte';
	import BtnFinishPlanning from '$atoms/planner/BtnFinishPlanning.svelte';
	import BtnNewItem from '$atoms/planner/BtnNewItem.svelte';
	import Search from '$atoms/planner/Search.svelte';
	import CardArray from '$molecules/CardArray.svelte';

	export let toggleOverlay: () => void;

	const addToPlanningProcess = (id: number, unitIsPtn: boolean, unitAmount: number) => {
		const newPlannedItem: PlannedItem = {
			id: plannedItems.maxId + 1,
			eaten: false,
			createdAt: new Date(),
			foodId: id,
			unitIsPtn: unitIsPtn,
			unitAmount: unitAmount
		};
		plannedItems.add(newPlannedItem);
	};

	/**
	 * Deletes a food item from the food library and sends a request to the server to delete the item.
	 *
	 * @param {number} id - The ID of the food item to delete.
	 * First, it updates the food library by removing the item with the given ID.
	 * Then, it sends a POST request to the '?/deleteItem' endpoint with the ID of the item to delete.
	 * If the item is not found in the food library, it does nothing.
	 */
	const deleteItem = async (id: number) => {
		// Remove item from store foodLibrary
		foodLibrary.update((items) => {
			const index = items.findIndex((item) => item.id === id);
			if (index !== -1) {
				return [...items.slice(0, index), ...items.slice(index + 1)];
			}
			return items;
		});

		const formData = new FormData();
		formData.append('id', id.toString());
		const response = await fetch('?/deleteItem', {
			method: 'POST',
			body: formData
		});
	};
</script>

<div
	class="flex w-[calc(100%-8px)] flex-col rounded-sm bg-neutral-600 shadow-[0_1px_1px_rgba(0,0,0,0.25)]"
>
	<!-- Header Row -->
	<div class="m-1 flex h-6 items-center justify-between">
		<PlannerCardTitle title="Food Library" color="neutral-300" />
		<SwitchItemsDays />
	</div>
	<!-- Library Items -->
	<CardArray items={['food']} verticalScroll={false} />
	<!-- Bottom Row -->
	<div class="mb-1.5 flex justify-between">
		<BtnFinishPlanning {toggleOverlay} />
		<!-- <Search /> -->
		<BtnNewItem />
	</div>
</div>
