<script lang="ts">
	import FoodLibraryPlanner from '$molecules/planner/FoodLibraryPlanner.svelte';
	import Selection from '$molecules/planner/Selection.svelte';
	import Title from '$atoms/Title.svelte';
	import MinimizeBtn from '$atoms/MinimizeBtn.svelte';
	import Background from '$overlays/Background.svelte';
	import BackgroundPlanel from '$atoms/BackgroundPlanel.svelte';
</script>

<Background>
	<BackgroundPlanel>
		<Title title="New Day" />
		<Selection title={'Selected'} />
		<FoodLibraryPlanner newDayPlanning={true} />
		<MinimizeBtn viewTarget="none" />
	</BackgroundPlanel>
</Background>
