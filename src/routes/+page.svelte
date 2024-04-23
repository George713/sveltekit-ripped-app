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
	import TargetTracker from '$atoms/TargetTracker.svelte';
	// Molecules
	import ModalWeight from '$molecules/ModalWeight.svelte';
	import ModalBodyFat from '$lib/components/ModalBodyFat.svelte';
	import ModalCalories from '$lib/components/ModalCalories.svelte';
	import ModalPlanner from '$lib/components/ModalPlanner.svelte';
	import ModalNewItem from '$lib/components/ModalNewItem.svelte';
	import ModalEatingLog from '$lib/components/ModalEatingLog.svelte';
	import ModalHarvest from '$lib/components/ModalHarvest.svelte';
	import ModalFinishEating from '$lib/components/overlays/FinishEating.svelte';
	import SpinnerOverlay from '$lib/components/overlays/Spinner.svelte';

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
		<!-- Badge symbol -->
		<svg
			class="block m-auto my-2 fill-stone-200"
			width="333"
			height="189"
			viewBox="0 0 333 189"
			xmlns="http://www.w3.org/2000/svg"
		>
			<g filter="url(#filter0_ii_170_147)">
				<path
					d="M165.5 0.577398C166.119 0.220132 166.881 0.220131 167.5 0.577397L247.339 46.6727C247.958 47.03 248.339 47.6902 248.339 48.4047V140.595C248.339 141.31 247.958 141.97 247.339 142.327L167.5 188.423C166.881 188.78 166.119 188.78 165.5 188.423L85.6606 142.327C85.0418 141.97 84.6606 141.31 84.6606 140.595V48.4047C84.6606 47.6902 85.0418 47.03 85.6606 46.6727L165.5 0.577398Z"
				/>
				<path
					d="M74.9997 139.731L153.033 184.768C154.806 185.791 154.08 188.5 152.034 188.5H135.431C135.147 188.5 134.866 188.439 134.607 188.322L73.1757 160.532C72.4599 160.208 72 159.495 72 158.71V141.464C72 139.924 73.6664 138.962 74.9997 139.731Z"
				/>
				<path
					d="M70.3232 161.775L121.035 184.677C122.998 185.564 122.366 188.5 120.212 188.5H115.795C115.6 188.5 115.405 188.471 115.217 188.415L68.9216 174.43C68.0775 174.175 67.5 173.397 67.5 172.515V163.598C67.5 162.145 68.9994 161.177 70.3232 161.775Z"
				/>
				<path
					d="M257.5 139.731L179.467 184.768C177.694 185.791 178.42 188.5 180.466 188.5H197.069C197.353 188.5 197.634 188.439 197.893 188.322L259.324 160.532C260.04 160.208 260.5 159.495 260.5 158.71V141.464C260.5 139.924 258.834 138.962 257.5 139.731Z"
				/>
				<path
					d="M262.177 161.775L211.465 184.677C209.502 185.564 210.134 188.5 212.288 188.5H216.705C216.9 188.5 217.095 188.471 217.283 188.415L263.578 174.43C264.422 174.175 265 173.397 265 172.515V163.598C265 162.145 263.501 161.177 262.177 161.775Z"
				/>
				<path
					d="M251.5 128.212V65.2165C251.5 63.8684 252.807 62.9064 254.094 63.3067L330.846 87.1746C332.151 87.5804 332.673 89.1462 331.874 90.2544L312.099 117.67C311.723 118.191 311.102 118.5 310.46 118.501C270.212 118.603 255.42 124.577 252.155 128.401C252.007 128.575 251.5 128.44 251.5 128.212Z"
				/>
				<path
					d="M81 128.212V65.2165C81 63.8684 79.6934 62.9064 78.4061 63.3067L1.65427 87.1746C0.349419 87.5804 -0.173294 89.1462 0.626114 90.2544L20.4013 117.67C20.7773 118.191 21.3978 118.5 22.0404 118.501C62.2881 118.603 77.0799 124.577 80.3447 128.401C80.493 128.575 81 128.44 81 128.212Z"
				/>
			</g>
			<defs>
				<filter
					id="filter0_ii_170_147"
					x="0.247096"
					y="-0.690552"
					width="332.006"
					height="191.381"
					filterUnits="userSpaceOnUse"
					color-interpolation-filters="sRGB"
				>
					<feFlood flood-opacity="0" result="BackgroundImageFix" />
					<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
					<feColorMatrix
						in="SourceAlpha"
						type="matrix"
						values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
						result="hardAlpha"
					/>
					<feOffset dy="2" />
					<feGaussianBlur stdDeviation="2" />
					<feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
					<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
					<feBlend mode="normal" in2="shape" result="effect1_innerShadow_170_147" />
					<feColorMatrix
						in="SourceAlpha"
						type="matrix"
						values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
						result="hardAlpha"
					/>
					<feOffset dy="-1" />
					<feGaussianBlur stdDeviation="0.5" />
					<feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
					<feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.1 0" />
					<feBlend
						mode="normal"
						in2="effect1_innerShadow_170_147"
						result="effect2_innerShadow_170_147"
					/>
				</filter>
			</defs>modalWeight
		</svg>

		<!-- Desired Action Buttons -->
		<div class="flex justify-center">
			<!-- Target calorie input -->
			<button
				on:click={() => {
					toggleModal('calories');
				}}
				disabled={$page.data.user.initCalories}
				class="px-2 py-1 bg-gray-300 m-1 disabled:bg-slate-600">Calories</button
			>
			<!-- Photo input -->
			<input
				type="file"
				bind:this={fileinput}
				style="display:none"
				accept=".jpg, .jpeg, .png"
				on:change={(e) => uploadToS3(e, true)}
			/>
			<button
				on:click={() => fileinput.click()}
				disabled={$page.data.user.initPhoto}
				class="px-2 py-1 bg-gray-300 m-1 disabled:bg-slate-600">Photo</button
			>
			<!-- BodyFat input -->
			<button
				on:click={() => toggleModal('bodyFat')}
				disabled={$page.data.user.initBF}
				class="px-2 py-1 bg-gray-300 m-1 disabled:bg-slate-600">BF%</button
			>
		</div>
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
