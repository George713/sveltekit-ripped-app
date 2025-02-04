<script lang="ts">
	import { applyAction, enhance } from '$app/forms';

	import { toastManager, visibilityManager } from '$lib/stateManagers.svelte';

	import Button from '../atoms/Button.svelte';
	import ColoredHeader from '../atoms/ColoredHeader.svelte';
	import WeightInput from '../atoms/inputs/WeightInput.svelte';
	import Scale from '../icons/Scale.svelte';
</script>

<div
	class="relative flex w-80 items-center justify-center rounded-lg border border-indigo-600 bg-black/60 backdrop-blur"
>
	<!-- Icon -->
	<div class="absolute top-2.5 left-2.5">
		<Scale color="fill-indigo-600" scale={0.9} />
	</div>
	<!-- Center element -->
	<form
		action="?/logWeight"
		method="post"
		autocomplete="off"
		class="my-4 flex flex-col items-center justify-center space-y-2"
		use:enhance={() => {
			return async ({ result }) => {
				if (result.type === 'failure') {
					// Show toast with error message
					toastManager.addToast({
						type: 'error',
						message: result.data?.error as string,
						timeout: 10000
					});
				} else {
					// Otherwise redirect as planned
					await applyAction(result);
					visibilityManager.toggleWeightOverlay();
				}
			};
		}}
	>
		<!-- Header -->
		<ColoredHeader text="Enter your Weight" />
		<!-- Input -->
		<WeightInput id="weight" name="weight" placeholder="88.25" type="number" />
		<!-- Button -->
		<Button text="Submit" type="submit" />
	</form>
</div>
