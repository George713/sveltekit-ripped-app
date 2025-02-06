<script lang="ts">
	import { page } from '$app/state';

	import {
		calorieManager,
		estimatedItemManager,
		foodItemManager,
		plannedItemManager,
		proteinManager,
		visibilityManager,
		xpManager
	} from '$lib/stateManagers.svelte';

	import XPHud from '$lib/components/newDesign/atoms/XPHud.svelte';
	import Sigil from '$lib/components/newDesign/atoms/Sigil.svelte';
	import ActionPanel from '$lib/components/newDesign/organisms/ActionPanel.svelte';
	import WeightOverlay from '$lib/components/newDesign/organisms/WeightOverlay.svelte';

	import type { PageProps } from './$types';
	import { onMount } from 'svelte';

	let { data }: PageProps = $props();

	if (data.foodItems) {
		foodItemManager.items = data.foodItems;
	}
	if (data.plannedItems) {
		plannedItemManager.items = data.plannedItems;
	}
	if (data.estimatedItems) {
		estimatedItemManager.items = data.estimatedItems;
	}

	onMount(() => {
		xpManager.totalXP = page.data.user.pointBalance;
		calorieManager.target = page.data.user.currentCalorieTarget;
		proteinManager.target = page.data.dailyProgress.targetProtein;
	});
</script>

<XPHud />
<Sigil rank={page.data.user.currentStatus} />
<ActionPanel />
{#if visibilityManager.weightOverlay}
	<WeightOverlay />
{/if}
