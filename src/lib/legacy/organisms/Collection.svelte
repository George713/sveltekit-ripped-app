<script lang="ts">
	import MinimizeBtn from '$atoms/MinimizeBtn.svelte';
	import Header from '$lib/legacy/atoms/collection/Header.svelte';

	import Sets from '$lib/legacy/molecules/collection/Sets.svelte';

	import Background from '$overlays/Background.svelte';
</script>

<Background opacity={90}>
	<Header header={'Collection'} />
	<Sets />
	<MinimizeBtn viewTarget="none" />
</Background>
