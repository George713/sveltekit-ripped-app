<script lang="ts">
	import SetIndicator from '$atoms/collection/SetIndicator.svelte';
	import Card from '$atoms/collection/Card.svelte';

	import { filterByRarity } from '$lib/collectibles';

	import type { Collectible } from '$lib/types';

	export let set: string;
	export let items: Collectible[];

	$: itemBlue = filterByRarity(items, 'blue')[0];
	$: itemBronze = filterByRarity(items, 'bronze')[0];
	$: itemSilver = filterByRarity(items, 'silver')[0];
	$: itemGold = filterByRarity(items, 'gold')[0];

	$: discovered = items.reduce((sum, item) => (item.count ?? 0) + sum, 0) > 0;
</script>

<div class="mx-auto my-1 flex">
	{#if discovered}
		<SetIndicator {set} />
		<Card item={itemBlue} />
		<Card item={itemBronze} />
		<Card item={itemSilver} />
		<Card item={itemGold} />
	{:else}
		<p class="my-2.5 flex h-16 w-16 items-center pl-6 text-gray-400/50">?</p>
		<p
			class="my-2.5 flex h-16 w-[276px] items-center justify-center rounded-lg border border-gray-400/30 text-gray-400/50"
		>
			Undiscovered Set
		</p>
	{/if}
</div>
