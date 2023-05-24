<script lang="ts">
	export let type: string = 'bright';
	export let id: number;
	export let itemName: string;
	export let kcal: number;
	export let protein: number;
	export let portionUnit: string;
	export let portionSize: number;
</script>

<!-- Outer Frame -->
<div
	class="relative w-[90px] h-[100px] border {type === 'dark'
		? 'border-neutral-500'
		: 'border-neutral-200'} shadow-[0.5px_0.5px_1.5px_rgba(0,0,0,0.1)] rounded-md overflow-hidden"
>
	<!-- Image Overlay -->
	<div class="absolute w-full h-[60px] bg-black opacity-30 rounded-b" />
	<!-- Image -->
	<img
		src={`https://ripped-images-bucket.s3.eu-central-1.amazonaws.com/foodItem_${id}`}
		alt="imgUrl"
		style="width:100%;height:60px;"
		class="rounded-b"
	/>
	<!-- Image Icon: Plus -->
	{#if type === 'dark'}
		<svg class="absolute top-0 right-0 h-5 w-5 stroke-neutral-200/80 fill-none" viewBox="0 0 24 24">
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="1"
				d="M12 8v8m-4-4h2m6 0h-4m-8 4a4 4 0 0 0 4 4h8a4 4 0 0 0 4-4V8a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v4"
			/>
		</svg>
	{:else}
		<svg class="absolute top-0.5 right-1 h-3 fill-neutral-200/50" viewBox="0 0 24 24">
			<path
				fill-rule="evenodd"
				d="M6.31 3.544A4 4 0 0 1 9.467 2H21c.836 0 1.61.375 2.161.995A3.4 3.4 0 0 1 24 5.25v13.5a3.4 3.4 0 0 1-.839 2.255A2.894 2.894 0 0 1 21 22H9.467a4 4 0 0 1-3.157-1.544L.688 13.228a2 2 0 0 1 0-2.456L6.31 3.544Zm3.94 3.499a1 1 0 0 1 1.414 0l2.828 2.828 2.829-2.828a1 1 0 0 1 1.414 0l.707.707a1 1 0 0 1 0 1.414l-2.828 2.829 2.828 2.828a1 1 0 0 1 0 1.414l-.707.707a1 1 0 0 1-1.414 0l-2.829-2.828-2.828 2.828a1 1 0 0 1-1.414 0l-.707-.707a1 1 0 0 1 0-1.414l2.828-2.828-2.828-2.829a1 1 0 0 1 0-1.414l.707-.707Z"
			/>
		</svg>
	{/if}
	<!-- Image Icon: Edit -->
	<svg
		class="absolute bottom-[calc(40px)] left-[calc(2px)] h-4 w-4 stroke-neutral-200/70 fill-none"
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
	<p
		class="text-[9px] font-medium pl-1 pt-1 {type === 'dark'
			? 'text-neutral-200'
			: 'text-neutral-500'}"
	>
		{itemName}
	</p>
	<div class="flex {type === 'dark' ? 'text-neutral-200' : 'text-neutral-500'}">
		<!-- Portion -->
		<p class="px-2 mt-[3px] text-[8px] flex-auto">{portionSize} {portionUnit}</p>
		<!-- Calories & Protein-->
		<div class="flex flex-col pr-1 mt-[-2px] text-right font-light">
			<p class="text-[8px]">kcal: {kcal}</p>
			<p class="text-[8px] mt-[-3px]">protein: {protein}g</p>
		</div>
	</div>
</div>
