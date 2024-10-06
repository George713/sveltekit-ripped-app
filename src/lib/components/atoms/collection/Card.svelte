<script lang="ts">
	import type { Collectible } from '$lib/types';

	export let item: Collectible;
</script>

<div
	class="m-1 border-opacity-40 {item.rarity === 'bronze'
		? 'border-bronze'
		: item.rarity === 'silver'
			? 'border-silver'
			: item.rarity === 'gold'
				? 'border-gold'
				: 'border-blue-600'} relative flex h-20 w-16 items-center justify-center rounded border-2 text-gray-400"
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
