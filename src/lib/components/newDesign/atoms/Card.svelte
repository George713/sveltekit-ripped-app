<script lang="ts">
	import { dailySelectionManager } from '$lib/stateManagers.svelte';
	import type { DailySelectionItem, FoodItem } from '$lib/types';

	interface Props {
		item: FoodItem | DailySelectionItem;
		theme: 'light' | 'dark';
		clickMode: 'addToDailySelection' | 'removeFromDailySelection';
	}

	let { item, theme, clickMode }: Props = $props();

	let imgSrc = $derived(
		'foodId' in item
			? `https://cdswqmabrloxyfswpggl.supabase.co/storage/v1/object/public/foodItems/foodItem_${item.foodId}`
			: item.id
				? `https://cdswqmabrloxyfswpggl.supabase.co/storage/v1/object/public/foodItems/foodItem_${item.id}`
				: 'https://placehold.co/90x60?text=Estimate&font=roboto'
	);

	const handleClick = (id: number) => {
		switch (clickMode) {
			case 'addToDailySelection':
				dailySelectionManager.add(id);
				break;
			case 'removeFromDailySelection':
				dailySelectionManager.remove(id);
				break;
		}
	};
</script>

{#snippet cardDetail(text: string, value: number, unit: string, theme: 'light' | 'dark')}
	<div class="flex flex-col items-center justify-center space-y-[-1px]">
		<p
			class={{
				'text-[8px]': true,
				'text-stone-600': theme === 'light',
				'text-stone-500': theme === 'dark'
			}}
		>
			{text}
		</p>
		<p
			class={{
				'text-[10px]': true,
				'text-stone-800': theme === 'light',
				'text-stone-300': theme === 'dark'
			}}
		>
			{value < 10 ? value.toFixed(1) : value.toFixed(0)}
			{unit}
		</p>
	</div>
{/snippet}

<!-- Outer Card Frame -->
<button
	onclick={() => handleClick(item.id)}
	class={{
		'h-[105px] w-[90px] overflow-visible rounded p-[1px] drop-shadow-[2px_2px_2px_rgba(0,0,0,0.3)]': true,
		'bg-stone-400': theme === 'light',
		'border border-stone-600 bg-stone-800': theme === 'dark'
	}}
>
	<!-- Image with darkened overlay -->
	<div
		class={{
			'relative h-[62px] overflow-hidden rounded': true,
			'w-[88px]': theme === 'light',
			'w-[86px]': theme === 'dark'
		}}
	>
		<img src={imgSrc} alt="imgUrl" class="absolute h-full w-full object-cover" />
		<div class="absolute inset-0 bg-black/25"></div>
	</div>
	<!-- Info Part -->
	<div class="mt-0.5 flex flex-col space-y-[-2px] px-1">
		<!-- Title -->
		<p
			class={{
				'truncate text-left text-[10px]': true,
				'text-stone-800': theme === 'light',
				'text-stone-300': theme === 'dark'
			}}
		>
			{item.itemName}
		</p>
		<!-- Info -->
		<div class="flex items-center justify-center space-x-[10px] pl-[5px]">
			{@render cardDetail('kcal', item.kcal, '', theme)}
			{@render cardDetail('Protein', item.protein, 'g', theme)}
		</div>
	</div>
</button>
