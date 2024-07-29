<script lang="ts">
	import { page } from '$app/stores';
	import { deserialize } from '$app/forms';
	import { invalidateAll } from '$app/navigation';

	import type { PlannedItem } from '$lib/types';
	import { plannedItems, plannedKcal, showSpinner, visibleView } from '$lib/stores';

	import FinishPlanning from '$overlays/FinishPlanning.svelte';
	import FoodLibraryPlanner from '$molecules/planner/FoodLibraryPlanner.svelte';
	import Selection from '$molecules/planner/Selection.svelte';
	import Title from '$atoms/Title.svelte';
	import MinimizeBtn from '$atoms/MinimizeBtn.svelte';
	import Background from '$overlays/Background.svelte';
	import BackgroundPlanel from '$atoms/BackgroundPlanel.svelte';

	// Controls for finishing planning process
	let showOverlay = false;
	let msg: string;
	const toggleOverlay = () => {
		msg = '';
		if ($plannedItems.length === 0) {
			msg = "You haven't selected any items for today.";
		} else if ($plannedKcal > $page.data.user.currentCalorieTarget + 25) {
			msg = `You have exceeded your calorie target for today. Try to select in the range of +-25 kcal of your target (${$page.data.user.currentCalorieTarget} kcal).`;
		} else if ($plannedKcal < $page.data.user.currentCalorieTarget - 25) {
			msg = `You have not reached your calorie target for today. Try to select in the range of +-25 kcal of your target (${$page.data.user.currentCalorieTarget} kcal).`;
		}

		if (msg == '') {
			finishPlanning();
		} else {
			showOverlay = !showOverlay; // !-syntax required as toggle also exits overlay
		}
	};

	const finishPlanning = async () => {
		// Hide overlay
		showOverlay = false;

		// Show spinner
		$showSpinner = true;

		// Submit planned items to server
		const formData = new FormData();
		formData.append('plannedItems', JSON.stringify($plannedItems));
		const response = await fetch('?/finishPlanning', {
			method: 'POST',
			body: formData
		});

		const result = deserialize(await response.text());

		if (result.type === 'success' && result.data) {
			plannedItems.set(result.data.createdPlannedItems as PlannedItem[]);
		}

		// Reload page data (so plan button is disabled)
		await invalidateAll();

		// Return to main view
		visibleView.update('none');

		// Hide spinner
		$showSpinner = false;
	};
</script>

<Background>
	<BackgroundPlanel>
		<Title title="Planner" />
		<Selection title={'Selected for today'} selection={plannedItems} mode="planning" />
		<FoodLibraryPlanner {toggleOverlay} />
		<MinimizeBtn viewTarget="none" />
	</BackgroundPlanel>
</Background>

{#if showOverlay}
	<FinishPlanning {toggleOverlay} {finishPlanning} {msg} />
{/if}
