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
	import { page } from '$app/stores';
	import { invalidateAll } from '$app/navigation';
	import { foodLibrary, plannedItems, showSpinner } from '$lib/stores';
	import type { FoodItem, PlannedItem } from '$lib/types';
	// Atoms
	import HarvestButton from '$atoms/HarvestButton.svelte';
	import PowerUps from '$atoms/PowerUps.svelte';
	import ProgessBars from '$atoms/ProgessBars.svelte';
	import ProgressPicButton from '$atoms/ProgressPicButton.svelte';
	import SigilEmpty from '$atoms/SigilEmpty.svelte';
	import TargetTracker from '$atoms/TargetTracker.svelte';
	// Molecules
	import DailyActionBtns from '$molecules/DailyActionBtns.svelte';
	import InitialInputs from '$molecules/InitialInputs.svelte';
	import ModalBodyFat from '$molecules/ModalBodyFat.svelte';
	import ModalCalories from '$molecules/ModalCalories.svelte';
	import ModalWeight from '$molecules/ModalWeight.svelte';
	import SigilNavPoints from '$molecules/SigilNavPoints.svelte';
	// Organisms
	import ModalEatingLog from '$organisms/ModalEatingLog.svelte';
	import ModalHarvest from '$organisms/ModalHarvest.svelte';
	import ModalNewItem from '$organisms/ModalNewItem.svelte';
	import ModalPlanner from '$organisms/ModalPlanner.svelte';
	// Overlays
	import ModalFinishEating from '$overlays/FinishEating.svelte';
	import SpinnerOverlay from '$overlays/Spinner.svelte';

	export let data: { foodItems: FoodItem[]; plannedItems: PlannedItem[] };
	if (data.foodItems) {
		foodLibrary.set(data.foodItems);
	}
	if (data.plannedItems) {
		plannedItems.set(data.plannedItems);
	}

	let fileinput: any;
	let audioWeighIn: any;

	// Handler for visibility state of components
	let visibleModal = 'none';
	let originModal = 'none';
	const toggleModal = (modal: string) => {
		originModal = visibleModal;
		visibleModal = modal;
	};

	const uploadToS3 = async (e: any, isInitPic: Boolean = false) => {
		// Get picture
		const picture = e.target.files[0];

		// catch if no image is in formData
		if (picture.name == '') {
			return null;
		}

		// Get presigned URL
		const formData = new FormData();
		formData.append('isInitPic', JSON.stringify(isInitPic));
		formData.append('timestamp', new Date().toUTCString());
		const response = await fetch('/api/getPresignedURL', {
			method: 'POST',
			body: formData
		});
		const presignedURL = (await response.json()).url;

		// Upload image
		await fetch(presignedURL, {
			method: 'PUT',
			body: picture
		});

		// Reload page data (so photo button is disabled)
		invalidateAll();
	};

	const reset = async () => {
		const formData = new FormData();
		formData.append('username', JSON.stringify($page.data.user.name));
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
		<InitialInputs {toggleModal} {uploadToS3} {fileinput} />

		<!-- SCAFFOLDING -->
	{:else}
		<!-- Sigil with Navigation elements and points -->
		<SigilNavPoints />
		<!-- PowerUps, Bars, Tracker, Harvest Button, Progress Picture Button -->
		<div class="bg-green-500 w-full h-[calc(25vh)] flex">
			<!-- PowerUps, Bars, Tracker -->
			<div class="bg-slate-100 w-[calc(66%)] h-full flex flex-col">
				<!-- PowerUps -->
				<div class="w-full h-[calc(30%)] flex items-end justify-end pb-2 pr-2">
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
			<div class="bg-slate-100 flex-grow h-full flex items-center px-4">
				<HarvestButton {toggleModal} />
				{#if $page.data.user.progressPicToday}
					<div class="absolute mb-60 ml-[-4px]">
						<ProgressPicButton {uploadToS3} {fileinput} />
					</div>
				{/if}
			</div>
		</div>

		<!-- Weigh, Plan, Finish, Reset Buttons -->
		<DailyActionBtns {toggleModal} {reset} />
	{/if}

	{#if visibleModal == 'weight'}
		<ModalWeight {toggleModal} on:playSound={handlePlaySound} />
	{:else if visibleModal == 'bodyFat'}
		<ModalBodyFat {toggleModal} />
	{:else if visibleModal == 'calories'}
		<ModalCalories {toggleModal} />
	{:else if visibleModal == 'planner'}
		<ModalPlanner {toggleModal} />
	{:else if visibleModal == 'newItem'}
		<ModalNewItem {toggleModal} {originModal} />
	{:else if visibleModal == 'eat'}
		<ModalEatingLog {toggleModal} />
	{:else if visibleModal == 'finishEating'}
		<ModalFinishEating {toggleModal} />
	{:else if visibleModal == 'harvest'}
		<ModalHarvest {toggleModal} />
	{/if}
{:else}
	<p class="m-3 px-5 flex justify-center">No one here yet...</p>
{/if}

<SpinnerOverlay showSpinner={$showSpinner} />

<!-- AUDIO -->
<audio src="/audio/successBell.mp3" bind:this={audioWeighIn} />
