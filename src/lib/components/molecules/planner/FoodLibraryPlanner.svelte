<script lang="ts">
	import {
		activeSetId,
		foodSets,
		foodLibrary,
		showSpinner,
		visibleView,
		selectedForNewSet
	} from '$lib/stores';

	// Atoms
	import SwitchItemsDays from '$atoms/SwitchItemsDays.svelte';
	import PlannerCardTitle from '$atoms/planner/PlannerCardTitle.svelte';
	import BtnFinishPlanning from '$atoms/planner/BtnFinishPlanning.svelte';
	import BtnNewItem from '$atoms/planner/BtnNewItem.svelte';
	import BtnNewSet from '$atoms/planner/BtnNewSet.svelte';
	import BtnSaveSet from '$atoms/planner/BtnSaveSet.svelte';
	import Search from '$atoms/planner/Search.svelte';
	// Molecules
	import CardArray from '$molecules/CardArray.svelte';
	import { invalidateAll } from '$app/navigation';
	import BtnDeleteSet from '$atoms/planner/BtnDeleteSet.svelte';

	export let toggleOverlay = () => {};
	export let setPlanningMode = false;

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

	const createSet = async (event: Event) => {
		// Show spinner
		$showSpinner = true;

		// Submit items of new set to server
		const formData = new FormData(event.target as HTMLFormElement);
		formData.append('selectedForNewSet', JSON.stringify($selectedForNewSet));
		formData.append('setId', $activeSetId ? JSON.stringify($activeSetId) : 'false');
		const response = await fetch('?/createSet', {
			method: 'POST',
			body: formData
		});

		// Reload page data (so plan button is disabled)
		await invalidateAll();

		// Return to main view
		visibleView.update('none');

		// Hide spinner
		$showSpinner = false;
	};
</script>

<div
	class="flex w-[calc(100%-8px)] flex-col rounded-xs bg-neutral-600 shadow-[0_1px_1px_rgba(0,0,0,0.25)]"
>
	<!-- Header Row -->
	<div class="m-1 flex h-6 items-center justify-between">
		<PlannerCardTitle title="Food Library" color="neutral-300" />
		{#if !setPlanningMode}
			<SwitchItemsDays bind:isChecked={showDays} />
		{/if}
	</div>
	<!-- Library Items -->
	<CardArray items={[showDays ? 'days' : 'food']} verticalScroll={false} {setPlanningMode} />
	<!-- Bottom Row -->
	{#if setPlanningMode}
		<form class="relative m-2 flex" autocomplete="off" on:submit|preventDefault={createSet}>
			{#if $activeSetId}
				<BtnDeleteSet />
			{/if}
			<input
				class="mx-auto h-7 w-[calc(50%)] rounded-sm bg-black/20 px-1.5 font-medium text-neutral-200 focus:outline-hidden"
				name="setName"
				type="text"
				placeholder="New set name..."
				value={$activeSetId ? foodSets.findSetById($activeSetId)?.name : ''}
				required
			/>
			<BtnSaveSet text={$activeSetId ? 'Update<br />Set' : 'Save<br />new Set'} />
		</form>
	{:else}
		<div class="mb-1.5 flex justify-between">
			<BtnFinishPlanning {toggleOverlay} />
			<!-- <Search /> -->
			{#if showDays}
				<BtnNewSet />
			{:else}
				<BtnNewItem />
			{/if}
		</div>
	{/if}
</div>
