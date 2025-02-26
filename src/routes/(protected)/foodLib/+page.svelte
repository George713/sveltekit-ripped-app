<script lang="ts">
	import { goto } from '$app/navigation';
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
</script>

<div class="mb-1 flex h-screen w-screen flex-col items-center justify-end space-y-4 p-1">
	<div class="">
		<div class="flex w-full items-end justify-between px-2 pb-[1px]">
			<SelectionHeader icon="book" text="Food Library" />
		</div>
		<CardArrayBackground color="light" classAddons="pt-2 pb-4 flex-col">
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
	<Minimizer onclick={() => goto('/')} direction="down" />
</div>
