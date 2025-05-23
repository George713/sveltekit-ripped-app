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
		streakManager,
		visibilityManager,
		xpManager,
		lastVisitManager
	} from '$lib/stateManagers.svelte.ts';
	import { getDateBeginning, getDateDayBegin } from '$lib/utils.svelte.ts';

	import SpinnerOverlay from '$atoms/SpinnerOverlay.svelte';
	import PotentialToasts from '$molecules/PotentialToasts.svelte';

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

	const handleVisibilityChangeAndInitialCheck = () => {
		if (document.hidden) {
			// User is leaving the page (tab switch, minimize, etc.)
			lastVisitManager.timestamp = Date.now();
		} else {
			// Page is visible (either returning or initial load)
			const storedTimestamp = lastVisitManager.timestamp;
			if (storedTimestamp) {
				const storedDate = new Date(storedTimestamp);
				const storedDateDayBegin = getDateBeginning(page.data.user.timeZoneOffset, storedDate);
				if (storedDateDayBegin < dateDayBegin) {
					// location.reload();
				}
			}
		}
	};

	onMount(() => {
		// Perform the check immediately when the component mounts if the page is visible
		if (!document.hidden) {
			handleVisibilityChangeAndInitialCheck();
		}
		document.onvisibilitychange = () => handleVisibilityChangeAndInitialCheck();

		// It's important this runs *after* the new day check might have triggered a reload.
		xpManager.totalXP = data.user.totalXP;
		xpManager.vaultXP = data.dailyProgress.vaultXP;

		calorieManager.target = data.dailyProgress.targetCalories;
		proteinManager.target = data.dailyProgress.targetProtein;
		streakManager.streak = data.user.streakMeter;

		updateTimeZone();
	});
</script>

<!-- TODO: Remove the wrapper class once all pages can live without it. -->
<div class="fixed top-0 flex w-full justify-between">
	<p class="text-white">
		Last Visit: {lastVisitManager.timestamp
			? new Intl.DateTimeFormat('en-GB', {
					day: '2-digit',
					month: '2-digit',
					year: '2-digit'
				}).format(new Date(lastVisitManager.timestamp))
			: 'Never'}
	</p>
	<p class="text-white">
		Current: {new Intl.DateTimeFormat('en-GB', {
			day: '2-digit',
			month: '2-digit',
			year: '2-digit'
		}).format(new Date(Date.now()))}
	</p>
</div>
<div class="flex h-screen w-screen flex-col">
	{#if visibilityManager.spinnerOverlay}
		<SpinnerOverlay />
	{/if}
	<PotentialToasts />
	{@render children?.()}
</div>

<!-- AUDIO -->
<audio src="/audio/successBell.mp3" bind:this={audioElement.element}></audio>
