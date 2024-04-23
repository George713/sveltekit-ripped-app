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
	import { foodLibrary, plannedItems, eatenKcal, eatenProtein } from '$lib/stores';
	import type { FoodItem, PlannedItem } from '$lib/types';
	// Atoms
	import PowerUps from '$atoms/PowerUps.svelte';
	import ProgessBars from '$atoms/ProgessBars.svelte';
	import Sigil from '$atoms/Sigil.svelte';
	import SigilEmpty from '$atoms/SigilEmpty.svelte';
	import TargetTracker from '$atoms/TargetTracker.svelte';
	// Molecules
	import InitialInputs from '$molecules/InitialInputs.svelte';
	import ModalBodyFat from '$molecules/ModalBodyFat.svelte';
	import ModalCalories from '$molecules/ModalCalories.svelte';
	import ModalWeight from '$molecules/ModalWeight.svelte';
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
	{#if !$page.data.user.initCalories || !$page.data.user.initPhoto || !$page.data.user.initBF || true}
		<!-- Empty Sigil  -->
		<SigilEmpty />
		<!-- Desired Action Buttons for Initial Inputs -->
		<InitialInputs {toggleModal} {uploadToS3} {fileinput} />

		<!-- SCAFFOLDING -->
	{:else if 15 < $page.data.user.currentBF && $page.data.user.currentBF < 20}
		<div class="bg-slate-100 w-full h-[calc(50vh)] flex justify-center pt-3 relative">
			<button
				class="absolute left-3 bg-slate-300 w-5 h-5 rounded flex justify-center items-center text-[10px] text-gray-600 font-bold shadow-sm"
			>
				G
			</button>
			<form action="/logout" class="logout" method="POST">
				<button
					class="absolute right-3 bg-slate-300 w-5 h-5 rounded flex justify-center items-center text-[10px] text-gray-600 font-bold shadow-sm"
					type="submit"
				>
					X
				</button>
			</form>
			<!-- Points -->
			<div class="absolute left-[83%] top-[50%]">
				<span class="text-gray-500 text-xs">$</span>
				<span class="text-gray-500 text-lg font-medium">{$page.data.user.pointBalance}</span>
			</div>
			<Sigil />
		</div>
		<!-- PowerUps, Bars, Tracker, Harvest Button -->
		<div class="bg-green-500 w-full h-[calc(25vh)] flex">
			<!-- PowerUps, Bars, Tracker -->
			<div class="bg-slate-100 w-[calc(66%)] h-full flex flex-col">
				<!-- PowerUps -->
				<div class="w-full h-[calc(30%)] flex items-end justify-end pb-2 pr-2">
					<PowerUps streakMeter={$page.data.user.streakMeter} />
				</div>
				<!-- Bars -->
				<div class=" w-full pl-9">
					<ProgessBars
						eatenKcal={$eatenKcal}
						eatenProtein={$eatenProtein}
						targetKcal={$page.data.user.currentCalorieTarget}
						targetProtein={$page.data.dailyProgress.targetProtein}
					/>
				</div>
				<!-- Tracker -->
				<div class="flex-grow pl-3">
					<TargetTracker
						calTarget={$page.data.user.currentCalorieTarget}
						proteinTarget={$page.data.dailyProgress.targetProtein}
						plannedKcal={$eatenKcal}
						plannedProtein={$eatenProtein}
						large={true}
					/>
				</div>
			</div>
			<!-- Harvest Button -->
			<div class="bg-slate-100 flex-grow h-full flex items-center px-4">
				<button
					class="h-20 w-20 bg-gray-300 rounded shadow text-[40px] font-bold text-neutral-600 border border-gray-400/10 disabled:bg-gray-200 disabled:text-neutral-400"
					on:click={() => toggleModal('harvest')}
					disabled={!$page.data.dailyProgress.eaten || $page.data.dailyProgress.harvest}
				>
					H
				</button>
				{#if $page.data.user.progressPicToday}
					<div class="absolute mb-60 ml-[-4px]">
						<!-- ProgressPic -->
						<input
							type="file"
							bind:this={fileinput}
							style="display:none"
							accept=".jpg, .jpeg, .png"
							on:change={(e) => uploadToS3(e)}
						/>
						<button
							class="h-14 w-14 bg-gray-300 mx-4 rounded shadow text-[20px] font-bold text-neutral-600 border border-gray-400/10 disabled:bg-gray-200 disabled:text-neutral-400"
							on:click={() => fileinput.click()}
							disabled={$page.data.dailyProgress.weeklyPic}
						>
							P
						</button>
					</div>
				{/if}
			</div>
		</div>

		<!-- Weigh, Plan, Finish, Reset Buttons -->
		<div class="bg-slate-100 w-full h-[calc(25vh)] flex justify-center items-center relative">
			<!-- Weigh-in -->
			<button
				class="h-14 w-14 bg-gray-300 mx-4 rounded shadow text-[20px] font-bold text-neutral-600 border border-gray-400/10 disabled:bg-gray-200 disabled:text-neutral-400"
				on:click={() => {
					toggleModal('weight');
				}}
				disabled={$page.data.dailyProgress.weighIn || $page.data.dailyProgress.harvest}
			>
				W
			</button>
			<!-- Plan -> Add Food -->
			<button
				class="h-14 w-14 bg-gray-300 mx-4 rounded shadow text-[20px] font-bold text-neutral-600 border border-gray-400/10 disabled:bg-gray-200 disabled:text-neutral-400"
				on:click={() => {
					if (!$page.data.dailyProgress.planned) toggleModal('planner');
					else if ($page.data.dailyProgress.planned && !$page.data.dailyProgress.eaten)
						toggleModal('eat');
				}}
				disabled={$page.data.dailyProgress.eaten}
			>
				{!$page.data.dailyProgress.planned ? 'P' : '+'}
			</button>
			<!-- Finish Eating -->
			<button
				class="h-14 w-14 bg-gray-300 mx-4 rounded shadow text-[20px] font-bold text-neutral-600 border border-gray-400/10 disabled:bg-gray-200 disabled:text-neutral-400"
				on:click={() => toggleModal('finishEating')}
				disabled={$page.data.dailyProgress.eaten}
			>
				F
			</button>
			<!-- Reset -->
			<button
				class="absolute h-7 w-14 bottom-0 left-0 bg-gray-200 rounded shadow text-[14px] text-neutral-400 border border-gray-400/10"
				on:click={reset}
			>
				Reset
			</button>
		</div>
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

<SpinnerOverlay />

<!-- AUDIO -->
<audio src="/audio/successBell.mp3" bind:this={audioWeighIn} />
