<script lang="ts">
	import { goto } from '$app/navigation';
	import ItemName from '$lib/components/newDesign/atoms/inputs/ItemName.svelte';
	import Minimizer from '$lib/components/newDesign/atoms/Minimizer.svelte';
	import NutrientSum from '$lib/components/newDesign/atoms/NutrientSum.svelte';
	import PhotoFrame from '$lib/components/newDesign/atoms/PhotoFrame.svelte';
	import IngredientInput from '$lib/components/newDesign/molecules/IngredientInput.svelte';
</script>

<!-- Minimizer horizontal -->
<div class="flex h-screen w-screen flex-col items-center px-6">
	<div class="justify-left mt-1 flex w-full translate-x-[-22px]">
		<Minimizer onclick={() => goto('/planner')} direction="left" />
	</div>
	<PhotoFrame />
	<ItemName />
	<IngredientInput />
	<NutrientSum kcal={0} protein={0} />
	<!-- Create Item -->
</div>
