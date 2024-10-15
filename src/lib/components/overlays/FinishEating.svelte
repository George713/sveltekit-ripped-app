<script lang="ts">
	import { page } from '$app/stores';
	import { invalidateAll } from '$app/navigation';
	import { visibleView } from '$lib/stores';

	const finishEating = async () => {
		// Mark finished eating in db
		const formData = new FormData();
		const response = await fetch('?/finishEating', {
			method: 'POST',
			body: formData
		});

		// Return to main screen
		visibleView.update('none');

		// Reset page data
		invalidateAll();
	};
</script>

<div
	class="absolute left-0 top-0 flex h-screen w-screen justify-center bg-black/30 backdrop-blur-[2px]"
	role="button"
	tabindex={0}
	on:click={() => visibleView.update('none')}
	on:keydown={() => visibleView.update('none')}
>
	<div
		class="relative top-[calc(56dvh)] flex h-40 w-80 flex-col items-center rounded-lg bg-white/60 shadow-lg backdrop-blur-lg"
	>
		<span class="my-4 pt-2 text-center font-sans font-semibold"
			>Everything I ate today I <br /> entered & I am done eating.</span
		>
		<button
			class="rounded bg-green-400 px-6 py-2 text-xl font-bold text-gray-700"
			on:click={finishEating}>CONFIRM</button
		>
	</div>
</div>
