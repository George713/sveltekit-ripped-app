<script lang="ts">
	import type { ComponentProps } from 'svelte';

	let { children }: ComponentProps<any> = $props();
</script>

<div
	class="absolute bottom-1 left-0.5 flex h-[calc(96%)] w-[calc(100%-4px)] flex-col items-center rounded-lg border-2 border-slate-50 bg-gray-300"
>
	{@render children()}
</div>
