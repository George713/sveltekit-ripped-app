<script lang="ts">
	import { selectContent, focusElement } from '$lib/utils';

	export let recordingResult;

	// Function to update the sumKcal and sumProtein
	const updateSum = () => {
		recordingResult.sumKcal = recordingResult.items.reduce(
			(sum: number, item: any) => sum + item.kcal,
			0
		);
		recordingResult.sumProtein = recordingResult.items.reduce(
			(sum: number, item: any) => sum + item.protein,
			0
		);
	};

	// Function to handle input changes
	const handleInputChange = (index: number, field: string, e: Event) => {
		const value = (e.target as HTMLInputElement).innerText;
		recordingResult.items[index][field] = Number(value);
		updateSum();
	};

	// Select kcal field if it's in `manual entry mode`
	// Note: condition for `manual entry mode` is not bulletproof
	const customFocusElement = (el: HTMLInputElement | HTMLParagraphElement) => {
		const { kcal, protein } = recordingResult.items[0];
		if (kcal == 0 && protein == 0 && recordingResult.items.length == 1) {
			focusElement(el);
		}
	};
</script>

<div class="flex flex-col space-y-1">
	{#each recordingResult.items as item, index}
		<div
			class="mx-6 flex h-11 items-center justify-end rounded-lg border-2 border-white/10 font-thin text-white/90"
		>
			<p class="mx-2 basis-3 text-lg">{item.icon}</p>
			<p
				class="grow truncate text-sm focus:outline-hidden"
				contenteditable="true"
				on:focus={selectContent}
				on:input={(e) => handleInputChange(index, 'name', e)}
			>
				{item.name}
			</p>
			<div class="flex w-[82px] justify-end px-3 text-sm">
				<p
					class="whitespace-nowrap pr-1 focus:outline-hidden"
					contenteditable="true"
					on:focus={selectContent}
					use:customFocusElement
					on:input={(e) => handleInputChange(index, 'kcal', e)}
				>
					{item.kcal}
				</p>
				<p class="whitespace-nowrap">kcal</p>
			</div>

			<div class="flex w-[82px] justify-end pr-3 text-sm">
				<p
					class="whitespace-nowrap text-end focus:outline-hidden"
					contenteditable="true"
					on:focus={selectContent}
					on:input={(e) => handleInputChange(index, 'protein', e)}
				>
					{item.protein}
				</p>
				<p class="whitespace-nowrap text-end">g protein</p>
			</div>
		</div>
	{/each}
</div>
<div class="mx-6 flex h-14 justify-end pr-2 text-white/90">
	<p>{recordingResult.sumKcal} kcal</p>
	<p class="px-2 text-white/50">|</p>
	<p>{recordingResult.sumProtein}g protein</p>
</div>
