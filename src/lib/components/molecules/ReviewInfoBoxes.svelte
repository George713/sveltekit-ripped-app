<script lang="ts">
	import { page } from '$app/stores';

	import InfoBox from '$molecules/InfoBox.svelte';

	import { weightTrend } from '$lib/stores';

	$: weightDiff = $weightTrend.slice(-1)[0] - $weightTrend.slice(-7)[0];
</script>

<div class="flex mt-5 justify-center space-x-4">
	<!-- Box 1: Calories -->
	<InfoBox
		mainText="Calorie Target"
		subText="per day"
		value={$page.data.user.currentCalorieTarget}
		unit="kcal"
		color="yellow-400"
	/>
	<!-- Box 2: Weight Trend -->
	<InfoBox
		mainText="Weight Trend"
		subText="past 7 days"
		value={weightDiff < 0 ? '' : '+' + weightDiff.toFixed(2)}
		unit="kg"
		color="blue-300"
	/>
</div>
