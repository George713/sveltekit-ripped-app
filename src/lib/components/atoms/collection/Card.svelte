<script lang="ts">
	import { detailedCollectible, visibleView } from '$lib/stores';
	import type { Collectible } from '$lib/types';

	export let item: Collectible;
</script>

<!-- Tutorial on animated border: https://www.youtube.com/watch?v=fdLh5pg0nG0&t=6s -->
<button
	on:click={() => {
		if (item.count ?? 0 > 0) {
			detailedCollectible.set(item);
			visibleView.update('collectionSpecifics');
		}
	}}
	class="relative mx-1 h-20 w-16 overflow-hidden rounded {item.rarity === 'bronze'
		? 'bg-bronze'
		: item.rarity === 'silver'
			? 'bg-silver'
			: item.rarity === 'gold'
				? 'bg-gold'
				: 'bg-blue-600/50'}"
>
	{#if item.animate}
		<div
			class="bg-conic-gradient absolute left-[-25%] top-[-25%] h-[150%] w-[150%] animate-border-spin"
		></div>
	{/if}
	<div
		class="absolute left-[1.5px] top-[1.5px] flex h-[calc(100%-3px)] w-[calc(100%-3px)] items-center justify-center rounded bg-gradient-to-b from-slate-900/90 to-black/85 text-xs text-gray-400"
	>
		{#if item.count ?? 0 > 0}
			<img
				src={item.thumbPath}
				alt="thumbnail"
				class="absolute inset-0 h-full w-full rounded object-cover object-center"
			/>
		{:else}
			<p class="text-gray-400/50">?</p>
		{/if}
	</div>
</button>

<style>
	.bg-conic-gradient {
		background: conic-gradient(
			rgba(255, 255, 255, 0.5) 0deg,
			rgba(255, 255, 255, 0.2) 0deg,
			transparent 80deg
		);
	}
</style>
