<script lang="ts">
	import { deserialize } from '$app/forms';
	import ItemBackground from '$atoms/ItemBackground.svelte';
	import ItemImageInput from '$atoms/ItemImageInput.svelte';
	import BtnMinimize from '$atoms/BtnMinimize.svelte';
	import { foodLibrary, showSpinner, visibleView } from '$lib/stores';
	import type { FoodItem } from '$lib/types';
	import Background from '$overlays/Background.svelte';
	import BtnSubmit from '$atoms/BtnSubmit.svelte';

	let imageString = '';
	let fileinput: HTMLInputElement;
	let activeUnitIsPTN = true;

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

	let unitAmount = 1; // serves as umbrella for portionAmount & gramAmount
	let portionAmount = 1;
	let gramAmount = 100;
	let kcal: number | string = '';
	let protein: number | string = '';
	let defaultPtnSizeInGram: number | string = '';
	let kcalPer100: number | string = '';
	let proteinPer100: number | string = '';

	const handleChangePtnSize = () => {
		// Parse base values for typing reasons
		const kcalNum = Number(kcal);
		const proteinNum = Number(protein);
		const defaultPtnSizeNum = Number(defaultPtnSizeInGram);

		if (unitAmount && kcal && protein) {
			if (activeUnitIsPTN) {
				portionAmount = unitAmount;
				kcalPer100 = ((100 / defaultPtnSizeNum / portionAmount) * kcalNum).toFixed(0);
				proteinPer100 = ((100 / defaultPtnSizeNum / portionAmount) * proteinNum).toFixed(1);
			} else {
				gramAmount = unitAmount;
				kcalPer100 = ((100 / gramAmount) * kcalNum).toFixed(0);
				proteinPer100 = ((100 / gramAmount) * proteinNum).toFixed(1);
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
			<div
				class="relative mt-12 h-[260px] w-[234px] overflow-hidden rounded-md
		border-2 border-neutral-500 shadow-[0.5px_0.5px_2px_rgba(0,0,0,0.3)]"
			>
				<ItemImageInput {imageString} {fileinput} />
				<!-- Item Name -->
				<input
					class="mx-3 mt-2 w-[calc(90%)] bg-transparent text-[18px] font-medium text-neutral-200 focus:outline-none"
					name="itemName"
					type="text"
					placeholder="Item Name..."
					required
				/>
				<!-- Section for portion, kcal, protein -->
				<div class="mt-3 flex px-1 text-neutral-200">
					<!-- Portion -->
					<div class="flex flex-auto items-center">
						<input
							class="ml-2 mr-1 w-[35px] text-center focus:outline-none bg-black/20 rounded py-0.5"
							name="unitAmount"
							bind:value={unitAmount}
							on:input={handleChangePtnSize}
							type="number"
						/>
						<!-- value={activeUnitIsPTN ? portionAmount : gramAmount} -->
						<div class="relative bg-black/20 rounded flex items-baseline py-0.5">
							<input
								class="opacity-0 absolute w-full h-full z-10"
								type="text"
								value={activeUnitIsPTN ? 'ptn' : 'grams'}
								name="unit"
								on:click={() => {
									activeUnitIsPTN = !activeUnitIsPTN;
									unitAmount = activeUnitIsPTN ? portionAmount : gramAmount;
									handleChangePtnSize();
								}}
								readonly
							/>
							<div class="flex flex-col px-2 mt-[-5px] w-16">
								<p>{activeUnitIsPTN ? 'ptn' : 'grams'}</p>
								<div class="flex">
									<p class="text-xs font-light opacity-50">/</p>
									<p class="text-xs font-semilight opacity-50">
										{activeUnitIsPTN ? 'grams' : 'ptn'}
									</p>
								</div>
							</div>
						</div>
					</div>

					<!-- Calories & Protein-->
					<div class="flex flex-col pr-1 text-right font-light">
						<label class="flex justify-end">
							kcal:
							<input
								class="flex w-[45px] flex-col bg-transparent pr-[1px] text-right font-light focus:outline-none"
								name="kcal"
								placeholder="...  "
								type="number"
								step="1"
								bind:value={kcal}
								required
							/>
						</label>
						<label class="flex">
							protein:
							<input
								class="flex w-9 flex-col bg-transparent pr-1 text-right font-light focus:outline-none"
								name="protein"
								placeholder="... "
								type="number"
								step="0.1"
								bind:value={protein}
								required
							/>
							g
						</label>
					</div>
				</div>
			</div>
			<!-- Lower Card Part: default portion size, per 100g -->
			<div
				class="pt-1 pb-2 rounded-b-md border-2 border-t-0 w-[234px] border-neutral-500 shadow-[0.5px_0.5px_2px_rgba(0,0,0,0.3)]"
			>
				<p class="text-center text-xs text-neutral-200/40">optional</p>
				<div class="flex text-neutral-200/70 ml-2">
					<!-- Left: Default Portion Size -->
					<div class="flex flex-col justify-end w-1/4 items-center">
						<p class="text-xs text-center mb-1">default portion size (g)</p>
						<input
							class="w-[40px] text-center text-sm focus:outline-none bg-neutral-800/20 rounded py-0.5"
							name="defaultPtnSizeInGram"
							placeholder="..."
							type="number"
							bind:value={defaultPtnSizeInGram}
							on:input={handleChangePtnSize}
						/>
					</div>
					<!-- Right: kcal, protein per 100g -->
					<div class="flex flex-col text-sm items-end justify-end space-y-1 flex-grow pr-2">
						<p class="text-xs text-neutral-200/40">per 100g</p>
						<!-- kcal -->
						<div class="flex items-center">
							<p>kcal:</p>
							<input
								class="ml-2 mr-1 w-[40px] text-center focus:outline-none bg-neutral-800/20 rounded py-0.5"
								name="kcalPer100"
								placeholder="..."
								type="number"
								step="1"
								bind:value={kcalPer100}
							/>
						</div>
						<!-- protein -->
						<div class="flex items-center">
							<p>protein:</p>
							<input
								class="ml-2 mr-1 w-[40px] text-center focus:outline-none bg-neutral-800/20 rounded py-0.5"
								name="proteinPer100"
								placeholder="... g"
								type="number"
								step="0.1"
								bind:value={proteinPer100}
							/>
						</div>
					</div>
				</div>
			</div>
			<BtnSubmit text="Add Item" symbol="plus" />
		</form>

		<!-- Minimize Symbol -->
		<div class="absolute bottom-3">
			<BtnMinimize />
		</div>
	</ItemBackground>
</Background>
