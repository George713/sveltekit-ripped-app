<script lang="ts">
	import { foodLibrary } from '$lib/stores';

	// Atoms
	import SwitchItemsDays from '$atoms/SwitchItemsDays.svelte';
	import PlannerCardTitle from '$atoms/planner/PlannerCardTitle.svelte';
	import BtnFinishPlanning from '$atoms/planner/BtnFinishPlanning.svelte';
	import BtnNewItem from '$atoms/planner/BtnNewItem.svelte';
	import BtnNewDay from '$atoms/planner/BtnNewDay.svelte';
	import BtnSaveDay from '$atoms/planner/BtnSaveDay.svelte';
	import Search from '$atoms/planner/Search.svelte';
	// Molecules
	import CardArray from '$molecules/CardArray.svelte';

	export let toggleOverlay = () => {};
	export let newDayPlanning = false;

	let showDays = false;

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
		<SwitchItemsDays bind:isChecked={showDays} />
	</div>
	<!-- Library Items -->
	<CardArray items={[showDays ? 'days' : 'food']} verticalScroll={false} {showDays} />
	<!-- Bottom Row -->
	{#if newDayPlanning}
		<form class="relative m-2 flex">
			<input
				class="mx-auto h-7 w-[calc(50%)] rounded bg-black/20 px-1.5 font-medium text-neutral-200 focus:outline-none"
				name="dayName"
				type="text"
				placeholder="New day name..."
				required
			/>
			<BtnSaveDay />
		</form>
	{:else}
		<div class="mb-1.5 flex justify-between">
			<BtnFinishPlanning {toggleOverlay} />
			<!-- <Search /> -->
			{#if showDays}
				<BtnNewDay />
			{:else}
				<BtnNewItem />
			{/if}
		</div>
	{/if}
</div>
