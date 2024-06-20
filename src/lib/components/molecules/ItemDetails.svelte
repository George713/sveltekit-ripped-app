<!-- ItemDetails.svelte -->
<script lang="ts">
	// Atoms
	import Card from '$atoms/inputs/Card.svelte';
	import ItemImage from '$atoms/inputs/ItemImage.svelte';
	import ItemName from '$atoms/inputs/ItemName.svelte';
	import BtnMinimize from '$atoms/BtnMinimize.svelte';
	import ItemBackground from '$atoms/ItemBackground.svelte';
	import BtnSubmit from '$atoms/BtnSubmit.svelte';
	import Nutrients from '$atoms/inputs/Nutrients.svelte';
	import CardExtension from '$atoms/inputs/CardExtension.svelte';
	import NutrientsPer100 from '$atoms/inputs/NutrientsPer100.svelte';
	// Overlays
	import Background from '$overlays/Background.svelte';

	export let title: string;
	export let submitBtnText: string;
	export let submitBtnSymbol: string;

	export let imageString: string = '';
	let fileInput: HTMLInputElement;

	export let foodId: number | null = null;
	export let itemName: string | null = null;
	export let activeUnitIsPtn: boolean;
	export let unitAmount: number; // serves as umbrella for ptnAmount & gramAmount
	export let ptnAmount: number;
	export let gramAmount: number;
	export let kcal: number | string;
	export let protein: number | string;
	export let defaultPtnSizeInGram: number | string;
	export let kcalPer100: number | string;
	export let proteinPer100: number | string;

	export let handleSubmit: (event: Event) => void;

	const handleNutrientsChange = (event: CustomEvent) => {
		const { type, detail } = event;
		switch (type) {
			case 'unitAmount':
				/**
				 * This logic ensures that kcal and protein are updated
				 * when the unit is `ptn` and and amount is adjusted.
				 */
				if (activeUnitIsPtn) {
					const unitAmountBefore = unitAmount;

					unitAmount = Number(detail);

					kcal = ((unitAmount / unitAmountBefore) * Number(kcal)).toFixed(0);
					protein = ((unitAmount / unitAmountBefore) * Number(protein)).toFixed(1);
				} else {
					unitAmount = Number(detail);
				}
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
		<p class="relative top-2 text-2xl font-semibold text-gray-200">{title}</p>

		<!-- Card -->
		<form method="POST" autocomplete="off" on:submit|preventDefault={handleSubmit}>
			<Card>
				<ItemImage {imageString} {fileInput} {foodId} />
				<ItemName {itemName} />
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
			<BtnSubmit text={submitBtnText} symbol={submitBtnSymbol} />
		</form>

		<!-- Minimize Symbol -->
		<div class="absolute bottom-3">
			<BtnMinimize />
		</div>
	</ItemBackground>
</Background>
