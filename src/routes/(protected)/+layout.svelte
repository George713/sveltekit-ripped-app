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

	let { data, children } = $props();

	// Using Svelte 5 $effect rune for reactivity when data changes, e.g. through invalidation
	$effect.pre(() => {
		foodItemManager.items = data.foodItems;
		plannedItemManager.items = data.plannedItems;
		estimatedItemManager.items = data.estimatedItems;
		foodSetManager.items = data.foodSets;
	});

	onMount(() => {
		xpManager.totalXP = page.data.user.pointBalance;
		calorieManager.target = page.data.user.currentCalorieTarget;
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
