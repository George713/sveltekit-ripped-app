<script lang="ts">
	import { calorieManager, dailySelectionManager, proteinManager } from '$lib/stateManagers.svelte';

	import CardArrayBackground from '../atoms/CardArrayBackground.svelte';
	import DigitalCounter from '../atoms/DigitalCounter.svelte';
	import SelectionHeader from '../atoms/SelectionHeader.svelte';
	import CardArray from '../molecules/CardArray.svelte';
</script>

<div class="flex w-full flex-col items-center px-0.5">
	<div class="flex w-full items-end justify-between px-2 pb-[1px]">
		<SelectionHeader icon="cutlery" text="Daily Selection" />
	</div>
	<CardArrayBackground color="dark">
		<CardArray
			itemManager={dailySelectionManager}
			selectionManager={dailySelectionManager}
			theme="dark"
		/>
	</CardArrayBackground>
	<div class="mt-2 translate-x-[-6%]">
		<DigitalCounter
			kcalCurrent={dailySelectionManager.totalKcal}
			kcalTarget={calorieManager.target}
			proteinCurrent={dailySelectionManager.totalProtein}
			proteinTarget={proteinManager.target}
		/>
	</div>
</div>
