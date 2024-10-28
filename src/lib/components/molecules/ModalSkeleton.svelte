<script lang="ts">
	import { visibleView } from '$lib/stores';

	import type { ComponentProps } from 'svelte';

	let { children }: ComponentProps<any> = $props();
</script>

<div
	class="fixed top-0 h-full w-full bg-black bg-opacity-70"
	role="button"
	tabindex={0}
	on:click|self={() => visibleView.update('none')}
	on:keydown|self={() => visibleView.update('none')}
>
	<div
		class="absolute bottom-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 transform rounded-md bg-slate-200 px-5 py-2"
	>
		{@render children()}
	</div>
</div>
