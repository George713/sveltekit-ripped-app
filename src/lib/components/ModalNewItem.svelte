<script lang="ts">
	import { items } from '$lib/utils/dummyItems.js';
	import ItemCard from '$lib/components/ItemCard.svelte';
	import TargetTracker from '$lib/components/TargetTracker.svelte';

	export let toggleModal: (modal: string) => void;

	const name = 'Banana';
	const calories = 123;
	const protein = 5;
	const portionUnit = 'ptn';
	const portionSize = 1;
</script>

<div class="absolute inset-0 w-full h-full bg-black bg-opacity-70">
	<div
		class="absolute bottom-1 left-0.5 w-[calc(100%-4px)] h-[calc(96%)] rounded-lg bg-neutral-600 border-[1px] border-neutral-500 flex flex-col items-center"
	>
		<!-- Title: Planner -->
		<p class="relative top-2 text-2xl font-semibold text-gray-200">New Item</p>

		<!-- Card -->
		<div
			class="relative top-12 w-[180px] h-[200px] border border-neutral-500
				 shadow-[0.5px_0.5px_1.5px_rgba(0,0,0,0.1)] rounded-md overflow-hidden"
		>
			<!-- Image Overlay -->
			<div class="absolute w-full h-[120px] bg-black opacity-30 rounded-b" />
			<!-- Image -->
			<div class="w-full h-[calc(60%)] rounded-b" />
			<!-- Image Icon: Plus -->
			<svg
				class="absolute top-0 right-0 h-5 w-5 stroke-neutral-200/80 fill-none"
				viewBox="0 0 24 24"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="1"
					d="M12 8v8m-4-4h2m6 0h-4m-8 4a4 4 0 0 0 4 4h8a4 4 0 0 0 4-4V8a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v4"
				/>
			</svg>
			<!-- Image Icon: Edit -->
			<svg
				class="absolute bottom-[calc(80px)] left-[calc(4px)] h-4 w-4 stroke-neutral-200/70 fill-none"
				viewBox="0 0 24 24"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="1"
					d="M12 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-6M9 15v-2.5l8.75-8.75c.69-.69 1.81-.69 2.5 0v0c.69.69.69 1.81 0 2.5L15.5 11l-4 4H9Z"
				/>
			</svg>
			<!-- Item Name -->
			<p class="text-[18px] font-medium pl-1 pt-1 text-neutral-200">
				{name}
			</p>
			<div class="flex text-neutral-200">
				<!-- Portion -->
				<p class="px-2 mt-[10px] text-[16px] flex-auto  ">{portionSize} {portionUnit}</p>
				<!-- Calories & Protein-->
				<div class="flex flex-col pr-1 text-right font-light">
					<p class="text-[16px] ">kcal: {calories}</p>
					<p class="text-[16px] mt-[-3px] ">protein: {protein}g</p>
				</div>
			</div>
		</div>

		<!-- Minimize Symbol -->
		<button
			on:click={() => {
				toggleModal('planner');
			}}
			class="absolute bottom-3"
		>
			<svg width="31" height="18" class=" fill-none stroke-neutral-500"
				><path
					stroke-linecap="round"
					stroke-width="3"
					d="m2 2 13.066 6.291a1 1 0 0 0 .868 0L29 2M2 9.5l13.066 6.291a1 1 0 0 0 .868 0L29 9.5"
				/>
			</svg>
		</button>
	</div>
</div>
