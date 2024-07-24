<script lang="ts">
	import { foodLibrary, plannedItems } from '$lib/stores';

	import ItemCard from '$atoms/ItemCard.svelte';
	import TargetTracker from '$atoms/TargetTracker.svelte';
	import PlannerCardTitle from '$atoms/planner/PlannerCardTitle.svelte';

	export let title: string;

	const removeFromPlannedItems = (id: number) => {
		plannedItems.remove(id);
	};
</script>

<div
	class="mb-1 h-[252px] w-[calc(100%-8px)] rounded-sm bg-neutral-100 shadow-[0_1px_1px_rgba(0,0,0,0.25)]"
>
	<div class="m-1 flex justify-between">
		<PlannerCardTitle {title} color="neutral-500" />
		<TargetTracker planningMode={true} />
	</div>
	<div class="scrollbar-hide mt-1 flex h-[210px] flex-col flex-wrap gap-1 overflow-x-auto px-1.5">
		{#each $plannedItems as { id, foodId, unitIsPtn, unitAmount }}
			<ItemCard
				type="bright"
				{id}
				{foodId}
				itemName={foodLibrary.getItemNameByIndex(foodId)}
				kcal={foodLibrary.getKcalByIndex(foodId, unitIsPtn, unitAmount)}
				protein={foodLibrary.getProteinByIndex(foodId, unitIsPtn, unitAmount)}
				{unitIsPtn}
				{unitAmount}
				{removeFromPlannedItems}
			/>
		{/each}
	</div>
</div>
