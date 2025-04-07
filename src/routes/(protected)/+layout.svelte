<script lang="ts">
	import { page } from '$app/state';
	import { onMount } from 'svelte';
	import {
		calorieManager,
		estimatedItemManager,
		foodItemManager,
		foodSetManager,
		plannedItemManager,
		proteinManager,
		visibilityManager,
		xpManager
	} from '$lib/stateManagers.svelte.js';
	import PotentialToasts from '$lib/components/newDesign/molecules/PotentialToasts.svelte';
	import SpinnerOverlay from '$lib/components/newDesign/atoms/SpinnerOverlay.svelte';
	import { getDateDayBegin } from '$lib/utils.svelte.js';

	let { data, children } = $props();

	const dateDayBegin = getDateDayBegin(page.data.user.timeZoneOffset);

	// Using Svelte 5 $effect rune for reactivity when data changes, e.g. through invalidation
	$effect.pre(() => {
		// This sorting shows the most used items first when viewed in foodLibrary
		foodItemManager.items = data.foodItems.sort(
			(a, b) => b.PlannedItems.length - a.PlannedItems.length
		);

		plannedItemManager.items = data.foodItems
			.filter((item) => item.PlannedItems.length > 0)
			.flatMap((item) => item.PlannedItems)
			.filter((item) => item.createdAt >= dateDayBegin)
			.sort((a, b) => a.id - b.id); // Uses id to sort by order items were created in db

		estimatedItemManager.items = data.estimatedItems;
		foodSetManager.items = data.foodSets;
	});

	onMount(() => {
		xpManager.totalXP = page.data.user.pointBalance;
		xpManager.vaultXP = page.data.dailyProgress.vaultXP;
		calorieManager.target = page.data.dailyProgress.targetCalories;
		proteinManager.target = page.data.dailyProgress.targetProtein;
	});
</script>

<div class="flex h-screen w-screen flex-col bg-linear-to-br/oklch from-stone-900 to-stone-800">
	{#if visibilityManager.spinnerOverlay}
		<SpinnerOverlay />
	{/if}
	<PotentialToasts />
	{@render children?.()}
</div>
