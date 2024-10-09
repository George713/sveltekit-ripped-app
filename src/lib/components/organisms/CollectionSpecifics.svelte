<script lang="ts">
	import MinimizeBtn from '$atoms/MinimizeBtn.svelte';
	import Header from '$atoms/collection/Header.svelte';
	import { detailedCollectible } from '$lib/stores';

	import Collectible from '$molecules/collection/Collectible.svelte';

	import Background from '$overlays/Background.svelte';

	const capitalizeFirstLetter = (str: string) => {
		return str.charAt(0).toUpperCase() + str.slice(1);
	};
</script>

<Background opacity={90}>
	<Header header={'Collection > ' + capitalizeFirstLetter($detailedCollectible.set)} />
	<Collectible />
	<MinimizeBtn viewTarget="collection" />
</Background>
