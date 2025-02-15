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

	if (data.foodItems) {
		foodItemManager.items = data.foodItems;
	}
	if (data.plannedItems) {
		plannedItemManager.items = data.plannedItems;
	}
	if (data.estimatedItems) {
		estimatedItemManager.items = data.estimatedItems;
	}
	if (data.foodSets) {
		foodSetManager.sets = data.foodSets;
	}

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
