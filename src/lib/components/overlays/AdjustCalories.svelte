<script lang="ts">
	import { page } from '$app/stores';
	import { invalidateAll } from '$app/navigation';
	import { showSpinner, visibleOverlay, visibleView } from '$lib/stores';
	import { selectInput, focusElement } from '$lib/utils.ts';

	import Background from '$overlays/Background.svelte';

	const handleSubmit = async (event: Event) => {
		// Show spinner
		$showSpinner = true;

		// Exit overlay for adjusting calories
		visibleOverlay.set('none');

		// Write new calorie target to db
		const formData = new FormData(event.target as HTMLFormElement);
		formData.append('reviewMode', 'true');
		await fetch('/?/logCalories', {
			method: 'POST',
			body: formData
		});

		// Reset page data
		invalidateAll();

		// Return to base view
		visibleView.update('none');

		// Hide spinner
		$showSpinner = false;
	};
</script>

<Background>
	<div
		class="absolute bottom-1/4 left-1/2 flex w-[calc(70%)] -translate-x-1/2 -translate-y-1/2 transform flex-col items-center rounded-md bg-slate-200/70 backdrop-blur-xs px-5 py-2"
	>
		<span>New Calorie Target</span>
		<form method="post" autocomplete="off" on:submit|preventDefault={handleSubmit} class="">
			<!-- Row Calories -->
			<div class="ml-1 my-4 flex justify-end">
				<span>Calories</span>
				<input
					type="number"
					value={$page.data.user.currentCalorieTarget}
					class="mx-1 w-12 rounded pr-1 text-right"
					name="calories"
					on:focus={selectInput}
					use:focusElement
					required
				/>
				<span class="w-7">kcal</span>
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
					<p>Update</p>
				</div>
			</button>
		</form>
	</div>
</Background>
