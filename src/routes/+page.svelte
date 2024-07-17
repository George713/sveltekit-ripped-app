<!-- 
	=========
	Main Page
	=========

	Displays status badge and controls for daily desired actions, i.e.
		- input weight measurement,
		- plan meals for the day,
		- track meals,
		- eat target calories,
		- eat target protein or more.
	Once a week the desired action of taking a photo is possible.
	Once a month the desired action of entering a body fat measurement is possible.
	
	During onboarding the design differs and 3 desired actions are given:
		- enter current weight
		- enter current body fat percentage
		- upload progress picture

-->
<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { invalidateAll } from '$app/navigation';
	import {
		foodLibrary,
		plannedItems,
		estimatesLog,
		showSpinner,
		visibleView,
		visibleOverlay
	} from '$lib/stores';
	import type { FoodItem, PlannedItem, EatEstimate } from '$lib/types';
	// Atoms
	import HarvestButton from '$atoms/HarvestButton.svelte';
	import PowerUps from '$atoms/PowerUps.svelte';
	import ProgessBars from '$atoms/ProgessBars.svelte';
	import BodyfatButton from '$atoms/BodyfatButton.svelte';
	import ProgressPicButton from '$atoms/ProgressPicButton.svelte';
	import SigilEmpty from '$atoms/sigils/SigilEmpty.svelte';
	import TargetTracker from '$atoms/TargetTracker.svelte';
	// Molecules
	import DailyActionBtns from '$molecules/DailyActionBtns.svelte';
	import InitialInputs from '$molecules/InitialInputs.svelte';
	import ModalCalories from '$molecules/ModalCalories.svelte';
	import SigilNavPoints from '$molecules/SigilNavPoints.svelte';
	// Organisms
	import FoodLibrary from '$organisms/FoodLibrary.svelte';
	import ModalEatingLog from '$organisms/ModalEatingLog.svelte';
	import ModalHarvest from '$organisms/ModalHarvest.svelte';
	import NewItem from '$organisms/NewItem.svelte';
	import UpdateItem from '$organisms/UpdateItem.svelte';
	import ModalPlanner from '$organisms/ModalPlanner.svelte';
	import WeeklyReview from '$organisms/WeeklyReview.svelte';
	// Overlays
	import ModalFinishEating from '$overlays/FinishEating.svelte';
	import SpinnerOverlay from '$overlays/Spinner.svelte';
	import EnterWeightOverlay from '$overlays/EnterWeight.svelte';
	import EnterBodyfatOverlay from '$overlays/EnterBodyfat.svelte';

	export let data: {
		foodItems: FoodItem[];
		plannedItems: PlannedItem[];
		eatEstimates: EatEstimate[];
	};
	if (data.foodItems) {
		foodLibrary.set(data.foodItems);
	}
	if (data.plannedItems) {
		plannedItems.set(data.plannedItems);
	}
	if (data.eatEstimates) {
		estimatesLog.set(data.eatEstimates);
	}

	let audioWeighIn: any;

	/**
	 * This block of code is executed when the component is first rendered, i.e. after the server-side load function.
	 * It gets the user's current timezone and compares it to the timezone stored in the user's database.
	 * If the two timezones are different, it sends a request to the server to update the user's timezone.
	 * This is required to handle data loading in accordance with the user's timezone, in particular
	 * plannedItems and eatEstimates.
	 */
	onMount(() => {
		// Get the user's current timezone
		// const timezone = new Intl.DateTimeFormat().resolvedOptions().timeZone;
		const now = new Date();
		const timeZoneOffset = now.getTimezoneOffset() / -60;

		if ($page.data.user) {
			// Compare the user's current timezone to the timezone stored in the database
			if (timeZoneOffset != $page.data.user.activeTimeZone) {
				const formData = new FormData();
				formData.append('timeZoneOffset', JSON.stringify(timeZoneOffset)); // Add the user's timezone to the FormData object

				// Send a POST request to the server to update the user's timezone
				fetch('?/setUserTimeZoneOffset', {
					method: 'POST',
					body: formData
				});

				// Reload page data to ensure that the correct timezone is used
				invalidateAll();
			}
		}
	});

	const reset = async () => {
		const formData = new FormData();
		const response = await fetch('?/reset', {
			method: 'POST',
			body: formData
		});

		// Clear plannedItem store
		plannedItems.set([]);

		// Reload page data (so plan button is enabled again)
		invalidateAll();
	};

	// EventHandler for playing sounds
	const handlePlaySound = (event: CustomEvent) => {
		switch (event.detail.text) {
			case 'weighIn':
				audioWeighIn.play();
		}
	};
</script>

{#if $page.data.user}
	<!-- ONBOARDING -->
	{#if !$page.data.user.initCalories || !$page.data.user.initPhoto || !$page.data.user.initBF}
		<!-- Empty Sigil  -->
		<SigilEmpty />
		<!-- Desired Action Buttons for Initial Inputs -->
		<InitialInputs />
		<!-- SCAFFOLDING -->
	{:else}
		<!-- Sigil with Navigation elements and points -->
		<SigilNavPoints {data} />
		<!-- PowerUps, Bars, Tracker, Harvest Button, Progress Picture Button -->
		<div class="flex h-[calc(25vh)] w-full bg-green-500">
			<!-- PowerUps, Bars, Tracker -->
			<div class="flex h-full w-[calc(66%)] flex-col bg-slate-100">
				<!-- PowerUps -->
				<div class="flex h-[calc(30%)] w-full items-end justify-end pb-2 pr-2">
					<PowerUps />
				</div>
				<!-- Bars -->
				<div class=" w-full pl-9">
					<ProgessBars />
				</div>
				<!-- Tracker -->
				<div class="flex-grow pl-3">
					<TargetTracker large={true} />
				</div>
			</div>
			<!-- Harvest Button -->
			<div class="flex h-full flex-grow items-center bg-slate-100 px-4">
				<HarvestButton />
				<!-- Progess Picture Button -->
				{#if $page.data.user.progressPicToday}
					<div class="absolute mb-60 ml-[-4px]">
						<ProgressPicButton text="P" disabled={$page.data.dailyProgress.weeklyPic} />
					</div>
				{/if}
				<!-- Bodyfat Update Button -->
				{#if $page.data.user.enterBodyfatToday}
					<div class="absolute mb-64 ml-[-80px]">
						<BodyfatButton />
					</div>
				{/if}
			</div>
		</div>

		<!-- Weigh, Plan, Finish, Reset Buttons -->
		<DailyActionBtns {reset} />
	{/if}

	{#if $visibleOverlay == 'weight'}
		<EnterWeightOverlay on:playSound={handlePlaySound} />
	{:else if $visibleOverlay == 'bodyFat'}
		<EnterBodyfatOverlay askGender={!$page.data.user.initBF} />
	{:else if $visibleView.current == 'calories'}
		<ModalCalories />
	{:else if $visibleView.current == 'planner'}
		<ModalPlanner />
	{:else if $visibleView.current == 'newItem'}
		<NewItem />
	{:else if $visibleView.current == 'eat'}
		<ModalEatingLog />
	{:else if $visibleView.current == 'foodLib'}
		<FoodLibrary />
	{:else if $visibleView.current == 'updateItem'}
		<UpdateItem />
	{:else if $visibleView.current == 'finishEating'}
		<ModalFinishEating />
	{:else if $visibleView.current == 'harvest'}
		<ModalHarvest />
	{:else if $visibleView.current == 'review'}
		<WeeklyReview />
	{/if}
{:else}
	<p class="m-3 flex justify-center px-5">No one here yet...</p>
{/if}

<SpinnerOverlay showSpinner={$showSpinner} />

<!-- AUDIO -->
<audio src="/audio/successBell.mp3" bind:this={audioWeighIn} />
