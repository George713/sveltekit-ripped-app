<script lang="ts">
	import { carouselManager } from './state.svelte';

	interface Props {
		index: number;
		children?: any;
	}

	let { index, children }: Props = $props();
</script>

<div
	class={{
		'absolute scale-80 rounded-[6px] transition duration-500': true,
		'scale-150 border-2 border-indigo-600 opacity-80': carouselManager.selectedItemIndex === index, // when center
		'-translate-x-35 -rotate-y-35 opacity-30': carouselManager.selectedItemIndex - 1 === index, // when left by 1
		'-translate-x-45 -rotate-y-79 opacity-0': carouselManager.selectedItemIndex - 2 >= index, // when left by 2
		'translate-x-35 rotate-y-35 opacity-30': carouselManager.selectedItemIndex + 1 === index, // when right by 1
		'translate-x-45 rotate-y-79 opacity-0': carouselManager.selectedItemIndex + 2 <= index // when right by 2
	}}
>
	{@render children?.()}
</div>
