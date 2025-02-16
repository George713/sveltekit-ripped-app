<script lang="ts">
	import { goto, invalidateAll } from '$app/navigation';
	import Button from '$lib/components/newDesign/atoms/Button.svelte';
	import Minimizer from '$lib/components/newDesign/atoms/Minimizer.svelte';
	import FoodLibrary from '$lib/components/newDesign/organisms/FoodLibrary.svelte';
	import FoodSelection from '$lib/components/newDesign/organisms/FoodSelection.svelte';
	import {
		calorieManager,
		dailySelectionManager,
		toastManager,
		visibilityManager
	} from '$lib/stateManagers.svelte';

	let notificationSent = $state(false);

	const endPlanning = async () => {
		// Show toast with attention message if range is not met
		if (!dailySelectionManager.inRange && !notificationSent) {
			toastManager.addToast({
				type: 'attention',
				message: `You get extra XP for having planned items in the range of +-25 kcal of your caloric target (${calorieManager.target} kcal).`,
				timeout: 6000
			});
			notificationSent = true;
			setTimeout(() => {
				notificationSent = false;
			}, 30000);
			return;
		}

		// Show spinner & hide toasts if there are still some
		visibilityManager.toggleSpinnerOverlay();
		toastManager.deleteAll();

		// Submit planned items to server
		const formData = new FormData();
		formData.append('items', JSON.stringify(dailySelectionManager.prepareForSubmission()));
		const response = await fetch('?/finishPlanning', {
			method: 'POST',
			body: formData
		});

		// Return to main screen
		if (response.ok) {
			// TODO: Add xp to xpManager
			await goto('/');
			invalidateAll();
		}

		// Hide spinner
		visibilityManager.toggleSpinnerOverlay();
	};
</script>

<div class="mb-1 flex h-screen w-screen flex-col-reverse items-center p-1">
	<Minimizer onclick={() => goto('/')} direction="down" />
	<div class="h-8"></div>
	<div class="flex w-full justify-end p-2">
		<Button text="End Planning" variant="secondary" onclick={endPlanning} />
	</div>
	<FoodLibrary />
	<div class="h-8"></div>
	<FoodSelection />
</div>
