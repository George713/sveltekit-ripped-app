<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { page } from '$app/stores';
	import { invalidateAll } from '$app/navigation';
	import { showSpinner, visibleOverlay, visibleView } from '$lib/stores';
	import { selectInput } from '$lib/utils.ts';

	import Background from '$overlays/Background.svelte';

	const dispatch = createEventDispatcher();

	const playSound = () => {
		dispatch('playSound', {
			text: 'weighIn'
		});
	};

	const handleSubmit = async (event: Event) => {
		// Show spinner
		$showSpinner = true;

		// Exit overlay for adjusting calories
		visibleOverlay.set('none');

		// Write new calorie target to db
		const formData = new FormData(event.target as HTMLFormElement);
		await fetch('/?/logWeight', {
			method: 'POST',
			body: formData
		});

		// Reset page data
		invalidateAll();

		// Play success sound
		playSound();

		// Hide spinner
		$showSpinner = false;
	};
</script>

<Background>
	<div
		class="absolute bottom-1/4 left-1/2 flex w-[calc(70%)] -translate-x-1/2 -translate-y-1/2 transform flex-col items-center rounded-md bg-slate-200/70 backdrop-blur-xs px-5 py-2"
	>
		<span class="font-semibold">Current Weight</span>
		<form method="post" autocomplete="off" on:submit|preventDefault={handleSubmit} class="">
			<!-- Row Weight -->
			<div class="my-4 flex justify-end">
				<span>Scale value:</span>
				<input
					type="number"
					step="0.01"
					value={$page.data.user.currentWeight}
					class="ml-2 mx-1 w-14 rounded pr-1 text-right"
					name="weight"
					on:focus={selectInput}
					required
				/>
				<span class="w-7">kg</span>
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
				<div class="py-[6px] pr-2 text-[8px] font-bold text-zinc-100">
					<p>Submit</p>
				</div>
			</button>
		</form>
	</div>
</Background>
