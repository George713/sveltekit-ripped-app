<script lang="ts">
	import { goto } from '$app/navigation';
	import type { DailySelectionItem, FoodItem } from '$lib/types';
	import Card from '../atoms/Card.svelte';
	import CardAddElement from '../atoms/CardAddElement.svelte';

	interface Props {
		items: FoodItem[] | DailySelectionItem[];
		theme: 'light' | 'dark';
		clickMode: 'addToDailySelection' | 'removeFromDailySelection';
		verticalScroll?: boolean;
	}

	let { items, theme, clickMode, verticalScroll = false }: Props = $props();
</script>

<div
	class={{
		'scrollbar-hide ml-2 flex flex-wrap gap-1.5 overflow-visible py-2 pr-2': true,
		'h-1 grow content-start justify-center overflow-y-auto': verticalScroll,
		'h-58 flex-col overflow-x-auto': !verticalScroll
	}}
>
	{#if clickMode === 'addToDailySelection'}
		<CardAddElement text="New Item" onclick={() => goto('/newItem')} />
	{/if}
	{#each items as item}
		<Card {item} {theme} {clickMode} />
	{/each}
</div>
