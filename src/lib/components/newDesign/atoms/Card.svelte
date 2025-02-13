<script lang="ts">
	import type { FoodItem } from '$lib/types';

	interface Props {
		item: FoodItem;
		theme: 'light' | 'dark';
	}

	let { item, theme }: Props = $props();

	let imgSrc = $derived(
		item.id
			? `https://cdswqmabrloxyfswpggl.supabase.co/storage/v1/object/public/foodItems/foodItem_${item.id}`
			: 'https://placehold.co/90x60?text=Estimate&font=roboto'
	);
</script>

{#snippet cardDetail(text: string, value: number, unit: string)}
	<div class="flex flex-col items-center justify-center space-y-[-1px]">
		<p class="text-[8px] text-stone-600">{text}</p>
		<p class="text-[10px] text-stone-800">{value < 10 ? value.toFixed(1) : value} {unit}</p>
	</div>
{/snippet}

<!-- Outer Card Frame -->
<div
	class="h-[105px] w-[90px] overflow-visible rounded bg-stone-400 p-[1px] drop-shadow-[2px_2px_2px_rgba(0,0,0,0.3)]"
>
	<!-- Image with darkened overlay -->
	<div class="relative h-[62px] w-[88px] overflow-hidden rounded">
		<img src={imgSrc} alt="imgUrl" class="absolute h-full w-full object-cover" />
		<div class="absolute inset-0 bg-black/25"></div>
	</div>
	<!-- Info Part -->
	<div class="mt-0.5 flex flex-col justify-center space-y-[-2px] px-1">
		<!-- Title -->
		<p class="truncate text-[10px] text-stone-800">{item.itemName}</p>
		<!-- Info -->
		<div class="flex items-center justify-center space-x-[10px] pl-[5px]">
			{@render cardDetail('kcal', item.kcal, '')}
			{@render cardDetail('Protein', item.protein, 'g')}
		</div>
	</div>
</div>
