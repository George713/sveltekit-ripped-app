<!-- NewItem.svelte -->
<script lang="ts">
	import { deserialize } from '$app/forms';
	import { foodLibrary, showSpinner, visibleView } from '$lib/stores';
	import type { FoodItem } from '$lib/types';

	import Card from '$atoms/inputs/Card.svelte';
	import ItemImage from '$atoms/inputs/ItemImage.svelte';
	import ItemName from '$atoms/inputs/ItemName.svelte';
	import BtnMinimize from '$atoms/BtnMinimize.svelte';
	import ItemBackground from '$atoms/ItemBackground.svelte';
	import Background from '$overlays/Background.svelte';
	import BtnSubmit from '$atoms/BtnSubmit.svelte';
	import Nutrients from '$atoms/inputs/Nutrients.svelte';
	import CardExtension from '$atoms/inputs/CardExtension.svelte';
	import NutrientsPer100 from '$atoms/inputs/NutrientsPer100.svelte';

	let imageString = '';
	let fileinput: HTMLInputElement;

	let activeUnitIsPtn = true;
	let unitAmount = 1; // serves as umbrella for ptnAmount & gramAmount
	let ptnAmount = 1;
	let gramAmount = 100;
	let kcal: number | string = '';
	let protein: number | string = '';
	let defaultPtnSizeInGram: number | string = '';
	let kcalPer100: number | string = '';
	let proteinPer100: number | string = '';

	const handleSubmit = async (event: Event) => {
		// Show spinner
		$showSpinner = true;

		const response = await fetch('?/newItem', {
			method: 'POST',
			body: new FormData(event.target as HTMLFormElement)
		});

		const result = deserialize(await response.text());

		if (result.type === 'success' && result.data) {
			// Upload image to s3 using presignURL
			// @ts-ignore
			await fetch(result.data.presignedURL, {
				method: 'PUT',
				body: imageString
			});
			const newItem = result.data.newItem as FoodItem;

			// Update foodLibrary
			foodLibrary.update((items) => {
				// @ts-ignore
				return [...items, newItem];
			});
		}

		// Return to previous modal
		visibleView.update($visibleView.previous);

		// Hide spinner
		$showSpinner = false;
	};

	const handleNutrientsChange = (event: CustomEvent) => {
		const { type, detail } = event;
		switch (type) {
			case 'unitAmount':
				unitAmount = Number(detail);
				break;
			case 'kcal':
				kcal = Number(detail);
				break;
			case 'protein':
				protein = Number(detail);
				break;
			case 'activeUnitIsPtn':
				activeUnitIsPtn = detail;
				unitAmount = activeUnitIsPtn ? ptnAmount : gramAmount;
				break;
			case 'defaultPtnSizeInGram':
				defaultPtnSizeInGram = Number(detail);
				break;
			case 'kcalPer100':
				kcalPer100 = Number(detail);
				break;
			case 'proteinPer100':
				proteinPer100 = Number(detail);
				break;
		}

		// Parse base values for typing reasons
		const kcalNum = Number(kcal);
		const proteinNum = Number(protein);
		const defaultPtnSizeNum = Number(defaultPtnSizeInGram);

		if (unitAmount) {
			if (kcal) {
				if (activeUnitIsPtn) {
					ptnAmount = unitAmount;
					kcalPer100 = ((100 / defaultPtnSizeNum / ptnAmount) * kcalNum).toFixed(0);
				} else {
					gramAmount = unitAmount;
					kcalPer100 = ((100 / gramAmount) * kcalNum).toFixed(0);
				}
			}
			if (protein) {
				if (activeUnitIsPtn) {
					ptnAmount = unitAmount;
					proteinPer100 = ((100 / defaultPtnSizeNum / ptnAmount) * proteinNum).toFixed(1);
				} else {
					gramAmount = unitAmount;
					proteinPer100 = ((100 / gramAmount) * proteinNum).toFixed(1);
				}
			}
		}
	};
</script>

<Background>
	<ItemBackground>
		<!-- Title: Planner -->
		<p class="relative top-2 text-2xl font-semibold text-gray-200">New Item</p>

		<!-- Card -->
		<form method="POST" autocomplete="off" on:submit|preventDefault={handleSubmit}>
			<Card>
				<ItemImage {imageString} {fileinput} />
				<ItemName />
				<Nutrients
					{unitAmount}
					{activeUnitIsPtn}
					{kcal}
					{protein}
					on:unitAmount={handleNutrientsChange}
					on:kcal={handleNutrientsChange}
					on:protein={handleNutrientsChange}
					on:activeUnitIsPtn={handleNutrientsChange}
				/>
			</Card>
			<CardExtension>
				<p class="text-center text-xs text-neutral-200/40">optional</p>
				<NutrientsPer100
					{defaultPtnSizeInGram}
					{kcalPer100}
					{proteinPer100}
					on:defaultPtnSizeInGram={handleNutrientsChange}
					on:kcalPer100={handleNutrientsChange}
					on:proteinPer100={handleNutrientsChange}
				/>
			</CardExtension>
			<BtnSubmit text="Add Item" symbol="plus" />
		</form>

		<!-- Minimize Symbol -->
		<div class="absolute bottom-3">
			<BtnMinimize />
		</div>
	</ItemBackground>
</Background>
