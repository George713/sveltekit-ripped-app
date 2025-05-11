<script lang="ts">
	// Logic
	import { foodItemManager } from '$lib/stateManagers.svelte';
	// Atoms
	import { Array } from '$atoms/array';
	import Minimizer from '$atoms/Minimizer.svelte';
	import DigitalCounter from '$atoms/DigitalCounter.svelte';
	import SelectionHeader from '$atoms/SelectionHeader.svelte';
	// Molecules
	import AddButtons from '$molecules/AddButtons.svelte';
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
			<Array.ArrayComponent itemManager={foodItemManager} theme="dark" />
			<div class="pt-3">
				<AddButtons showAddOverlay={false} />
			</div>
		</Array.Background>
	</Array.Wrapper>
	<DigitalCounter
		kcalCurrent={0}
		kcalTarget={2000}
		proteinCurrent={0}
		proteinTarget={150}
		classAddons="mt-1 mb-4"
	/>

	<div class="">
		<Minimizer onclick={() => {}} direction="down" />
	</div>
</div>
