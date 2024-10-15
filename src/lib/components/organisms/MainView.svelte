<script lang="ts">
	import { page } from '$app/stores';

	// Atoms
	import BodyfatButton from '$atoms/BodyfatButton.svelte';
	import HarvestButton from '$atoms/HarvestButton.svelte';
	import PowerUps from '$atoms/PowerUps.svelte';
	import ProgessBars from '$atoms/ProgessBars.svelte';
	import ProgressPicButton from '$atoms/ProgressPicButton.svelte';
	import SigilEmpty from '$atoms/sigils/SigilEmpty.svelte';
	import TargetTracker from '$atoms/TargetTracker.svelte';
	// Molecules
	import DailyActionBtns from '$molecules/DailyActionBtns.svelte';
	import InitialInputs from '$molecules/InitialInputs.svelte';
	import SigilNavPoints from '$molecules/SigilNavPoints.svelte';
</script>

<!-- ONBOARDING -->
{#if !$page.data.user.initCalories || !$page.data.user.initPhoto || !$page.data.user.initBF}
	<!-- Empty Sigil  -->
	<SigilEmpty />
	<!-- Desired Action Buttons for Initial Inputs -->
	<InitialInputs />
	<!-- SCAFFOLDING -->
{:else}
	<!-- Sigil with Navigation elements and points -->
	<SigilNavPoints />
	<!-- PowerUps, Bars, Tracker, Harvest Button, Progress Picture Button -->
	<div class="flex h-[calc(25vh)] w-full">
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
				<TargetTracker large={true} mode="eating" />
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
	<DailyActionBtns />
{/if}
