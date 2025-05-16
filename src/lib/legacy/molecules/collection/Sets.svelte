<script lang="ts">
	import { page } from '$app/stores';
	import CollectionSet from '$lib/legacy/molecules/collection/Set.svelte';
	import { collectibles, filterBySet } from '$lib/legacy/collectibles';
	import type { Collectible } from '$lib/types';
	import { collectiblesStore, newItem } from '$lib/stores';

	const uniqueSets = new Set(collectibles.map((collectible) => collectible.set));

	collectiblesStore.set(
		collectibles.map((collectible) => {
			const userCollectible = $page.data.user.collection.find(
				(uc: Collectible) => uc.name === collectible.name
			);
			return {
				...collectible,
				count: userCollectible ? userCollectible.count : 0,
				animate: $newItem === collectible.name ? true : false
			};
		})
	);
</script>

{#each uniqueSets as set}
	<CollectionSet {set} items={filterBySet($collectiblesStore, set)} />
{/each}
