<script lang="ts">
	import { visibleOverlay } from '$lib/stores';
	import type { ComponentProps } from 'svelte';

	let { children, opacity = 70, classAddons = '' }: ComponentProps<any> = $props();
</script>

<div
	class="fixed left-0 top-0 z-20 h-full w-full bg-black bg-opacity-{opacity} flex flex-col backdrop-blur-sm {classAddons}"
	role="button"
	tabindex={0}
	onclick={() => visibleOverlay.set('none')}
	onkeydown={() => visibleOverlay.set('none')}
>
	{@render children()}
</div>
