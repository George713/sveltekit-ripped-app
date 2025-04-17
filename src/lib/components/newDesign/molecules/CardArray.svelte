<script lang="ts">
	import { deserialize } from '$app/forms';
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import {
		SelectionManager,
		FoodItemManager,
		FoodSetManager,
		PlannedItemManager,
		estimatedItemManager,
		visibilityManager
	} from '$lib/stateManagers.svelte';
	import type { DailySelectionItem, FoodItem, FoodSet, PlannedItem } from '$lib/types';
	import { PressHandler } from '$lib/utils.svelte';
	import Card from '../atoms/Card.svelte';

	interface Props {
		itemManager: FoodItemManager | FoodSetManager | SelectionManager | PlannedItemManager;
		theme: 'light' | 'dark';
		selectionManager?: SelectionManager | PlannedItemManager;
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

	const currentPath = $state(page.url.pathname);
	let itemManagerType = $derived(itemManager.classname);
	let selectionManagerType = $derived(selectionManager?.classname);

	const pressHandlerItem = new PressHandler({
		longPress: (id: string | number) => goto(`/item?origin=${currentPath}&foodId=${id}`),
		pressDuration: 1000
	});

	const pressHandlerSet = new PressHandler({
		longPress: (id: string | number) => goto(`/set?setId=${id}`),
		pressDuration: 1000
	});
</script>

<div
	class={{
		'scrollbar-hide flex flex-wrap gap-1.5 py-2': true,
		'mx-2 mb-3 grow content-start justify-center overflow-y-auto': verticalScroll,
		'mr-[3px] ml-2 h-58 flex-col overflow-x-auto pr-2': !verticalScroll
	}}
>
	{#if showNewElementCard}
		<Card
			name={itemManagerType === 'FoodSetManager' ? 'New Set' : 'New Item'}
			{theme}
			type="newElement"
			onclick={() =>
				goto(itemManagerType === 'FoodSetManager' ? '/set' : `/item?origin=${currentPath}`)}
		/>
	{/if}
	{#if itemManagerType === 'FoodItemManager'}
		{#each itemManager.items as item}
			<Card
				imgSrc={`https://cdswqmabrloxyfswpggl.supabase.co/storage/v1/object/public/foodItems/foodItem_${item.id}`}
				name={(item as FoodItem).itemName}
				kcal={(item as FoodItem).kcal}
				protein={(item as FoodItem).protein}
				{theme}
				type="item"
				onclick={async () => {
					// Only trigger click if not triggered by long press
					if (selectionManagerType === 'SelectionManager') {
						(selectionManager as SelectionManager).addFoodItem(item.id);
					} else if (selectionManager && selectionManagerType === 'PlannedItemManager') {
						visibilityManager.toggleSpinnerOverlay();

						const formData = new FormData();
						formData.append(
							'item',
							JSON.stringify({
								foodId: item.id,
								unitIsPtn: true,
								unitAmount: (item as FoodItem).unitAmount
							})
						);

						const response = await fetch('?/addToLog', {
							method: 'POST',
							body: formData
						});

						const result = deserialize(await response.text());

						if (result.type === 'success' && result.data) {
							(selectionManager as PlannedItemManager).items = [
								...(selectionManager as PlannedItemManager).items,
								result.data.item as PlannedItem
							];
						}

						visibilityManager.toggleSpinnerOverlay();
						goto('/log');
					}
				}}
				ontouchstart={() => pressHandlerItem.handleTouchDown(item.id)}
				ontouchend={pressHandlerItem.handleTouchUp}
			/>
		{/each}
	{/if}
	{#if itemManagerType === 'SelectionManager'}
		{#each itemManager.items as item}
			<Card
				imgSrc={`https://cdswqmabrloxyfswpggl.supabase.co/storage/v1/object/public/foodItems/foodItem_${(item as DailySelectionItem).foodId}`}
				name={(item as DailySelectionItem).itemName}
				kcal={(item as DailySelectionItem).kcal}
				protein={(item as DailySelectionItem).protein}
				{theme}
				type="item"
				onclick={() => (selectionManager as SelectionManager)?.remove(item.id)}
			/>
		{/each}
	{/if}
	{#if itemManagerType === 'FoodSetManager'}
		{#each itemManager.items as item}
			<Card
				imgSrc={(itemManager as FoodSetManager).getImages(item as FoodSet)}
				name={(item as FoodSet).name}
				kcal={(itemManager as FoodSetManager).getKcal(item as FoodSet)}
				protein={(itemManager as FoodSetManager).getProtein(item as FoodSet)}
				{theme}
				type="item"
				onclick={() => (selectionManager as SelectionManager)?.addFoodSet(item as FoodSet)}
				ontouchstart={() => pressHandlerSet.handleTouchDown(item.id)}
				ontouchend={pressHandlerSet.handleTouchUp}
			/>
		{/each}
	{/if}
	<!-- Visible only on log route -->
	{#if itemManagerType === 'PlannedItemManager'}
		{#each (itemManager as PlannedItemManager).getEnrichedItems() as item}
			<Card
				imgSrc={`https://cdswqmabrloxyfswpggl.supabase.co/storage/v1/object/public/foodItems/foodItem_${item.foodId}`}
				name={item.name}
				kcal={item.kcal}
				protein={item.protein}
				eaten={item.eaten}
				{theme}
				type="item"
				onclick={async () => {
					if (item.eaten) {
						return;
					}

					(itemManager as PlannedItemManager).eatItem(item.id, item.kcal);

					const formData = new FormData();
					formData.append('id', item.id.toString());
					formData.append('type', 'planned');
					fetch('?/eatItem', {
						method: 'POST',
						body: formData
					});
				}}
			/>
		{/each}
		<!-- Also display estimates as plannedItems are only shown on the log route -->
		{#each estimatedItemManager.items as item}
			<Card
				name="Estimate"
				kcal={item.kcal}
				protein={item.protein}
				eaten={item.eaten}
				{theme}
				type="item"
				onclick={async () => {
					if (item.eaten) {
						return;
					}

					estimatedItemManager.eatItem(item.id, item.kcal);

					const formData = new FormData();
					formData.append('id', item.id.toString());
					formData.append('type', 'estimate');
					fetch('?/eatItem', {
						method: 'POST',
						body: formData
					});
				}}
			/>
		{/each}
	{/if}
</div>
