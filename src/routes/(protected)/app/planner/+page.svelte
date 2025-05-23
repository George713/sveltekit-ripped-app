<script lang="ts">
	import { goto, invalidate } from '$app/navigation';

	import {
		animationManager,
		dailySelectionManager,
		toastManager,
		visibilityManager
	} from '$lib/stateManagers.svelte';

	import Button from '$atoms/Button.svelte';
	import Minimizer from '$atoms/Minimizer.svelte';
	import FoodLibrary from '$organisms/FoodLibrary.svelte';
	import FoodSelection from '$organisms/FoodSelection.svelte';

	let notificationSent = $state(false);

	const endPlanning = async () => {
		// Show toast with attention message if range is not met
		if (!dailySelectionManager.inRange && !notificationSent) {
			toastManager.addToast({
				type: 'attention',
				message: `You get extra XP for eating items you planned ahead of time. If you have nothing more to plan, click 'End Planning' again.`,
				timeout: 10000
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

			// Explicitly invalidate all data dependencies
			await invalidate('layoutLoad'); // Invalidates the load from `layout.server.ts` specifically

			// Show powerline animation
			animationManager.planPowerline = true;

			// Then navigate home
			await goto('/app');
		}

		// Hide spinner
		visibilityManager.toggleSpinnerOverlay();
	};
</script>

<div class="mb-1 flex h-screen w-screen flex-col-reverse items-center p-1">
	<Minimizer onclick={() => goto('/app')} direction="down" />
	<div class="h-8"></div>
	<div class="flex w-full justify-end p-2">
		<Button text="End Planning" variant="secondary" onclick={endPlanning} classAddons="px-5" />
	</div>
	<FoodLibrary
		showNewElementCard={true}
		showSubtleBtn={true}
		selectionManager={dailySelectionManager}
	/>
	<div class="h-8"></div>
	<FoodSelection selectionManager={dailySelectionManager} />
</div>
