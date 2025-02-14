<script lang="ts">
	import { goto } from '$app/navigation';
	import Button from '$lib/components/newDesign/atoms/Button.svelte';
	import Minimizer from '$lib/components/newDesign/atoms/Minimizer.svelte';
	import FoodLibrary from '$lib/components/newDesign/organisms/FoodLibrary.svelte';
	import FoodSelection from '$lib/components/newDesign/organisms/FoodSelection.svelte';

	const endPlanning = async () => {
		// TODO: Implement end planning
	};
</script>

<div class="mb-1 flex h-screen w-screen flex-col-reverse items-center p-1">
	<Minimizer onclick={() => goto('/')} />
	<div class="h-8"></div>
	<div class="flex w-full justify-end p-2">
		<Button text="End Planning" variant="secondary" onclick={endPlanning} />
	</div>
	<FoodLibrary />
	<div class="h-8"></div>
	<FoodSelection />
</div>
