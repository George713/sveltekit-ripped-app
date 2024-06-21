<script lang="ts">
	export let fileInput: HTMLInputElement;
	export let icon: string;
</script>

<button class="absolute top-0 w-full h-full flex" on:click={() => fileInput.click()} type="button">
	{#if icon === 'plus'}
		<svg class="h-7 w-7 flex-1 my-auto fill-none stroke-neutral-200/80" viewBox="0 0 24 24">
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="1"
				d="M12 8v8m-4-4h2m6 0h-4m-8 4a4 4 0 0 0 4 4h8a4 4 0 0 0 4-4V8a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v4"
			/>
		</svg>
	{:else if icon === 'edit'}
		<svg
			class="absolute h-7 w-7 bottom-1 right-1 fill-none stroke-neutral-200/70"
			viewBox="0 0 24 24"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="1"
				d="M12 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-6M9 15v-2.5l8.75-8.75c.69-.69 1.81-.69 2.5 0v0c.69.69.69 1.81 0 2.5L15.5 11l-4 4H9Z"
			/>
		</svg>
	{/if}
</button>
