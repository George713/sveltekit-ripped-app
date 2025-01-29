<script lang="ts">
	import PotentialToasts from '$lib/components/newDesign/molecules/PotentialToasts.svelte';

	let { children } = $props();
</script>

<div class="flex h-screen w-screen flex-col bg-linear-to-br from-stone-900 to-stone-800">
	<PotentialToasts />
	{@render children?.()}
</div>
