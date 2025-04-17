<script lang="ts">
	import { goto } from '$app/navigation';
	import CardArrayBackground from '$lib/components/newDesign/atoms/CardArrayBackground.svelte';
	import DigitalCounter from '$lib/components/newDesign/atoms/DigitalCounter.svelte';
	import Minimizer from '$lib/components/newDesign/atoms/Minimizer.svelte';
	import SelectionHeader from '$lib/components/newDesign/atoms/SelectionHeader.svelte';
	import AddButtons from '$lib/components/newDesign/molecules/AddButtons.svelte';
	import AddOverlay from '$lib/components/newDesign/molecules/AddOverlay.svelte';
	import CardArray from '$lib/components/newDesign/molecules/CardArray.svelte';
	import { calorieManager, plannedItemManager, proteinManager } from '$lib/stateManagers.svelte';

	let showAddOverlay = $state(false);
</script>

<div class="flex h-full w-full flex-col items-center">
	<div class="mb-1 flex w-full grow flex-col overflow-hidden p-2">
		<div class="flex w-full">
			<SelectionHeader icon="cutlery" text="Daily Log" />
		</div>
		<CardArrayBackground color="dark" classAddons="pt-2 pb-4 flex-col">
			<CardArray itemManager={plannedItemManager} theme="dark" verticalScroll={true} />
			<AddButtons bind:showAddOverlay />
		</CardArrayBackground>
	</div>
	<DigitalCounter
		kcalCurrent={calorieManager.eaten}
		kcalTarget={calorieManager.target}
		proteinCurrent={proteinManager.eaten}
		proteinTarget={proteinManager.target}
	/>
	<div class="mt-3 mb-1 flex w-full justify-center">
		<Minimizer onclick={() => goto('/')} direction="down" />
	</div>
</div>
{#if showAddOverlay}
	<AddOverlay bind:showAddOverlay />
{/if}
