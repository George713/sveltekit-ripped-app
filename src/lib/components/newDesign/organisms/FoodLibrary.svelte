<script lang="ts">
	import {
		dailySelectionManager,
		foodItemManager,
		foodSetManager
	} from '$lib/stateManagers.svelte';

	import CardArrayBackground from '../atoms/CardArrayBackground.svelte';
	import SelectionHeader from '../atoms/SelectionHeader.svelte';
	import SubtleButton from '../atoms/SubtleButton.svelte';
	import CardArray from '../molecules/CardArray.svelte';

	let showSets = $state(false);
	let subtleBtnText = $derived(showSets ? 'Items' : 'Sets');
	let itemManager = $derived(showSets ? foodSetManager : foodItemManager);
</script>

<div class="flex w-full flex-col px-0.5">
	<div class="flex w-full items-end justify-between px-2 pb-[1px]">
		<SelectionHeader icon="book" text="Food Library" />
		<SubtleButton text={subtleBtnText} onclick={() => (showSets = !showSets)} />
	</div>
	<CardArrayBackground color="light">
		<CardArray
			{itemManager}
			selectionManager={dailySelectionManager}
			theme="light"
			showNewElementCard={true}
		/>
	</CardArrayBackground>
</div>
