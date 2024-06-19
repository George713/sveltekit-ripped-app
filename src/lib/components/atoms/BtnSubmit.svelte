<script lang="ts">
	export let text: string = 'Your Text';
	export let symbol: string;
</script>

<button
	class="mt-2 mx-auto flex items-center rounded-[4px] bg-neutral-700 shadow-[inset_2px_2px_3px_rgba(161,161,161,0.05),inset_-2px_-2px_3px_rgba(0,0,0,0.05)]"
	type="submit"
>
	{#if symbol === 'plus'}
		<svg class="ml-1 h-[18px] fill-none stroke-zinc-300 px-1" viewBox="0 0 24 24">
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="1.5"
				d="M12 7v10m0-5h5M7 12h2.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
			/>
		</svg>
	{/if}
	<p class="h-7 py-[6px] pr-2 text-[8px] font-medium text-zinc-300 flex items-center">{text}</p>
</button>
