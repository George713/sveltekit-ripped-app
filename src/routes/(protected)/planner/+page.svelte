<script lang="ts">
	import { goto } from '$app/navigation';
	import Button from '$lib/components/newDesign/atoms/Button.svelte';
	import Minimizer from '$lib/components/newDesign/atoms/Minimizer.svelte';
	import FoodLibrary from '$lib/components/newDesign/organisms/FoodLibrary.svelte';
	import FoodSelection from '$lib/components/newDesign/organisms/FoodSelection.svelte';
</script>

<div class="flex h-screen w-screen flex-col-reverse items-center gap-y-2 p-1">
	<Minimizer onclick={() => goto('/')} />
	<Button text="End Planning" />
	<FoodLibrary />
	<FoodSelection />
</div>
