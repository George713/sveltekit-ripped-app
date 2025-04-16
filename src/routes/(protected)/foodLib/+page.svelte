<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import CardArrayBackground from '$lib/components/newDesign/atoms/CardArrayBackground.svelte';
	import DigitalCounter from '$lib/components/newDesign/atoms/DigitalCounter.svelte';
	import Minimizer from '$lib/components/newDesign/atoms/Minimizer.svelte';
	import SelectionHeader from '$lib/components/newDesign/atoms/SelectionHeader.svelte';
	import CardArray from '$lib/components/newDesign/molecules/CardArray.svelte';
	import {
		calorieManager,
		foodItemManager,
		plannedItemManager,
		proteinManager
	} from '$lib/stateManagers.svelte';

	const origin = page.url.searchParams.get('origin') || '/';
</script>

<div class="flex h-full w-full flex-col items-center space-y-4 p-1">
	<div class="mt-4 flex w-full grow flex-col overflow-hidden">
		<div class="flex w-full items-end justify-between px-2 pb-[1px]">
			<SelectionHeader icon="book" text="Food Library" />
		</div>
		<CardArrayBackground color="light" classAddons="py-2 flex-col w-full h-full">
			<CardArray
				itemManager={foodItemManager}
				selectionManager={plannedItemManager}
				theme="light"
				showNewElementCard={true}
				verticalScroll={true}
			/>
		</CardArrayBackground>
	</div>
	<DigitalCounter
		kcalCurrent={calorieManager.eaten}
		kcalTarget={calorieManager.target}
		proteinCurrent={proteinManager.eaten}
		proteinTarget={proteinManager.target}
	/>

	<div class="mb-0.5 flex w-full justify-center">
		<Minimizer onclick={() => goto(origin)} direction="down" />
	</div>
</div>
