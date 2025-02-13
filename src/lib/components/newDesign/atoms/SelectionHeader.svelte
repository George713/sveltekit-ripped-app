<script lang="ts">
	import Book from '../icons/Book.svelte';
	import Cutlery from '../icons/Cutlery.svelte';

	interface Props {
		icon: 'book' | 'cutlery';
		text: string;
	}

	let { icon, text }: Props = $props();
</script>

{#snippet symbol(variant: 'book' | 'cutlery')}
	{#if variant === 'book'}
		<Book scale={0.5} fill="fill-stone-400" />
	{:else if variant === 'cutlery'}
		<Cutlery scale={0.6} fill="fill-stone-400" />
	{/if}
{/snippet}

<div class="flex items-center space-x-1.5">
	{@render symbol(icon)}
	<p class="font-medium text-stone-400">{text}</p>
</div>
