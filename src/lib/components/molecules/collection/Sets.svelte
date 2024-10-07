<script lang="ts">
	import { page } from '$app/stores';
	import CollectionSet from '$molecules/collection/Set.svelte';
	import { collectibles, filterBySet } from '$lib/collectibles';
	import type { Collectible } from '$lib/types';
	import { newItem } from '$lib/stores';

	const uniqueSets = new Set(collectibles.map((collectible) => collectible.set));

	const extendCollectiblesWithCount = collectibles.map((collectible) => {
		const userCollectible = $page.data.user.collection.find(
			(uc: Collectible) => uc.name === collectible.name
		);
		return {
			...collectible,
			count: userCollectible ? userCollectible.count : 0,
			animate: $newItem === collectible.name ? true : false
		};
	});
</script>

{#each uniqueSets as set}
	<CollectionSet {set} items={filterBySet(extendCollectiblesWithCount, set)} />
{/each}
