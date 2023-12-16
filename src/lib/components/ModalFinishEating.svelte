<script lang="ts">
	import { page } from '$app/stores';
	import { invalidateAll } from '$app/navigation';
	import { dailySelection } from '$lib/stores';

	export let toggleModal: (modal: string) => void;

	const finishEating = async () => {
		// Mark finished eating in db
		const formData = new FormData();
		formData.append('username', JSON.stringify($page.data.user.name));
		const response = await fetch('?/finishEating', {
			method: 'POST',
			body: formData
		});

		// Return to main screen
		toggleModal('none');

		// Reset page data
		invalidateAll();
	};
</script>

<div
	class="absolute top-0 left-0 w-screen h-screen bg-black/30 backdrop-blur-[2px] flex justify-center"
	on:click={() => toggleModal('none')}
	on:keydown={() => toggleModal('none')}
>
	<div
		class="relative top-[calc(56vh)] w-80 h-40 bg-white/60 backdrop-blur-lg shadow-lg rounded-lg flex flex-col items-center"
	>
		<span class="pt-2 my-4 font-sans font-semibold text-center"
			>Everything I ate today I <br /> entered & I am done eating.</span
		>
		<button
			class="px-6 py-2 bg-green-400 rounded text-gray-700 font-bold text-xl"
			on:click={finishEating}>CONFIRM</button
		>
	</div>
</div>
