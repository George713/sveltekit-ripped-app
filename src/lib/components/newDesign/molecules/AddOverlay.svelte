<script lang="ts">
	import { goto } from '$app/navigation';
	import { ingredientManager } from '$lib/stateManagers.svelte';
	import BackgroundSemiTransparent from '../atoms/BackgroundSemiTransparent.svelte';
	import Button from '../atoms/Button.svelte';
	import Minimizer from '../atoms/Minimizer.svelte';
	import NutrientSum from '../atoms/NutrientSum.svelte';
	import IngredientInput from './IngredientInput.svelte';

	interface Props {
		showAddOverlay: boolean;
	}

	let { showAddOverlay = $bindable() }: Props = $props();

	const handleSubmit = () => {};
</script>

<BackgroundSemiTransparent>
	<form class="flex h-screen w-screen flex-col items-center px-5">
		<div class="justify-left mt-2 flex w-full translate-x-[-16px]">
			<Minimizer
				onclick={() => {
					showAddOverlay = false;
					ingredientManager.clear();
				}}
				direction="left"
			/>
		</div>
		<IngredientInput hidden3rdBtn={true} />
		<div class="mt-[11px] w-full">
			<NutrientSum kcal={ingredientManager.totalKcal} protein={ingredientManager.totalProtein} />
		</div>
		<div class="my-6">
			<Button
				text="Log Entry"
				onclick={handleSubmit}
				disabled={ingredientManager.items.length === 0}
				classAddons="px-6"
			/>
		</div>
	</form>
</BackgroundSemiTransparent>
