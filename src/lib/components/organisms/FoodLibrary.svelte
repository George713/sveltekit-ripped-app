<script lang="ts">
	import { showSpinner, visibleView } from '$lib/stores';

	// Atoms
	import Title from '$atoms/Title.svelte';
	import SwitchItemsDays from '$atoms/SwitchItemsDays.svelte';
	import PlannerCardTitle from '$atoms/planner/PlannerCardTitle.svelte';
	import MinimizeBtn from '$atoms/MinimizeBtn.svelte';
	// Molecules
	import CardArray from '$molecules/CardArray.svelte';
	import FoodLibBottomRow from '$molecules/FoodLibBottomRow.svelte';
	// Overlays
	import Spinner from '$overlays/Spinner.svelte';
	import Background from '$overlays/Background.svelte';
	import BackgroundPlanel from '$atoms/BackgroundPlanel.svelte';
</script>

<Background>
	<BackgroundPlanel>
		<Title title="Food Library" />
		<!-- Food Library -->
		<div
			class=" flex w-[calc(100%-8px)] grow flex-col rounded-sm bg-neutral-600 shadow-[0_1px_1px_rgba(0,0,0,0.25)]"
		>
			<div class="m-1 flex h-6 items-center justify-between">
				<PlannerCardTitle title="Food Library" color="neutral-300" />
				<SwitchItemsDays />
			</div>
			<CardArray items={['food']} verticalScroll={true} />
			<FoodLibBottomRow />
		</div>
		<MinimizeBtn viewTarget="eat" />
	</BackgroundPlanel>
</Background>

<Spinner showSpinner={$showSpinner} />
