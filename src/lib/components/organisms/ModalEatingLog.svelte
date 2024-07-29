<script lang="ts">
	import { visibleOverlay } from '$lib/stores';

	// Atoms
	import TargetTracker from '$atoms/TargetTracker.svelte';
	import MinimizeBtn from '$atoms/MinimizeBtn.svelte';
	import Title from '$atoms/Title.svelte';
	import PlannerCardTitle from '$atoms/planner/PlannerCardTitle.svelte';
	// Molecules
	import CardArray from '$molecules/CardArray.svelte';
	import EatingLogBottomRow from '$molecules/EatingLogBottomRow.svelte';
	// Overlays
	import OverlayAddEstimate from '$overlays/AddEstimate.svelte';
	import Background from '$overlays/Background.svelte';
	import BackgroundPlanel from '$atoms/BackgroundPlanel.svelte';
</script>

<Background>
	<BackgroundPlanel>
		<Title title="Eating Log" />
		<!-- Daily Selection -->
		<div
			class="relative mb-1 flex h-[calc(86%)] w-[calc(100%-8px)] flex-col rounded-sm bg-neutral-100 shadow-[0_1px_1px_rgba(0,0,0,0.25)]"
		>
			<div class="m-1 flex justify-between">
				<PlannerCardTitle title="Daily Selection" color="neutral-500" />
				<TargetTracker mode="eating" />
			</div>
			<CardArray items={['planned', 'estimates']} verticalScroll={true} />
			<EatingLogBottomRow />
		</div>
		<MinimizeBtn viewTarget="none" />
	</BackgroundPlanel>
</Background>

{#if $visibleOverlay == 'addEstimate'}
	<OverlayAddEstimate />
{/if}
