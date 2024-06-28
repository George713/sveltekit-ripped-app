<script lang="ts">
	import { page } from '$app/stores';
	import { visibleOverlay } from '$lib/stores';

	let inputElement: HTMLInputElement;

	const handleFileChange = (event: Event) => {
		const target = event.target as HTMLInputElement | null;
		if (target && target.files && target.files.length > 0) {
			const file = target.files[0];
			// handleImage(file);
			alert('new image detected');
		}
	};
</script>

<!-- <button
	class="mx-4 h-14 w-14 rounded border border-gray-400/10 bg-gray-300 text-[20px] font-bold text-neutral-600 shadow disabled:bg-gray-200 disabled:text-neutral-400"
	on:click={() => visibleOverlay.set('weeklyPic')}
	disabled={$page.data.dailyProgress.weeklyPic}
>
	P
</button> -->

<button
	class="mx-4 h-14 w-14 rounded border border-gray-400/10 bg-gray-300 text-[20px] font-bold text-neutral-600 shadow disabled:bg-gray-200 disabled:text-neutral-400"
	on:click={() => inputElement.click()}
	disabled={$page.data.dailyProgress.weeklyPic}
>
	P
</button>

<input
	bind:this={inputElement}
	on:change={handleFileChange}
	type="file"
	accept="image/*"
	capture="user"
	hidden
/>
