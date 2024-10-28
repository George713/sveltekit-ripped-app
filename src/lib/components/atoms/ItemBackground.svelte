<script lang="ts">
	import type { ComponentProps } from 'svelte';

	let { children }: ComponentProps<any> = $props();
</script>

<div
	class="absolute bottom-1 left-0.5 flex h-[calc(96%)] w-[calc(100%-4px)] flex-col items-center rounded-lg border-[2px] border-neutral-500 bg-neutral-600"
>
	{@render children()}
</div>
