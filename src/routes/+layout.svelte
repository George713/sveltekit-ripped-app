<script lang="ts">
	import '../app.css';
	import { page } from '$app/state';
	import { PUBLIC_ONMOBILE } from '$env/static/public';

	// Overlays
	import PwaInstallPrompt from '$overlays/PwaInstallPrompt.svelte';

	let { children } = $props();

	// Check if we're on the root path
	let isRootPath = $derived(page.url.pathname === '/');
</script>

{@render children?.()}
{#if isRootPath && PUBLIC_ONMOBILE === 'TRUE'}
	<PwaInstallPrompt />
{/if}
