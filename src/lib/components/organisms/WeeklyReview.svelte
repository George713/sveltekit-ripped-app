<script lang="ts">
	import { visibleOverlay, weightTrend } from '$lib/stores';

	import GraphWeight from '$atoms/GraphWeight.svelte';
	import ReviewText from '$atoms/ReviewText.svelte';
	import ReviewButtons from '$molecules/ReviewButtons.svelte';
	import ReviewInfoBoxes from '$molecules/ReviewInfoBoxes.svelte';
	import AdjustCalories from '$overlays/AdjustCalories.svelte';

	$: weightDiff = $weightTrend.slice(-1)[0] - $weightTrend.slice(-7)[0];
</script>

<div class="absolute top-0 h-full w-full bg-white">
	<div class="flex flex-col">
		<!-- Heading -->
		<div class="my-3 text-center text-lg font-bold text-stone-600">Weekly Review</div>
		<GraphWeight />
		<ReviewInfoBoxes />
		<div class="my-8">
			<ReviewText {weightDiff} />
		</div>
		<ReviewButtons {weightDiff} />
	</div>
</div>

{#if $visibleOverlay == 'adjustCalories'}
	<AdjustCalories />
{/if}
