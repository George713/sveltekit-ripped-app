<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';

	import {
		calorieManager,
		foodItemManager,
		plannedItemManager,
		proteinManager
	} from '$lib/stateManagers.svelte';

	import { Array } from '$lib/components/newDesign/atoms/array';
	import Minimizer from '$lib/components/newDesign/atoms/Minimizer.svelte';
	import DigitalCounter from '$lib/components/newDesign/atoms/DigitalCounter.svelte';
	import SelectionHeader from '$lib/components/newDesign/atoms/SelectionHeader.svelte';

	const origin = page.url.searchParams.get('origin') || '/';
</script>

<!-- Page -->
<div
	class={{
		'flex h-full w-full flex-col items-center': true
	}}
>
	<!-- Food Library -->
	<Array.Wrapper>
		<SelectionHeader icon="book" text="Food Library" />
		<Array.Background color="light">
			<Array.ArrayComponent
				itemManager={foodItemManager}
				selectionManager={plannedItemManager}
				showNewElementCard={true}
				theme="light"
			/>
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
		<Minimizer onclick={() => goto(origin)} direction="down" />
	</div>
</div>
