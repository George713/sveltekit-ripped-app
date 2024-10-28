<script lang="ts">
	import { visibleOverlay } from '$lib/stores';

	export let opacity = 70;
	export let classAddons = '';
</script>

<div
	class="fixed left-0 top-0 z-20 h-full w-full bg-black bg-opacity-{opacity} flex flex-col backdrop-blur-sm {classAddons}"
	role="button"
	tabindex={0}
	on:click|self={() => visibleOverlay.set('none')}
	on:keydown|self={() => visibleOverlay.set('none')}
>
	<slot />
</div>
