<script lang="ts">
	import { originItem, visibleView } from '$lib/stores';

	export let type: string = 'bright';
	export let id: number;
	export let foodId: number | undefined = undefined;
	export let itemName: string;
	export let kcal: number;
	export let protein: number;
	export let unitIsPtn: boolean;
	export let unitAmount: number;
	export let updateItem: (id: number) => void = () => {
		$originItem = id;
		visibleView.update('updateItem');
	};
	export let plusButton: () => void = () => {};
	export let removeFromPlannedItems: (id: number) => void = () => {};
	export let eatingMenu: boolean = false;
	export let eaten: boolean = false;
	export let eatItem: () => void = () => {};
</script>

<!-- Outer Frame -->
<div
	class="relative h-[100px] w-[90px] border {type === 'dark'
		? 'border-neutral-500'
		: 'border-neutral-200'} overflow-hidden rounded-md shadow-[0.5px_0.5px_1.5px_rgba(0,0,0,0.1)]"
>
	<!-- Overlay -->
	{#if eatingMenu}
		<div
			class="absolute z-10 h-[100px] w-[90px] {eaten
				? 'bg-black opacity-60'
				: ''} flex justify-center"
			role="button"
			tabindex={0}
			on:click={() => {
				if (!eaten) {
					eatItem();
				}
			}}
			on:keydown={() => {
				if (!eaten) {
					eatItem();
				}
			}}
		>
			{#if eaten}
				<span class="mt-5 text-white">Eaten</span>
			{/if}
		</div>
	{/if}
	<!-- Image Overlay for slightly darking it -->
	<div class="absolute h-[60px] w-full rounded-b bg-black opacity-30"></div>
	<!-- Image -->
	<img
		src={foodId
			? `https://cdswqmabrloxyfswpggl.supabase.co/storage/v1/object/public/foodItems/foodItem_${foodId}`
			: 'https://placehold.co/90x60?text=Estimate&font=roboto'}
		alt="imgUrl"
		style="width:100%;height:60px;"
		class="rounded-b object-cover"
	/>
	<!-- Image Icon: Adding/removing Item -->
	{#if type === 'dark'}
		<!-- Adding Item -->
		<button
			class="absolute right-0 top-0"
			on:click={() => {
				plusButton();
			}}
			aria-label="Add item"
		>
			<svg class="h-5 w-5 fill-none stroke-neutral-200/80" viewBox="0 0 24 24">
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="1"
					d="M12 8v8m-4-4h2m6 0h-4m-8 4a4 4 0 0 0 4 4h8a4 4 0 0 0 4-4V8a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v4"
				/>
			</svg>
		</button>
	{:else if type === 'bright' && !eatingMenu}
		<!-- Removing Item -->
		<button
			class="absolute right-1 top-0.5"
			on:click={() => removeFromPlannedItems(id)}
			aria-label="Remove item"
		>
			<svg class="h-3 fill-neutral-200/50" viewBox="0 0 24 24">
				<path
					fill-rule="evenodd"
					d="M6.31 3.544A4 4 0 0 1 9.467 2H21c.836 0 1.61.375 2.161.995A3.4 3.4 0 0 1 24 5.25v13.5a3.4 3.4 0 0 1-.839 2.255A2.894 2.894 0 0 1 21 22H9.467a4 4 0 0 1-3.157-1.544L.688 13.228a2 2 0 0 1 0-2.456L6.31 3.544Zm3.94 3.499a1 1 0 0 1 1.414 0l2.828 2.828 2.829-2.828a1 1 0 0 1 1.414 0l.707.707a1 1 0 0 1 0 1.414l-2.828 2.829 2.828 2.828a1 1 0 0 1 0 1.414l-.707.707a1 1 0 0 1-1.414 0l-2.829-2.828-2.828 2.828a1 1 0 0 1-1.414 0l-.707-.707a1 1 0 0 1 0-1.414l2.828-2.828-2.828-2.829a1 1 0 0 1 0-1.414l.707-.707Z"
				/>
			</svg>
		</button>
	{/if}
	<!-- Image Icon: Edit -->
	{#if !eatingMenu}
		<button
			class="absolute bottom-[calc(40px)] left-[calc(2px)]"
			on:click={() => updateItem(id)}
			aria-label="Edit item"
		>
			<svg class="h-4 w-4 fill-none stroke-neutral-200/70" viewBox="0 0 24 24">
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="1"
					d="M12 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-6M9 15v-2.5l8.75-8.75c.69-.69 1.81-.69 2.5 0v0c.69.69.69 1.81 0 2.5L15.5 11l-4 4H9Z"
				/>
			</svg>
		</button>
	{/if}
	<!-- Item Name -->
	<p
		class="truncate pl-1 pt-1 text-[9px] font-medium {type === 'dark'
			? 'text-neutral-200'
			: 'text-neutral-500'}"
	>
		{itemName}
	</p>
	<div class="flex {type === 'dark' ? 'text-neutral-200' : 'text-neutral-500'}">
		<!-- Portion -->
		<p class="mt-[3px] flex-auto px-2 text-[8px]">{unitAmount} {unitIsPtn ? 'ptn' : 'g'}</p>
		<!-- Calories & Protein-->
		<div class="mt-[-2px] flex flex-col pr-1 text-right font-light">
			<p class="text-[8px]">kcal: {kcal}</p>
			<p class="mt-[-3px] text-[8px]">protein: {protein.toFixed(0)}g</p>
		</div>
	</div>
</div>
