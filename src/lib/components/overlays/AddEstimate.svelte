<script lang="ts">
	import { deserialize } from '$app/forms';
	import { estimatesLog, showSpinner, visibleOverlay } from '$lib/stores';
	import type { EatEstimate } from '$lib/types';

	import Background from '$overlays/Background.svelte';

	const handleSubmit = async (event: Event) => {
		// Show spinner
		$showSpinner = true;

		// Return to previous modal
		visibleOverlay.set('none');

		const response = await fetch('?/addEstimate', {
			method: 'POST',
			body: new FormData(event.target as HTMLFormElement)
		});

		const result = deserialize(await response.text());

		if (result.type === 'success' && result.data) {
			const newEstimate = result.data.newEstimate as EatEstimate;
			// Update estimatesLog
			estimatesLog.update((items) => {
				// @ts-ignore
				return [...items, newEstimate];
			});
		}

		// Hide spinner
		$showSpinner = false;
	};
</script>

<Background>
	<div
		class="absolute bottom-1/4 left-1/2 flex w-[calc(70%)] -translate-x-1/2 -translate-y-1/2 transform flex-col items-center rounded-md bg-slate-200/70 backdrop-blur-xs px-5 py-2"
	>
		<span>Add Estimate</span>
		<form method="post" autocomplete="off" on:submit|preventDefault={handleSubmit} class="mt-3">
			<!-- Row Calories -->
			<div class="mb-1 flex justify-end">
				<span>Calories</span>
				<input type="number" value="0" class="mx-1 w-10 rounded pr-1 text-right" name="kcal" />
				<span class="w-7">kcal</span>
			</div>
			<!-- Row Protein -->
			<div class="mb-3 flex justify-end">
				<span>Protein</span>
				<input type="number" value="0" class="mx-1 w-10 rounded pr-1 text-right" name="protein" />
				<span class="w-7">g</span>
			</div>
			<!-- Submit Button -->
			<button
				class="mx-auto flex h-8 items-center rounded-[4px] bg-green-600/80 shadow-[inset_2px_2px_3px_rgba(161,161,161,0.05),inset_-2px_-2px_3px_rgba(0,0,0,0.05)]"
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
					<p>Add</p>
				</div>
			</button>
		</form>
	</div>
</Background>
