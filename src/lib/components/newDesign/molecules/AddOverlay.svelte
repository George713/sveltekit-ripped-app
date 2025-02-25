<script lang="ts">
	import { estimatedItemManager, ingredientManager } from '$lib/stateManagers.svelte';
	import { onDestroy } from 'svelte';
	import BackgroundSemiTransparent from '../atoms/BackgroundSemiTransparent.svelte';
	import Button from '../atoms/Button.svelte';
	import Minimizer from '../atoms/Minimizer.svelte';
	import NutrientSum from '../atoms/NutrientSum.svelte';
	import IngredientInput from './IngredientInput.svelte';
	import { deserialize } from '$app/forms';

	interface Props {
		showAddOverlay: boolean;
	}

	let { showAddOverlay = $bindable() }: Props = $props();

	onDestroy(() => {
		ingredientManager.clear();
	});

	const handleSubmit = async () => {
		const formData = new FormData();
		formData.append('kcal', ingredientManager.totalKcal.toString());
		formData.append('protein', ingredientManager.totalProtein.toString());

		const response = await fetch('?/addEstimate', {
			method: 'POST',
			body: formData
		});

		const result = deserialize(await response.text());

		if (result.type === 'success' && result.data) {
			estimatedItemManager.addItem({
				id: result.data.id as number,
				eaten: false,
				createdAt: new Date(),
				kcal: ingredientManager.totalKcal,
				protein: ingredientManager.totalProtein
			});
		}

		showAddOverlay = false;
	};
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
