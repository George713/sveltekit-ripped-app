<script lang="ts">
	import { page } from '$app/stores';

	import { visibleOverlay, visibleView, weightTrend } from '$lib/stores';

	import GraphWeight from '$atoms/GraphWeight.svelte';
	import ReviewText from '$atoms/ReviewText.svelte';
	import ReviewButtons from '$molecules/ReviewButtons.svelte';
	import ReviewInfoBoxes from '$molecules/ReviewInfoBoxes.svelte';
	import AdjustCalories from '$overlays/AdjustCalories.svelte';
	import ReviewUpcoming from '$atoms/ReviewUpcoming.svelte';
	import GraphWeight2 from '$atoms/GraphWeight2.svelte';

	$: weightDiff = $weightTrend.slice(-1)[0] - $weightTrend.slice(-7)[0];
</script>

<div
	class="absolute top-0 h-full w-full bg-white"
	on:click|self={() => visibleView.update('None')}
	on:keydown|self={() => visibleView.update('None')}
	role="button"
	tabindex="0"
>
	<div class="flex flex-col">
		<!-- Heading -->
		<div class="my-3 text-center text-lg font-bold text-stone-600">Weekly Review</div>
		<GraphWeight2 />
		<ReviewInfoBoxes />
		{#if !$page.data.user.reviewToday || $page.data.locals?.weeklyReview}
			<ReviewUpcoming />
		{:else}
			<ReviewText {weightDiff} />
			<ReviewButtons {weightDiff} />
		{/if}
	</div>
</div>

{#if $visibleOverlay == 'adjustCalories'}
	<AdjustCalories />
{/if}
