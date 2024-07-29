<!-- BtnDeleteSet.svelte -->
<script lang="ts">
	import { activeSetId, foodSets, showSpinner, visibleView } from '$lib/stores';

	const deleteSet = async () => {
		// Show spinner
		$showSpinner = true;

		// Submit items of new set to server
		const formData = new FormData();
		formData.append('setId', JSON.stringify($activeSetId));
		const response = await fetch('?/deleteSet', {
			method: 'POST',
			body: formData
		});

		// Update the store to remove the deleted set
		foodSets.update((sets) => sets.filter((set) => set.id !== $activeSetId));
		activeSetId.set(undefined);

		// Return to main view
		visibleView.update('planner');

		// Hide spinner
		$showSpinner = false;
	};
</script>

<button
	type="button"
	on:click={deleteSet}
	class="absolute left-0 flex items-center rounded-[4px] border border-neutral-500 shadow-[inset_2px_2px_3px_rgba(161,161,161,0.05),inset_-2px_-2px_3px_rgba(0,0,0,0.05)]"
>
	<svg class="ml-1 h-[16px] fill-zinc-400 stroke-zinc-400 px-1" viewBox="0 0 24 24"
		><path
			d="M5.755 20.283 4 8h16l-1.755 12.283A2 2 0 0 1 16.265 22h-8.53a2 2 0 0 1-1.98-1.717ZM21 4h-5V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v1H3a1 1 0 0 0 0 2h18a1 1 0 0 0 0-2Z"
		/>
	</svg>
	<div
		class="flex flex-col py-[6px] pr-2 text-[8px] font-medium leading-none tracking-tight text-zinc-400"
	>
		<p>
			Delete <br />
			Set
		</p>
	</div>
</button>
