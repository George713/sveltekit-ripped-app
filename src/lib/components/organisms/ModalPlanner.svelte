<script lang="ts">
	import { page } from '$app/stores';
	import { deserialize } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import type { PlannedItem } from '$lib/types';
	import { foodLibrary, plannedItems, plannedKcal, plannedProtein, showSpinner } from '$lib/stores';
	import ItemCard from '$atoms/ItemCard.svelte';
	import TargetTracker from '$atoms/TargetTracker.svelte';
	import FinishPlanning from '$overlays/FinishPlanning.svelte';

	export let toggleModal: (modal: string) => void;

	const addToPlannedItems = (id: number) => {
		const newPlannedItem: PlannedItem = {
			id: plannedItems.maxId + 1,
			eaten: false,
			createdAt: new Date(),
			foodId: id
		};
		plannedItems.add(newPlannedItem);
	};

	const removeFromPlannedItems = (id: number) => {
		plannedItems.remove(id);
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

	// Controls for finishing of planning
	let showOverlay = false;
	let msg: string;
	const toggleOverlay = () => {
		if ($plannedItems.length === 0) {
			msg = "You haven't selected any items for today.";
		} else if ($plannedKcal > $page.data.user.currentCalorieTarget + 25) {
			msg = `You have exceeded your calorie target for today. Try to select in the range of +-25 kcal of your target (${$page.data.user.currentCalorieTarget} kcal).`;
		} else if ($plannedKcal < $page.data.user.currentCalorieTarget - 25) {
			msg = `You have not reached your calorie target for today. Try to select in the range of +-25 kcal of your target (${$page.data.user.currentCalorieTarget} kcal).`;
		}

		showOverlay = !showOverlay;
	};

	const finishPlanning = async () => {
		// Hide overlay
		toggleOverlay();
		// Show spinner
		$showSpinner = true;

		// Submit planned items to server
		const formData = new FormData();
		formData.append('plannedItems', JSON.stringify($plannedItems));
		formData.append('username', JSON.stringify($page.data.user.name));
		const response = await fetch('?/finishPlanning', {
			method: 'POST',
			body: formData
		});

		const result = deserialize(await response.text());

		if (result.type === 'success' && result.data) {
			plannedItems.set(result.data.createdPlannedItems as PlannedItem[]);
		}

		// Return to main view
		toggleModal('');

		// Reload page data (so plan button is disabled)
		invalidateAll();

		// Hide spinner
		$showSpinner = false;
	};
</script>

<div class="absolute inset-0 w-full h-full bg-black bg-opacity-70">
	<div
		class="absolute bottom-1 left-0.5 w-[calc(100%-4px)] h-[calc(96%)] rounded-lg bg-gray-300 border-2 border-slate-50 flex flex-col items-center"
	>
		<!-- Title: Planner -->
		<p class="my-1 text-3xl font-medium text-gray-800">Planner</p>
		<!-- Selected for today -->
		<div
			class="w-[calc(100%-8px)] h-[252px] bg-neutral-100 rounded-sm mb-1 shadow-[0_1px_1px_rgba(0,0,0,0.25)]"
		>
			<!-- Title -->
			<div class="flex">
				<svg
					class="fill-neutral-500 mt-[9px] ml-2 h-[13px] w-[12px]"
					preserveAspectRatio="none"
					style="float:left;"
					viewBox="0 0 122.88 115.21"
				>
					<path
						d="m29.03 100.46 20.79-25.21 9.51 12.13L41 110.69c-7.02 8.92-20.01-.48-11.97-10.23zm24.28-57.41c1.98-6.46 1.07-11.98-6.37-20.18L28.76 1c-2.58-3.03-8.66 1.42-6.12 5.09L37.18 24c2.75 3.34-2.36 7.76-5.2 4.32L16.94 9.8c-2.8-3.21-8.59 1.03-5.66 4.7 4.24 5.1 10.8 13.43 15.04 18.53 2.94 2.99-1.53 7.42-4.43 3.69L6.96 18.32c-2.19-2.38-5.77-.9-6.72 1.88-1.02 2.97 1.49 5.14 3.2 7.34L20.1 49.06c5.17 5.99 10.95 9.54 17.67 7.53 1.03-.31 2.29-.94 3.64-1.77l44.76 57.78c2.41 3.11 7.06 3.44 10.08.93l.69-.57c3.4-2.83 3.95-8 1.04-11.34l-47.4-54.46c1.38-1.54 2.39-3 2.73-4.11zm12.67 12.6 7.37-8.94C63.87 23.21 99-8.11 116.03 6.29 136.72 23.8 105.97 66 84.36 55.57l-8.73 11.09-9.65-11.01z"
					/>
				</svg>
				<div class="mt-2 px-1.5 text-zinc-500 text-[12px] font-medium">Selected for today</div>
				<!-- Target tracker -->
				<TargetTracker />
			</div>
			<div
				class="h-[210px] mt-1 px-1.5 flex flex-col flex-wrap gap-1 overflow-x-auto scrollbar-hide"
			>
				{#each $plannedItems as { id, foodId }}
					<ItemCard
						type="bright"
						{id}
						{foodId}
						itemName={foodLibrary.getItemNameByIndex(foodId)}
						kcal={foodLibrary.getKcalByIndex(foodId)}
						protein={foodLibrary.getProteinByIndex(foodId)}
						portionUnit="ptn"
						portionSize={foodLibrary.getPortionSizeByIndex(foodId)}
						{removeFromPlannedItems}
					/>
				{/each}
			</div>
		</div>
		<!-- Food Library -->
		<div
			class="w-[calc(100%-8px)] h-72 bg-neutral-600 rounded-sm mb-1 shadow-[0_1px_1px_rgba(0,0,0,0.25)]"
		>
			<div class="relative flex">
				<svg
					class="fill-neutral-100 mt-[9px] ml-2 h-[13px] w-[12px]"
					preserveAspectRatio="none"
					style="float:left;"
					viewBox="0 0 122.88 115.21"
				>
					<path
						d="m29.03 100.46 20.79-25.21 9.51 12.13L41 110.69c-7.02 8.92-20.01-.48-11.97-10.23zm24.28-57.41c1.98-6.46 1.07-11.98-6.37-20.18L28.76 1c-2.58-3.03-8.66 1.42-6.12 5.09L37.18 24c2.75 3.34-2.36 7.76-5.2 4.32L16.94 9.8c-2.8-3.21-8.59 1.03-5.66 4.7 4.24 5.1 10.8 13.43 15.04 18.53 2.94 2.99-1.53 7.42-4.43 3.69L6.96 18.32c-2.19-2.38-5.77-.9-6.72 1.88-1.02 2.97 1.49 5.14 3.2 7.34L20.1 49.06c5.17 5.99 10.95 9.54 17.67 7.53 1.03-.31 2.29-.94 3.64-1.77l44.76 57.78c2.41 3.11 7.06 3.44 10.08.93l.69-.57c3.4-2.83 3.95-8 1.04-11.34l-47.4-54.46c1.38-1.54 2.39-3 2.73-4.11zm12.67 12.6 7.37-8.94C63.87 23.21 99-8.11 116.03 6.29 136.72 23.8 105.97 66 84.36 55.57l-8.73 11.09-9.65-11.01z"
					/>
				</svg>
				<div class="mt-2 ml-1.5 text-zinc-100 text-[12px] font-medium">Food Library</div>
				<!-- Switch Items/Days -->
				<label
					for="check"
					class="absolute bg-neutral-500/40 shadow w-[78px] h-5 top-2 right-2 cursor-pointer rounded-full"
				>
					<input type="checkbox" id="check" class="sr-only peer" />
					<span
						class="absolute bg-neutral-200/90 w-[74px] h-4 top-0.5 left-0.5 rounded-full shadow-[inset_2px_2px_4px_rgba(255,255,255,0.25),inset_-2px_-2px_4px_rgba(0,0,0,0.15)]"
					/>
					<span
						class="absolute top-0.5 left-0.5 h-4 w-[37px] rounded-l-full bg-neutral-500 outline outline-[1px] outline-neutral-600/80 shadow-[1px_1px_2px_rgba(0,0,0,.1),inset_2px_2px_2px_rgba(255,255,255,0.05),inset_-2px_-2px_2px_rgba(0,0,0,0.1)] peer-checked:left-[39px] peer-checked:rounded-l-none peer-checked:rounded-r-full transition-all duration-300"
					/>
					<p
						class="absolute left-2.5 h-full pt-0.5 grid place-items-center text-[9px] font-medium text-neutral-300 peer-checked:text-neutral-500/40"
					>
						Items
					</p>
					<p
						class="absolute right-[13px] h-full pt-0.5 grid place-items-center text-[9px] font-medium text-neutral-500/40 peer-checked:text-neutral-300"
					>
						Days
					</p>
				</label>
			</div>
			<!-- Library Items -->
			<div class="h-52 mt-2 px-1.5 flex flex-col flex-wrap gap-1 overflow-x-auto scrollbar-hide">
				{#each $foodLibrary as { id, itemName, kcal, protein, portionSize }}
					<ItemCard
						type="dark"
						{id}
						foodId={id}
						{itemName}
						{kcal}
						{protein}
						portionUnit="ptn"
						{portionSize}
						{deleteItem}
						{addToPlannedItems}
						{removeFromPlannedItems}
					/>
				{/each}
			</div>
			<div class="flex justify-center mt-2">
				<button
					class="bg-neutral-700 rounded-[4px] mx-2 flex items-center shadow-[inset_2px_2px_3px_rgba(161,161,161,0.05),inset_-2px_-2px_3px_rgba(0,0,0,0.05)]"
					on:click={toggleOverlay}
				>
					<svg class="h-4 ml-1 px-1 fill-zinc-300" viewBox="0 0 56 56">
						<path
							d="M28 51.906c13.055 0 23.906-10.828 23.906-23.906 0-13.055-10.875-23.906-23.93-23.906C14.899 4.094 4.095 14.945 4.095 28c0 13.078 10.828 23.906 23.906 23.906Zm0-3.984C16.937 47.922 8.1 39.062 8.1 28c0-11.04 8.813-19.922 19.876-19.922 11.039 0 19.921 8.883 19.945 19.922.023 11.063-8.883 19.922-19.922 19.922Zm-2.953-8.203c.773 0 1.406-.375 1.898-1.102l11.578-18.21c.282-.47.563-1.009.563-1.524 0-1.078-.938-1.735-1.922-1.735-.633 0-1.219.352-1.64 1.055L24.93 35.148l-5.438-7.03c-.515-.704-1.078-.962-1.71-.962-1.032 0-1.852.844-1.852 1.899 0 .515.21 1.008.539 1.453l6.562 8.11c.633.773 1.242 1.1 2.016 1.1Z"
						/>
					</svg>
					<div
						class="flex flex-col text-[8px] font-medium text-zinc-300 leading-none tracking-tight py-[6px] pr-2"
					>
						<p>
							Finish<br />
							Planning
						</p>
					</div>
				</button>
				<button
					class="grow bg-neutral-300 text-neutral-500 rounded-[4px] mx-2 pt-[2px] font-serif shadow-[inset_2px_2px_5px_rgba(0,0,0,0.15),inset_-2px_-2px_3px_rgba(255,255,255,0.5)]"
					>Search</button
				>
				<button
					on:click={() => {
						toggleModal('newItem');
					}}
					class="bg-neutral-700 rounded-[4px] mx-2 flex items-center shadow-[inset_2px_2px_3px_rgba(161,161,161,0.05),inset_-2px_-2px_3px_rgba(0,0,0,0.05)]"
				>
					<svg class="h-[18px] ml-1 px-1 stroke-zinc-300 fill-none" viewBox="0 0 24 24"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="1.5"
							d="M12 7v10m0-5h5M7 12h2.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
						/></svg
					>
					<div
						class="flex flex-col text-[8px] font-medium text-zinc-300 leading-none tracking-tight py-[6px] pr-2"
					>
						<p>New Item</p>
					</div>
				</button>
			</div>
		</div>

		<!-- Minimize Symbol -->
		<button on:click={() => toggleModal('none')} class="absolute bottom-3">
			<svg width="31" height="18" class=" fill-none stroke-gray-400"
				><path
					stroke-linecap="round"
					stroke-width="3"
					d="m2 2 13.066 6.291a1 1 0 0 0 .868 0L29 2M2 9.5l13.066 6.291a1 1 0 0 0 .868 0L29 9.5"
				/>
			</svg>
		</button>
	</div>
</div>

{#if showOverlay}
	<FinishPlanning {toggleOverlay} {finishPlanning} {msg} />
{/if}
