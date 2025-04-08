<script lang="ts">
	import { onDestroy } from 'svelte';
	import { deserialize } from '$app/forms';
	import { goto } from '$app/navigation';
	import { page } from '$app/state';

	import {
		setSelectionManager,
		visibilityManager,
		foodSetManager
	} from '$lib/stateManagers.svelte';

	import Button from '$lib/components/newDesign/atoms/Button.svelte';
	import Minimizer from '$lib/components/newDesign/atoms/Minimizer.svelte';
	import FoodLibrary from '$lib/components/newDesign/organisms/FoodLibrary.svelte';
	import FoodSelection from '$lib/components/newDesign/organisms/FoodSelection.svelte';
	import type { FoodSet } from '$lib/types';

	const setId = page.url.searchParams.get('setId')
		? Number(page.url.searchParams.get('setId'))
		: null;

	if (setId) {
		setSelectionManager.addFoodSet(foodSetManager.getById(setId) as FoodSet);
		setSelectionManager.name = foodSetManager.getById(setId)?.name || '';
	}

	onDestroy(() => {
		setSelectionManager.clear();
	});

	let newSetIsReady = $derived(setSelectionManager.name && setSelectionManager.items.length > 1);

	const handleSubmit = async () => {
		if (!newSetIsReady) {
			return;
		}

		visibilityManager.toggleSpinnerOverlay();

		const formData = new FormData();
		formData.append('name', setSelectionManager.name);
		formData.append('items', JSON.stringify(setSelectionManager.prepareForSubmission()));

		const response = await fetch('?/set', {
			method: 'POST',
			body: formData
		});

		const result = deserialize(await response.text());

		if (result.type === 'success' && result.data) {
			const newSet = {
				id: result.data.setId,
				name: setSelectionManager.name,
				foodItemsInSet: setSelectionManager.items.map((item) => ({
					foodId: item.foodId,
					unitIsPtn: true,
					unitAmount: 1
				}))
			};
			foodSetManager.addSet(newSet as FoodSet);
		}

		goto('/planner?showSets=true');

		visibilityManager.toggleSpinnerOverlay();
	};
</script>

<form class="flex h-screen w-screen flex-col items-center px-6">
	<div class="justify-left mt-2 flex w-full translate-x-[-18px]">
		<Minimizer onclick={() => goto('/planner?showSets=true')} direction="left" />
	</div>
	<div class="mb-1 flex h-screen w-screen flex-col-reverse items-center p-1">
		<div class="my-6">
			<Button
				text={setId ? 'Update Set' : 'Create Set'}
				onclick={handleSubmit}
				disabled={!newSetIsReady}
				classAddons="px-4"
			/>
		</div>
		<FoodLibrary
			showNewElementCard={false}
			showSubtleBtn={false}
			selectionManager={setSelectionManager}
		/>
		<div class="h-8"></div>
		<FoodSelection selectionManager={setSelectionManager} headerAsInput={true} />
	</div>
</form>
