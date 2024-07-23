<script lang="ts">
	import Search from '$atoms/planner/Search.svelte';
	import { visibleView } from '$lib/stores';
</script>

<div class="relative my-2 flex">
	<button
		class="mx-auto h-7 w-36 rounded-[4px] bg-neutral-300 pt-[2px] font-serif text-neutral-500 shadow-[inset_2px_2px_5px_rgba(0,0,0,0.15),inset_-2px_-2px_3px_rgba(255,255,255,0.5)]"
	>
		Search
	</button>

	<button
		on:click={() => {
			visibleView.update('newItem');
		}}
		class="absolute right-3 flex h-7 items-center rounded-[4px] bg-neutral-700 shadow-[inset_2px_2px_3px_rgba(161,161,161,0.05),inset_-2px_-2px_3px_rgba(0,0,0,0.05)]"
	>
		<svg class="ml-1 h-[18px] fill-none stroke-zinc-300 px-1" viewBox="0 0 24 24"
			><path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="1.5"
				d="M12 7v10m0-5h5M7 12h2.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
			/></svg
		>
		<div
			class="flex flex-col py-[6px] pr-2 text-[8px] font-medium leading-none tracking-tight text-zinc-300"
		>
			<p>New Item</p>
		</div>
	</button>
</div>
