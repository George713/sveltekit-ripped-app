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
			<div class="flex w-full justify-end px-2">
				<SwitchItemsDays />
			</div>
			<CardArray items={$foodLibrary} />
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
