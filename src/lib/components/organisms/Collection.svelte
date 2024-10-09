<script lang="ts">
	import MinimizeBtn from '$atoms/MinimizeBtn.svelte';
	import Header from '$atoms/collection/Header.svelte';

	import Sets from '$molecules/collection/Sets.svelte';

	import Background from '$overlays/Background.svelte';
</script>

<Background opacity={90}>
	<Header />
	<Sets />
	<MinimizeBtn viewTarget="none" />
</Background>
