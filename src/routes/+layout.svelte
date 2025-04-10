<script lang="ts">
	import '../app.css';
	import { page } from '$app/stores';
	import PwaInstallPrompt from '$lib/components/newDesign/overlays/PwaInstallPrompt.svelte';

	let { children } = $props();

	// Check if we're on the root path
	let isRootPath = $derived($page.url.pathname === '/');
</script>

<div class="flex h-screen w-screen flex-col bg-linear-to-br/oklch from-stone-900 to-stone-800">
	{@render children?.()}

	{#if isRootPath}
		<PwaInstallPrompt />
	{/if}
</div>
