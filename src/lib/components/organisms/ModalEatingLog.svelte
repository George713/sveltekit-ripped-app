<script lang="ts">
	import { foodLibrary, plannedItems, visibleView, visibleOverlay } from '$lib/stores';

	import ItemCard from '$atoms/ItemCard.svelte';
	import TargetTracker from '$atoms/TargetTracker.svelte';
	import OverlayAddEstimate from '$overlays/AddEstimate.svelte';

	const eatItem = async (id: number) => {
		plannedItems.update((items) => {
			const index = items.findIndex((item) => item.id === id);
			if (index !== -1) {
				items[index].eaten = true;
			}
			return items;
		});

		// Updaten eaten flag in db
		const formData = new FormData();
		formData.append('id', id.toString());
		const response = await fetch('?/eatItem', {
			method: 'POST',
			body: formData
		});
	};
</script>

<div class="absolute inset-0 h-full w-full bg-black bg-opacity-70">
	<div
		class="absolute bottom-1 left-0.5 flex h-[calc(96%)] w-[calc(100%-4px)] flex-col items-center rounded-lg border-2 border-slate-50 bg-gray-300"
	>
		<!-- Title: Planner -->
		<p class="my-1 text-3xl font-medium text-gray-800">Eating Log</p>
		<!-- Selected for today -->
		<div
			class="relative mb-1 h-[calc(86%)] w-[calc(100%-8px)] rounded-sm bg-neutral-100 shadow-[0_1px_1px_rgba(0,0,0,0.25)]"
		>
			<!-- Title -->
			<div class="flex">
				<svg
					class="ml-2 mt-[9px] h-[13px] w-[12px] fill-neutral-500"
					preserveAspectRatio="none"
					style="float:left;"
					viewBox="0 0 122.88 115.21"
				>
					<path
						d="m29.03 100.46 20.79-25.21 9.51 12.13L41 110.69c-7.02 8.92-20.01-.48-11.97-10.23zm24.28-57.41c1.98-6.46 1.07-11.98-6.37-20.18L28.76 1c-2.58-3.03-8.66 1.42-6.12 5.09L37.18 24c2.75 3.34-2.36 7.76-5.2 4.32L16.94 9.8c-2.8-3.21-8.59 1.03-5.66 4.7 4.24 5.1 10.8 13.43 15.04 18.53 2.94 2.99-1.53 7.42-4.43 3.69L6.96 18.32c-2.19-2.38-5.77-.9-6.72 1.88-1.02 2.97 1.49 5.14 3.2 7.34L20.1 49.06c5.17 5.99 10.95 9.54 17.67 7.53 1.03-.31 2.29-.94 3.64-1.77l44.76 57.78c2.41 3.11 7.06 3.44 10.08.93l.69-.57c3.4-2.83 3.95-8 1.04-11.34l-47.4-54.46c1.38-1.54 2.39-3 2.73-4.11zm12.67 12.6 7.37-8.94C63.87 23.21 99-8.11 116.03 6.29 136.72 23.8 105.97 66 84.36 55.57l-8.73 11.09-9.65-11.01z"
					/>
				</svg>
				<div class="mt-2 px-1.5 text-[12px] font-medium text-zinc-500">Daily Selection</div>
				<!-- Target tracker -->
				<TargetTracker />
			</div>
			<!--  overflow-y-auto scrollbar-hide -->
			<div
				class="scrollbar-hide mt-2 flex flex-row flex-wrap justify-center gap-y-1 space-x-1 overflow-y-auto"
			>
				{#each $plannedItems as { id, foodId, eaten }}
					<ItemCard
						type="bright"
						{id}
						{foodId}
						itemName={foodLibrary.getItemNameByIndex(foodId)}
						kcal={foodLibrary.getKcalByIndex(foodId)}
						protein={foodLibrary.getProteinByIndex(foodId)}
						portionUnit="ptn"
						portionSize={foodLibrary.getPortionSizeByIndex(foodId)}
						eatingMenu={true}
						{eaten}
						{eatItem}
					/>
				{/each}
			</div>
			<!-- Buttons for Adding Items -->
			<div class="absolute bottom-2 right-1 flex">
				<button
					on:click={() => {
						visibleOverlay.set('addEstimate');
					}}
					class="mx-2 flex h-8 items-center rounded-[4px] bg-neutral-400/70 shadow-[inset_2px_2px_3px_rgba(161,161,161,0.05),inset_-2px_-2px_3px_rgba(0,0,0,0.05)]"
				>
					<svg class="ml-1 h-[18px] fill-none stroke-zinc-100 px-1" viewBox="0 0 32 32"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="1.5"
							d="M16,4c-4.963,0-9,4.038-9,9c0,3.186,1.781,5.278,3.212,6.959C11.172,21.085,12,22.059,12,23v5h3 v1h2v-1h3v-5c0-0.941,0.828-1.915,1.788-3.041C23.219,18.278,25,16.186,25,13C25,8.038,20.963,4,16,4z M18,26h-4v-2h4V26z M20.265,18.662c-0.923,1.084-1.805,2.12-2.132,3.338h-4.266c-0.327-1.218-1.209-2.254-2.132-3.338C10.391,17.083,9,15.45,9,13 c0-3.86,3.141-7,7-7s7,3.14,7,7C23,15.45,21.609,17.083,20.265,18.662z M16,7v2c-2.206,0-4,1.794-4,4h-2C10,9.691,12.691,7,16,7z"
						/></svg
					>
					<div
						class="flex flex-col py-[6px] pr-2 text-[8px] font-bold leading-none tracking-tight text-zinc-100"
					>
						<p>Add<br />Estimate</p>
					</div>
				</button>
				<button
					on:click={() => {
						visibleView.update('foodLib');
					}}
					class="mx-2 flex h-8 items-center rounded-[4px] bg-neutral-400/70 shadow-[inset_2px_2px_3px_rgba(161,161,161,0.05),inset_-2px_-2px_3px_rgba(0,0,0,0.05)]"
				>
					<svg class="ml-1 h-[18px] fill-none stroke-zinc-100 px-1" viewBox="0 0 24 24"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="1.5"
							d="M12 7v10m0-5h5M7 12h2.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
						/></svg
					>
					<div
						class="flex flex-col py-[6px] pr-2 text-[8px] font-bold leading-none tracking-tight text-zinc-100"
					>
						<p>Food<br />Library</p>
					</div>
				</button>
			</div>
		</div>
		<!-- Minimize Symbol -->
		<button on:click={() => visibleView.update('none')} class="absolute bottom-3">
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

{#if $visibleOverlay == 'addEstimate'}
	<OverlayAddEstimate />
{/if}
