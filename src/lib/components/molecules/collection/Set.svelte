<script lang="ts">
	import { onMount } from 'svelte';

	import { filterByRarity } from '$lib/collectibles';
	import { newItem } from '$lib/stores';
	import type { Collectible } from '$lib/types';

	import SetIndicator from '$atoms/collection/SetIndicator.svelte';
	import Card from '$atoms/collection/Card.svelte';

	export let set: string;
	export let items: Collectible[];

	$: itemBlue = filterByRarity(items, 'blue')[0];
	$: itemBronze = filterByRarity(items, 'bronze')[0];
	$: itemSilver = filterByRarity(items, 'silver')[0];
	$: itemGold = filterByRarity(items, 'gold')[0];

	$: discoveredItems = items.reduce((sum, item) => (item.count ?? 0) + sum, 0);
	$: newItemInSet = items.some((item) => item.name === $newItem);
	$: newlyDiscovered =
		discoveredItems == 1 &&
		newItemInSet &&
		items.filter((item) => item.name === $newItem)[0].count == 1;
	$: discovered = items.reduce((sum, item) => (item.count ?? 0) + sum, 0) > 0;

	// This switch triggers an update (and hence a transition) after the first render
	let toggle = false;
	onMount(() => {
		setTimeout(() => {
			toggle = true;
		}, 0);
		// This timeout ensures that the reveal only happens once
		setTimeout(() => {
			newItem.set('');
		}, 5000);
	});
</script>

<div class="relative mx-auto mb-2 flex h-20 w-full items-center">
	{#if newlyDiscovered}
		<div
			class="absolute flex {toggle ? 'opacity-0' : 'opacity-100'} transition-opacity duration-2000"
		>
			<p class="flex h-16 w-16 items-center justify-center text-gray-400/50">?</p>
			<div class="w-72 px-2">
				<p
					class=" flex h-16 items-center justify-center rounded-lg border border-gray-400/30 text-gray-400/50"
				>
					Undiscovered Set
				</p>
			</div>
		</div>
		<div
			class="absolute flex {toggle
				? 'opacity-100'
				: 'opacity-0'} transition-opacity delay-2000 duration-2000"
		>
			<SetIndicator {set} />
			<div class="flex w-72">
				<Card item={itemBlue} />
				<Card item={itemBronze} />
				<Card item={itemSilver} />
				<Card item={itemGold} />
			</div>
		</div>
	{:else if discovered}
		<SetIndicator {set} />
		<div class="flex w-72">
			<Card item={itemBlue} />
			<Card item={itemBronze} />
			<Card item={itemSilver} />
			<Card item={itemGold} />
		</div>
	{:else}
		<p class="flex h-16 w-16 items-center justify-center text-gray-400/50">?</p>
		<div class="w-72 px-2">
			<p
				class=" flex h-16 items-center justify-center rounded-lg border border-gray-400/30 text-gray-400/50"
			>
				Undiscovered Set
			</p>
		</div>
	{/if}
</div>
