<script lang="ts">
	import { goto } from '$app/navigation';
	import { dailySelectionManager, foodSetManager } from '$lib/stateManagers.svelte';
	import type { DailySelectionItem, FoodItem, FoodSet } from '$lib/types';
	import Card from '../atoms/Card.svelte';

	interface Props {
		items: FoodItem[] | DailySelectionItem[] | FoodSet[];
		itemType: 'foodItems' | 'dailySelection' | 'foodSets';
		theme: 'light' | 'dark';
		showNewElementCard?: boolean;
		verticalScroll?: boolean;
	}

	let {
		items,
		itemType,
		theme,
		showNewElementCard = false,
		verticalScroll = false
	}: Props = $props();
</script>

<div
	class={{
		'scrollbar-hide ml-2 flex flex-wrap gap-1.5 overflow-visible py-2 pr-2': true,
		'h-1 grow content-start justify-center overflow-y-auto': verticalScroll,
		'h-58 flex-col overflow-x-auto': !verticalScroll
	}}
>
	{#if showNewElementCard}
		<Card
			name={itemType === 'foodSets' ? 'New Set' : 'New Item'}
			{theme}
			type="newElement"
			onclick={() => goto(itemType === 'foodSets' ? '/newSet' : '/newItem')}
		/>
	{/if}
	{#if itemType === 'foodItems'}
		{#each items as item}
			<Card
				imgSrc={`https://cdswqmabrloxyfswpggl.supabase.co/storage/v1/object/public/foodItems/foodItem_${item.id}`}
				name={(item as FoodItem).itemName}
				kcal={(item as FoodItem).kcal}
				protein={(item as FoodItem).protein}
				{theme}
				type="item"
				onclick={() => dailySelectionManager.addFoodItem(item.id)}
			/>
		{/each}
	{:else if itemType === 'dailySelection'}
		{#each items as item}
			<Card
				imgSrc={`https://cdswqmabrloxyfswpggl.supabase.co/storage/v1/object/public/foodItems/foodItem_${(item as DailySelectionItem).foodId}`}
				name={(item as DailySelectionItem).itemName}
				kcal={(item as DailySelectionItem).kcal}
				protein={(item as DailySelectionItem).protein}
				{theme}
				type="item"
				onclick={() => dailySelectionManager.remove(item.id)}
			/>
		{/each}
	{:else if itemType === 'foodSets'}
		{#each items as item}
			<Card
				imgSrc={foodSetManager.getImages(item as FoodSet)}
				name={(item as FoodSet).name}
				kcal={foodSetManager.getKcal(item as FoodSet)}
				protein={foodSetManager.getProtein(item as FoodSet)}
				{theme}
				type="item"
				onclick={() => dailySelectionManager.addFoodSet(item as FoodSet)}
			/>
		{/each}
	{/if}
</div>
