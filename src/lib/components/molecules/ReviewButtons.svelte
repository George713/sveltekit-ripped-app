<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { visibleOverlay, visibleView } from '$lib/stores';

	import BtnGreen from '$atoms/BtnGreen.svelte';

	export let weightDiff;

	$: adjust = weightDiff > 0;

	const finishReview = async () => {
		await fetch('/?/finishReview', { method: 'POST', body: new FormData() });

		// Return to main screen
		visibleView.update('none');

		// Reset page data
		invalidateAll();
	};
</script>

<div class="flex justify-center space-x-5">
	<!-- Note: The secondary option is so weird, so that the button view does not flip too much during rendering. -->
	<BtnGreen text="Keep" onclick={finishReview} secondary={weightDiff ? adjust : true} />
	<BtnGreen
		text="Adjust"
		onclick={() => visibleOverlay.set('adjustCalories')}
		secondary={weightDiff ? !adjust : true}
	/>
</div>
