<script lang="ts">
	import { activeSetId, selectedForNewSet } from '$lib/stores';

	// Atoms
	import BackgroundPlanel from '$atoms/BackgroundPlanel.svelte';
	import Title from '$atoms/Title.svelte';
	import MinimizeBtn from '$atoms/MinimizeBtn.svelte';
	// Molecules
	import Selection from '$molecules/planner/Selection.svelte';
	import FoodLibraryPlanner from '$molecules/planner/FoodLibraryPlanner.svelte';
	// Overlays
	import Background from '$overlays/Background.svelte';
</script>

<Background>
	<BackgroundPlanel>
		<Title title={$activeSetId ? 'Edit Set' : 'New Set'} />
		<Selection title={'Selected'} selection={selectedForNewSet} mode="set" />
		<FoodLibraryPlanner setPlanningMode={true} />
		<MinimizeBtn viewTarget="none" />
	</BackgroundPlanel>
</Background>
