<script lang="ts">
	import { goto } from '$app/navigation';

	import { calorieManager, plannedItemManager, proteinManager } from '$lib/stateManagers.svelte';

	import { Array } from '$lib/components/newDesign/atoms/array';
	import Minimizer from '$lib/components/newDesign/atoms/Minimizer.svelte';
	import AddButtons from '$lib/components/newDesign/molecules/AddButtons.svelte';
	import AddOverlay from '$lib/components/newDesign/molecules/AddOverlay.svelte';
	import DigitalCounter from '$lib/components/newDesign/atoms/DigitalCounter.svelte';
	import SelectionHeader from '$lib/components/newDesign/atoms/SelectionHeader.svelte';

	let showAddOverlay = $state(false);
</script>

<!-- Page -->
<div
	class={{
		'flex h-full w-full flex-col items-center': true
	}}
>
	<!-- Daily Log -->
	<Array.Wrapper>
		<SelectionHeader icon="cutlery" text="Daily Log" />
		<Array.Background color="dark">
			<Array.ArrayComponent itemManager={plannedItemManager} theme="dark" />
			<div class="pt-3">
				<AddButtons bind:showAddOverlay />
			</div>
		</Array.Background>
	</Array.Wrapper>
	<DigitalCounter
		kcalCurrent={calorieManager.eaten}
		kcalTarget={calorieManager.target}
		proteinCurrent={proteinManager.eaten}
		proteinTarget={proteinManager.target}
		classAddons="mt-1 mb-4"
	/>

	<div class="">
		<Minimizer onclick={() => goto('/')} direction="down" />
	</div>
</div>

{#if showAddOverlay}
	<AddOverlay bind:showAddOverlay />
{/if}
