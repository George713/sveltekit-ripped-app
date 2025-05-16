<script lang="ts">
	import { goto } from '$app/navigation';

	import { calorieManager, plannedItemManager, proteinManager } from '$lib/stateManagers.svelte';

	import { Array } from '$atoms/array';
	import Minimizer from '$atoms/Minimizer.svelte';
	import DigitalCounter from '$atoms/DigitalCounter.svelte';
	import SelectionHeader from '$atoms/SelectionHeader.svelte';

	import AddButtons from '$molecules/AddButtons.svelte';
	import AddOverlay from '$molecules/AddOverlay.svelte';

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
		classAddons="mt-1 mb-3"
	/>

	<div class="mb-1">
		<Minimizer onclick={() => goto('/')} direction="down" />
	</div>
</div>

{#if showAddOverlay}
	<AddOverlay bind:showAddOverlay />
{/if}
