<script lang="ts">
	import { visibleOverlay, visibleView } from '$lib/stores';
</script>

<div class="mb-2 flex justify-end">
	<button
		on:click={() => {
			visibleOverlay.set('addEstimate');
		}}
		class="mx-2 flex h-8 items-center rounded-[4px] bg-neutral-400/70 shadow-[inset_2px_2px_3px_rgba(161,161,161,0.05),inset_-2px_-2px_3px_rgba(0,0,0,0.05)]"
	>
		<svg class="ml-1 h-[18px] fill-none stroke-zinc-100 px-1" viewBox="0 0 32 32"
			><path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="1.5"
				d="M16,4c-4.963,0-9,4.038-9,9c0,3.186,1.781,5.278,3.212,6.959C11.172,21.085,12,22.059,12,23v5h3 v1h2v-1h3v-5c0-0.941,0.828-1.915,1.788-3.041C23.219,18.278,25,16.186,25,13C25,8.038,20.963,4,16,4z M18,26h-4v-2h4V26z M20.265,18.662c-0.923,1.084-1.805,2.12-2.132,3.338h-4.266c-0.327-1.218-1.209-2.254-2.132-3.338C10.391,17.083,9,15.45,9,13 c0-3.86,3.141-7,7-7s7,3.14,7,7C23,15.45,21.609,17.083,20.265,18.662z M16,7v2c-2.206,0-4,1.794-4,4h-2C10,9.691,12.691,7,16,7z"
			/></svg
		>
		<div
			class="flex flex-col py-[6px] pr-2 text-[8px] font-bold leading-none tracking-tight text-zinc-100"
		>
			<p>Add<br />Estimate</p>
		</div>
	</button>
	<button
		on:click={() => {
			visibleView.update('foodLib');
		}}
		class="mx-2 flex h-8 items-center rounded-[4px] bg-neutral-400/70 shadow-[inset_2px_2px_3px_rgba(161,161,161,0.05),inset_-2px_-2px_3px_rgba(0,0,0,0.05)]"
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
			<p>Food<br />Library</p>
		</div>
	</button>
</div>
