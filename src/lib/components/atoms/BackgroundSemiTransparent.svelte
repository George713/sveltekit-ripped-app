<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		onclick?: (e: Event) => void;
		classAddons?: string;
		children: Snippet;
	}
	let { onclick, classAddons = '', children }: Props = $props();
</script>

<button
	class="fixed top-0 left-0 h-full w-full bg-black/40 backdrop-blur-xs {classAddons}"
	{onclick}
>
	{@render children?.()}
</button>
