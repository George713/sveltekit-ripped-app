<script lang="ts">
	import { foodLibrary, showSpinner, visibleView } from '$lib/stores';

	import SwitchItemsDays from '$atoms/SwitchItemsDays.svelte';
	import CardArray from '$molecules/CardArray.svelte';
	import FoodLibBottomRow from '$molecules/FoodLibBottomRow.svelte';
	import Spinner from '$overlays/Spinner.svelte';
</script>

<div class="absolute inset-0 h-full w-full bg-black bg-opacity-70">
	<div
		class="absolute bottom-1 left-0.5 flex h-[calc(96%)] w-[calc(100%-4px)] flex-col items-center rounded-lg border-2 border-slate-50 bg-gray-300"
	>
		<!-- Title: Planner -->
		<p class="my-1 text-3xl font-medium text-gray-800">Food Library</p>
		<!-- Food Library -->
		<div
			class="mb-6 flex w-[calc(100%-8px)] grow flex-col rounded-sm bg-neutral-600 shadow-[0_1px_1px_rgba(0,0,0,0.25)]"
		>
			<div class="relative flex">
				<svg
					class="ml-2 mt-[9px] h-[13px] w-[12px] fill-neutral-100"
					preserveAspectRatio="none"
					style="float:left;"
					viewBox="0 0 122.88 115.21"
				>
					<path
						d="m29.03 100.46 20.79-25.21 9.51 12.13L41 110.69c-7.02 8.92-20.01-.48-11.97-10.23zm24.28-57.41c1.98-6.46 1.07-11.98-6.37-20.18L28.76 1c-2.58-3.03-8.66 1.42-6.12 5.09L37.18 24c2.75 3.34-2.36 7.76-5.2 4.32L16.94 9.8c-2.8-3.21-8.59 1.03-5.66 4.7 4.24 5.1 10.8 13.43 15.04 18.53 2.94 2.99-1.53 7.42-4.43 3.69L6.96 18.32c-2.19-2.38-5.77-.9-6.72 1.88-1.02 2.97 1.49 5.14 3.2 7.34L20.1 49.06c5.17 5.99 10.95 9.54 17.67 7.53 1.03-.31 2.29-.94 3.64-1.77l44.76 57.78c2.41 3.11 7.06 3.44 10.08.93l.69-.57c3.4-2.83 3.95-8 1.04-11.34l-47.4-54.46c1.38-1.54 2.39-3 2.73-4.11zm12.67 12.6 7.37-8.94C63.87 23.21 99-8.11 116.03 6.29 136.72 23.8 105.97 66 84.36 55.57l-8.73 11.09-9.65-11.01z"
					/>
				</svg>
				<div class="grow ml-1.5 mt-2 text-[12px] font-medium text-zinc-100">Food Library</div>
				<SwitchItemsDays />
			</div>
			<CardArray items={['food']} />
			<FoodLibBottomRow />
		</div>

		<!-- Minimize Symbol -->
		<button on:click={() => visibleView.update('eat')} class="relative bottom-3">
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

<Spinner showSpinner={$showSpinner} />
