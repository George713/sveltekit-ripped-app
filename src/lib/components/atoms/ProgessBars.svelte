<script lang="ts">
	import { page } from '$app/stores';
	import { eatenKcal, eatenProtein } from '$lib/stores';

	$: targetKcal = $page.data.user.currentCalorieTarget;
	$: targetProtein = $page.data.dailyProgress.targetProtein;
</script>

<!-- Progress Bars -->
<!-- <img src="/pizza.svg" alt="pizza.svg" class="bg-black mt-1.5 ml-2" style="float:left;" /> -->
<div class="rounded bg-gray-200 w-48 h-7 mb-2 shadow-inner">
	<div
		class=" rounded bg-yellow-200 h-7 shadow-inner"
		style="width: {Math.min(($eatenKcal / targetKcal) * 100, 100)}%"
	/>
</div>
<!-- <img src="/eggs.svg" alt="eggs.svg" class="bg-black mt-1.5 ml-[0.3rem]" style="float:left;" /> -->
<div class="rounded bg-gray-200 w-48 h-7 shadow-inner">
	<div
		class=" rounded bg-sky-400 h-7 shadow-inner"
		style="width: {Math.min(($eatenProtein / targetProtein) * 100, 100)}%"
	/>
</div>
