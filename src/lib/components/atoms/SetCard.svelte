<script lang="ts">
	import { activeSetId, foodSets, plannedItems, selectedForNewSet, visibleView } from '$lib/stores';

	export let id: number;
	export let name: string;

	const addToPlanningProcess = () => {
		plannedItems.addFromSetById(id);
	};

	const editSet = () => {
		selectedForNewSet.set([]);
		selectedForNewSet.addFromSetById(id);
		activeSetId.set(id);
		visibleView.update('newSet');
	};
</script>

<!-- Outer Frame -->
<div
	class="relative h-[100px] w-[90px] overflow-hidden rounded-md border border-neutral-500 shadow-[0.5px_0.5px_1.5px_rgba(0,0,0,0.1)]"
>
	<!-- Image Overlay for slightly darking it -->
	<div class="absolute h-[60px] w-full rounded-b bg-black opacity-30" />
	<!-- Image -->
	<img
		src="https://placehold.co/90x60/orange/white?text={name}&font=roboto"
		alt="imgUrl"
		style="width:100%;height:60px;"
		class="rounded-b object-cover"
	/>
	<!-- Image Icon: Plus -->
	<button class="absolute right-0 top-0" on:click={() => addToPlanningProcess()}>
		<svg class="h-5 w-5 fill-none stroke-neutral-200/80" viewBox="0 0 24 24">
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="1"
				d="M12 8v8m-4-4h2m6 0h-4m-8 4a4 4 0 0 0 4 4h8a4 4 0 0 0 4-4V8a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v4"
			/>
		</svg>
	</button>
	<!-- Image Icon: Edit -->
	<button class="absolute bottom-[calc(40px)] left-[calc(2px)]" on:click={() => editSet()}>
		<svg class="h-4 w-4 fill-none stroke-neutral-200/70" viewBox="0 0 24 24">
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="1"
				d="M12 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-6M9 15v-2.5l8.75-8.75c.69-.69 1.81-.69 2.5 0v0c.69.69.69 1.81 0 2.5L15.5 11l-4 4H9Z"
			/>
		</svg>
	</button>
	<!-- Set Name -->
	<p class="truncate pl-1 pt-1 text-[9px] font-medium text-neutral-200">
		{name}
	</p>
	<!-- Calories & Protein-->
	<div class="mt-[-2px] flex flex-col pr-1 text-right font-light text-neutral-200">
		<p class="text-[8px]">kcal: {foodSets.totalKcalByIndex(id)}</p>
		<p class="mt-[-3px] text-[8px]">
			protein: {foodSets.totalProteinByIndex(id).toFixed(0)} g
		</p>
	</div>
</div>
