<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { page } from '$app/state';
	import { onMount, setContext } from 'svelte';
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

	const audioElement = $state({ element: undefined as HTMLAudioElement | undefined });
	setContext('audioElement', audioElement);

	/**
	 * This block of code is executed when the component is first rendered, i.e. after the server-side load function.
	 * It gets the user's current timezone and compares it to the timezone stored in the user's database.
	 * If the two timezones are different, it sends a request to the server to update the user's timezone.
	 * This is required to handle data loading in accordance with the user's timezone, in particular
	 * plannedItems and eatEstimates.
	 */
	const updateTimeZone = () => {
		// Get the user's current timezone
		const now = new Date();
		const timeZoneOffset = now.getTimezoneOffset() / -60;

		if (page.data.user) {
			// Compare the user's current timezone to the timezone stored in the database
			if (timeZoneOffset != page.data.user.timeZoneOffset) {
				const formData = new FormData();
				formData.append('timeZoneOffset', JSON.stringify(timeZoneOffset)); // Add the user's timezone to the FormData object

				// Send a POST request to the server to update the user's timezone
				fetch('/?/setUserTimeZoneOffset', {
					method: 'POST',
					body: formData
				});

				// Reload page data to ensure that the correct timezone is used
				invalidateAll();
			}
		}
	};

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

		updateTimeZone();
	});
</script>

<!-- TODO: Remove the wrapper class once all pages can live without it. -->
<div class="flex h-screen w-screen flex-col">
	{#if visibilityManager.spinnerOverlay}
		<SpinnerOverlay />
	{/if}
	<PotentialToasts />
	{@render children?.()}
</div>

<!-- AUDIO -->
<audio src="/audio/successBell.mp3" bind:this={audioElement.element}></audio>
