<script lang="ts">
	// Svelte & SvelteKit
	import { page } from '$app/state';
	// Logic
	import { foodItemManager, foodSetManager, SelectionManager } from '$lib/stateManagers.svelte';
	// Atoms
	import CardArrayBackground from '$atoms/CardArrayBackground.svelte';
	import SelectionHeader from '$atoms/SelectionHeader.svelte';
	import SubtleButton from '$atoms/SubtleButton.svelte';
	// Molecules
	import CardArray from '$molecules/CardArray.svelte';

	interface Props {
		showNewElementCard: boolean;
		showSubtleBtn: boolean;
		selectionManager: SelectionManager;
	}

	let { showNewElementCard, showSubtleBtn, selectionManager }: Props = $props();

	let showSets = $state(page.url.searchParams.get('showSets') === 'true');
	let subtleBtnText = $derived(showSets ? 'Items' : 'Sets');
	let itemManager = $derived(showSets ? foodSetManager : foodItemManager);
</script>

<div class="flex w-full flex-col px-0.5">
	<div class="flex w-full items-end justify-between px-2 pb-[1px]">
		<SelectionHeader icon="book" text="Food Library" />
		{#if showSubtleBtn}
			<SubtleButton text={subtleBtnText} onclick={() => (showSets = !showSets)} />
		{/if}
	</div>
	<CardArrayBackground color="light" classAddons="w-full">
		<CardArray {itemManager} {selectionManager} theme="light" {showNewElementCard} />
	</CardArrayBackground>
</div>
