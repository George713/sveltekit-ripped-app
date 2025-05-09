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

	let setIsReady = $derived(setSelectionManager.name && setSelectionManager.items.length > 1);

	const handleUpsert = async () => {
		if (!setIsReady) {
			return;
		}

		visibilityManager.toggleSpinnerOverlay();

		const formData = new FormData();
		formData.append('name', setSelectionManager.name);
		formData.append('items', JSON.stringify(setSelectionManager.prepareForSubmission()));
		formData.append('setId', setId ? setId.toString() : '');

		const response = await fetch('?/upsertSet', {
			method: 'POST',
			body: formData
		});

		const result = deserialize(await response.text());

		if (result.type === 'success' && result.data) {
			const set = {
				id: result.data.setId,
				name: setSelectionManager.name,
				foodItemsInSet: setSelectionManager.items.map((item) => ({
					foodId: item.foodId
				}))
			} as FoodSet;
			foodSetManager.items = [...foodSetManager.items.filter((set) => set.id !== setId), set];
		}

		goto('/planner?showSets=true');

		visibilityManager.toggleSpinnerOverlay();
	};

	const handleDelete = async (setId: number) => {
		visibilityManager.toggleSpinnerOverlay();

		const formData = new FormData();
		formData.append('setId', setId.toString());

		const response = await fetch('?/deleteSet', {
			method: 'POST',
			body: formData
		});

		if (response.ok) {
			foodSetManager.items = foodSetManager.items.filter((set) => set.id !== setId);
			goto('/planner?showSets=true');
		}

		visibilityManager.toggleSpinnerOverlay();
	};
</script>

<form class="flex h-full w-screen flex-col items-center justify-end space-y-5 px-1 pb-4">
	<div class="relative flex w-full">
		<FoodSelection selectionManager={setSelectionManager} headerAsInput={true} />
		{#if setId}
			<button
				class="absolute right-1 rounded px-3 py-2 text-xs text-stone-600"
				onclick={() => handleDelete(setId)}
			>
				Delete Set
			</button>
		{/if}
	</div>
	<FoodLibrary
		showNewElementCard={false}
		showSubtleBtn={false}
		selectionManager={setSelectionManager}
	/>
	<div class="relative flex w-full items-center justify-center">
		<div class="absolute left-3">
			<Minimizer onclick={() => goto('/planner?showSets=true')} direction="left" />
		</div>
		<Button
			text={setId ? 'Update Set' : 'Create Set'}
			onclick={handleUpsert}
			disabled={!setIsReady}
			classAddons="px-4"
		/>
	</div>
</form>
