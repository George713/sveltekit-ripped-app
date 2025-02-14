<script lang="ts">
	import { foodItemManager, foodSetManager } from '$lib/stateManagers.svelte';

	import CardArrayBackground from '../atoms/CardArrayBackground.svelte';
	import SelectionHeader from '../atoms/SelectionHeader.svelte';
	import SubtleButton from '../atoms/SubtleButton.svelte';
	import CardArray from '../molecules/CardArray.svelte';

	let showSets = $state(false);
	let subtleBtnText = $derived(showSets ? 'Items' : 'Sets');
	let items = $derived(showSets ? foodSetManager.sets : foodItemManager.items);
</script>

<div class="flex w-full flex-col px-0.5">
	<div class="flex w-full items-end justify-between px-2 pb-[1px]">
		<SelectionHeader icon="book" text="Food Library" />
		<SubtleButton text={subtleBtnText} onclick={() => (showSets = !showSets)} />
	</div>
	<CardArrayBackground color="light">
		<CardArray
			{items}
			itemType={showSets ? 'foodSets' : 'foodItems'}
			theme="light"
			showNewElementCard={true}
		/>
	</CardArrayBackground>
</div>
