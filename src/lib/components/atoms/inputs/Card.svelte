<!-- Card.svelte -->
<script lang="ts">
	import type { ComponentProps } from 'svelte';

	let { children }: ComponentProps<any> = $props();
</script>

<div
	class="relative mt-12 h-[260px] w-[234px] overflow-hidden rounded-md
		border-2 border-neutral-500 shadow-[0.5px_0.5px_2px_rgba(0,0,0,0.3)]"
>
	{@render children()}
</div>
