<script lang="ts">
	import { visibleOverlay, visibleView } from '$lib/stores';
	import type { Snippet } from 'svelte';

	interface Props {
		opacity?: number;
		classAddons?: string;
		children: Snippet;
	}

	let { opacity = 70, classAddons = '', children }: Props = $props();
	let el: HTMLDivElement;

	const dontPassToChildren = (fn: () => void) => (event: MouseEvent | KeyboardEvent) => {
		if (event.target === el) {
			fn();
		}
	};

	const returnToMain = () => {
		visibleOverlay.set('none');
		visibleView.update('none');
	};
</script>

<div
	class="fixed left-0 top-0 z-20 h-full w-full bg-black bg-opacity-{opacity} flex flex-col backdrop-blur-xs {classAddons}"
	role="button"
	tabindex={0}
	bind:this={el}
	onclick={dontPassToChildren(returnToMain)}
	onkeydown={dontPassToChildren(returnToMain)}
>
	{@render children?.()}
</div>
