<script lang="ts">
	import { calorieManager, proteinManager } from '$lib/stateManagers.svelte';

	import DigitalCounter from '../atoms/DigitalCounter.svelte';
	import PowerBar from '../atoms/PowerBar.svelte';
</script>

<div class="flex flex-col items-center space-y-2" style="transform: translateX(-5%);">
	<DigitalCounter
		kcalCurrent={calorieManager.eaten}
		kcalTarget={calorieManager.target}
		proteinCurrent={proteinManager.eaten}
		proteinTarget={proteinManager.target}
	/>
	<PowerBar />
</div>
