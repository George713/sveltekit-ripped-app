<script lang="ts">
	import { goto } from '$app/navigation';
	import Button from '$lib/components/newDesign/atoms/Button.svelte';
	import Minimizer from '$lib/components/newDesign/atoms/Minimizer.svelte';
	import FoodLibrary from '$lib/components/newDesign/organisms/FoodLibrary.svelte';
	import FoodSelection from '$lib/components/newDesign/organisms/FoodSelection.svelte';
	import { setSelectionManager, visibilityManager } from '$lib/stateManagers.svelte';
	import { onDestroy } from 'svelte';

	onDestroy(() => {
		setSelectionManager.clear();
	});

	const handleSubmit = async () => {
		// if (!itemName) {
		// 	return;
		// }
		// if (!imageBlob) {
		// 	toastManager.addToast({
		// 		type: 'error',
		// 		message: 'An image is required for new items.',
		// 		timeout: 5000
		// 	});
		// 	return;
		// }

		visibilityManager.toggleSpinnerOverlay();

		// const formData = new FormData();
		// formData.append('name', itemName);
		// formData.append('kcal', ingredientManager.totalKcal.toFixed(0));
		// formData.append('protein', ingredientManager.totalProtein.toFixed(1));

		// const response = await fetch('?/newItem', {
		// 	method: 'POST',
		// 	body: formData
		// });

		// const result = deserialize(await response.text());

		// if (result.type === 'success' && result.data) {
		// 	// Upload image to s3 using presignURL
		// 	// @ts-ignore
		// 	await fetch(result.data.presignedURL, {
		// 		method: 'PUT',
		// 		body: imageBlob
		// 	});

		// 	const newItem = result.data.newItem as FoodItem;
		// 	foodItemManager.items = [...foodItemManager.items, newItem];
		// }

		goto('/planner');

		visibilityManager.toggleSpinnerOverlay();
	};
</script>

<div class="flex h-screen w-screen flex-col items-center px-6">
	<div class="justify-left mt-2 flex w-full translate-x-[-18px]">
		<Minimizer onclick={() => goto('/planner')} direction="left" />
	</div>
	<div class="mb-1 flex h-screen w-screen flex-col-reverse items-center p-1">
		<div class="my-6">
			<Button text="Create Set" onclick={handleSubmit} />
		</div>
		<FoodLibrary
			showNewElementCard={false}
			showSubtleBtn={false}
			selectionManager={setSelectionManager}
		/>
		<div class="h-8"></div>
		<FoodSelection selectionManager={setSelectionManager} />
	</div>
</div>
