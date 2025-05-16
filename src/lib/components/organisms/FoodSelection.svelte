<script lang="ts">
	// Logic
	import { calorieManager, proteinManager, SelectionManager } from '$lib/stateManagers.svelte';
	// Atoms
	import CardArrayBackground from '$atoms/CardArrayBackground.svelte';
	import DigitalCounter from '$atoms/DigitalCounter.svelte';
	import SelectionHeader from '$atoms/SelectionHeader.svelte';
	// Molecules
	import CardArray from '$molecules/CardArray.svelte';

	interface Props {
		selectionManager: SelectionManager;
		headerAsInput?: boolean;
	}

	let { selectionManager, headerAsInput = false }: Props = $props();
</script>

<div class="flex w-full flex-col items-center px-0.5">
	<div class="flex w-full items-end justify-between px-2 pb-[1px]">
		<SelectionHeader icon="cutlery" text="Daily Selection" asInput={headerAsInput} />
	</div>
	<CardArrayBackground color="dark" classAddons="w-full">
		<CardArray itemManager={selectionManager} {selectionManager} theme="dark" />
	</CardArrayBackground>
	<div class="mt-2 translate-x-[-6%]">
		<DigitalCounter
			kcalCurrent={selectionManager.totalKcal}
			kcalTarget={calorieManager.target}
			proteinCurrent={selectionManager.totalProtein}
			proteinTarget={proteinManager.target}
		/>
	</div>
</div>
