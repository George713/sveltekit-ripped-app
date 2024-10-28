<!-- CardExtension.svelte -->
<script lang="ts">
	import type { ComponentProps } from 'svelte';

	let { children }: ComponentProps<any> = $props();
</script>

<div
	class="w-[234px] rounded-b-md border-2 border-t-0 border-neutral-500 pb-2 pt-1 shadow-[0.5px_0.5px_2px_rgba(0,0,0,0.3)]"
>
	{@render children()}
</div>
