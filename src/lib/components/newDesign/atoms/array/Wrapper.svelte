<script lang="ts">
	import { innerWidth } from 'svelte/reactivity/window';
	import type { Snippet } from 'svelte';

	let { children } = $props();
</script>

<!-- overflow-hidden:
	Prevents overflow of content from children to cause expansion of this parent.
	Padding ensures that the drop-shadow of the children remains visible.
-->
<div
	class={{
		'flex h-full flex-col overflow-hidden p-2': true,
		'w-[418px]': (innerWidth.current as number) >= 415,
		'w-[326px]': (innerWidth.current as number) < 415,
		'mt-5': (innerWidth.current as number) <= 390,
		'mt-8': (innerWidth.current as number) > 390 && (innerWidth.current as number) < 430,
		'mt-2': (innerWidth.current as number) >= 430
	}}
>
	{@render children?.()}
</div>
