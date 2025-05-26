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
	import { PUBLIC_ONMOBILE } from '$env/static/public';

	// Atoms
	import SpinnerOverlay from '$atoms/SpinnerOverlay.svelte';
	// Molecules
	import PotentialToasts from '$molecules/PotentialToasts.svelte';
	// Overlays
	import PwaInstallPrompt from '$overlays/PwaInstallPrompt.svelte';

	let { data, children } = $props();

	// Check if we're on the root path
	let isRootPath = $derived(page.url.pathname === '/app');

	let dateDayBegin = $state(getDateDayBegin(page.data.user.timeZoneOffset));
	let storedDateDayBegin = $state(new Date());
	let visibilityIndicator = $state(false);

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
		if (document.visibilityState === 'visible') {
			// Page is visible (either returning or initial load)
			if (lastVisitManager.timestamp) {
				const storedDate = new Date(lastVisitManager.timestamp);
				storedDateDayBegin = getDateBeginning(page.data.user.timeZoneOffset, storedDate);
				dateDayBegin = getDateDayBegin(page.data.user.timeZoneOffset);
				// if (storedDateDayBegin < dateDayBegin) {
				if (true) {
					visibilityIndicator = true;
					setTimeout(() => {
						window.location.reload();
					}, 3000);
				}
			}
		} else {
			// User is leaving the page (tab switch, minimize, etc.)
			lastVisitManager.timestamp = Date.now();
		}
	};

	onMount(() => {
		// Perform the check immediately when the component mounts if the page is visible
		if (!document.hidden) {
			handleVisibilityChangeAndInitialCheck();
		}
		document.addEventListener('visibilitychange', handleVisibilityChangeAndInitialCheck);

		// It's important this runs *after* the new day check might have triggered a reload.
		xpManager.totalXP = data.user.totalXP;
		xpManager.vaultXP = data.dailyProgress.vaultXP;

		calorieManager.target = data.dailyProgress.targetCalories;
		proteinManager.target = data.dailyProgress.targetProtein;
		streakManager.streak = data.user.streakMeter;

		updateTimeZone();

		return () => {
			document.removeEventListener('visibilitychange', handleVisibilityChangeAndInitialCheck);
		};
	});
</script>

{#if visibilityIndicator}
	<div class="animate-flicker-3s fixed top-0 flex w-full justify-center">
		<p class="text-white">New day detected! Reloading in 3s...</p>
	</div>
{/if}
<!-- TODO: Remove the wrapper class once all pages can live without it. -->
<div class="flex h-screen w-screen flex-col">
	{#if visibilityManager.spinnerOverlay}
		<SpinnerOverlay />
	{/if}
	<PotentialToasts />
	{@render children?.()}
</div>
{#if isRootPath && PUBLIC_ONMOBILE === 'TRUE'}
	<PwaInstallPrompt />
{/if}

<!-- AUDIO -->
<audio src="/audio/successBell.mp3" bind:this={audioElement.element}></audio>

<style>
	@keyframes flicker-effect {
		0%,
		25%,
		50%,
		75%,
		100% {
			opacity: 1;
		}
		12.5%,
		37.5%,
		62.5%,
		87.5% {
			opacity: 0.3;
		}
	}
	.animate-flicker-3s {
		animation: flicker-effect 3s linear;
	}
</style>
