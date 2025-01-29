<script lang="ts">
	import PotentialToasts from '$lib/components/newDesign/molecules/PotentialToasts.svelte';

	let { children } = $props();
</script>

<div class="flex h-screen w-screen flex-col bg-stone-900">
	<PotentialToasts />
	{@render children?.()}
</div>
