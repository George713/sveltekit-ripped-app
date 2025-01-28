<script lang="ts">
	import { page } from '$app/stores';
	import { eatenKcal, eatenProtein } from '$lib/stores';

	$: targetKcal = $page.data.user.currentCalorieTarget;
	$: targetProtein = $page.data.dailyProgress.targetProtein;
</script>

<!-- Progress Bars -->
<!-- <img src="/pizza.svg" alt="pizza.svg" class="bg-black mt-1.5 ml-2" style="float:left;" /> -->
<div class="mb-2 h-7 w-48 rounded-sm bg-gray-200 shadow-inner">
	<div
		class=" h-7 rounded-sm bg-yellow-200 shadow-inner"
		style="width: {Math.min(($eatenKcal / targetKcal) * 100, 100)}%"
	/>
</div>
<!-- <img src="/eggs.svg" alt="eggs.svg" class="bg-black mt-1.5 ml-[0.3rem]" style="float:left;" /> -->
<div class="h-7 w-48 rounded-sm bg-gray-200 shadow-inner">
	<div
		class=" h-7 rounded-sm bg-sky-400 shadow-inner"
		style="width: {Math.min(($eatenProtein / targetProtein) * 100, 100)}%"
	/>
</div>
