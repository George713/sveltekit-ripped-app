<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		color: 'light' | 'dark';
		children: Snippet;
	}

	let { color, children }: Props = $props();
</script>

<div
	class={{
		'flex w-full overflow-hidden rounded-[10px] shadow-[inset_-2px_-2px_4px_rgba(0,0,0,0.25),inset_2px_2px_2px_rgba(255,255,255,0.2)] drop-shadow-[2px_2px_4px_rgba(0,0,0,0.25)]': true,
		'light-gradient': color === 'light',
		'dark-gradient': color === 'dark'
	}}
>
	{@render children?.()}
</div>

<style>
	.light-gradient {
		background: linear-gradient(
			120deg,
			#57534e 0%,
			#736e68 25%,
			#57534e 50%,
			#736e68 75%,
			#57534e 100%
		);
	}

	/* stone-800: #292524, stone-700: #44403c */
	.dark-gradient {
		background: linear-gradient(
			120deg,
			#292524 0%,
			#35312f 25%,
			#292524 50%,
			#35312f 75%,
			#292524 100%
		);
	}
</style>
