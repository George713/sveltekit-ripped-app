<script lang="ts">
	import { visibleOverlay } from '$lib/stores';
</script>

<div
	class="absolute z-20 top-0 h-full w-full bg-black bg-opacity-70 backdrop-blur-sm"
	role="button"
	tabindex={0}
	on:click|self={() => visibleOverlay.set('none')}
	on:keydown|self={() => visibleOverlay.set('none')}
>
	<slot />
</div>
