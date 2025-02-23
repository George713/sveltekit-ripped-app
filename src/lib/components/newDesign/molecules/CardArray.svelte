<script lang="ts">
	import { goto } from '$app/navigation';
	import { SelectionManager, FoodItemManager, FoodSetManager } from '$lib/stateManagers.svelte';
	import type { DailySelectionItem, FoodItem, FoodSet } from '$lib/types';
	import Card from '../atoms/Card.svelte';

	interface Props {
		itemManager: FoodItemManager | FoodSetManager | SelectionManager;
		selectionManager: SelectionManager;
		theme: 'light' | 'dark';
		showNewElementCard?: boolean;
		verticalScroll?: boolean;
	}

	let {
		itemManager,
		selectionManager,
		theme,
		showNewElementCard = false,
		verticalScroll = false
	}: Props = $props();

	// let managerType = $derived(itemManager.constructor.name);
	let managerType = $derived.by(() => {
		console.log(itemManager.constructor.name);
		return itemManager.constructor.name;
	});
</script>

<div
	class={{
		'scrollbar-hide mr-[3px] ml-2 flex flex-wrap gap-1.5 overflow-visible py-2 pr-2': true,
		'h-1 grow content-start justify-center overflow-y-auto': verticalScroll,
		'h-58 flex-col overflow-x-auto': !verticalScroll
	}}
>
	{#if showNewElementCard}
		<Card
			name={managerType === 'FoodSetManager' ? 'New Set' : 'New Item'}
			{theme}
			type="newElement"
			onclick={() => goto(managerType === 'FoodSetManager' ? '/newSet' : '/newItem')}
		/>
	{/if}
	{#if managerType === 'FoodItemManager'}
		{#each itemManager.items as item}
			<Card
				imgSrc={`https://cdswqmabrloxyfswpggl.supabase.co/storage/v1/object/public/foodItems/foodItem_${item.id}`}
				name={(item as FoodItem).itemName}
				kcal={(item as FoodItem).kcal}
				protein={(item as FoodItem).protein}
				{theme}
				type="item"
				onclick={() => selectionManager.addFoodItem(item.id)}
			/>
		{/each}
	{/if}
	{#if managerType === 'SelectionManager'}
		{#each itemManager.items as item}
			<Card
				imgSrc={`https://cdswqmabrloxyfswpggl.supabase.co/storage/v1/object/public/foodItems/foodItem_${(item as DailySelectionItem).foodId}`}
				name={(item as DailySelectionItem).itemName}
				kcal={(item as DailySelectionItem).kcal}
				protein={(item as DailySelectionItem).protein}
				{theme}
				type="item"
				onclick={() => selectionManager.remove(item.id)}
			/>
		{/each}
	{/if}
	{#if managerType === 'FoodSetManager'}
		{#each itemManager.items as item}
			<Card
				imgSrc={(itemManager as FoodSetManager).getImages(item as FoodSet)}
				name={(item as FoodSet).name}
				kcal={(itemManager as FoodSetManager).getKcal(item as FoodSet)}
				protein={(itemManager as FoodSetManager).getProtein(item as FoodSet)}
				{theme}
				type="item"
				onclick={() => selectionManager.addFoodSet(item as FoodSet)}
			/>
		{/each}
	{/if}
</div>
