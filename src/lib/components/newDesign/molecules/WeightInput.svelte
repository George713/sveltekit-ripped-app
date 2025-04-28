<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import { getContext } from 'svelte';

	import { animationManager, toastManager, visibilityManager } from '$lib/stateManagers.svelte';

	import Button from '../atoms/Button.svelte';
	import ColoredHeader from '../atoms/ColoredHeader.svelte';
	import Input from '../atoms/inputs/Input.svelte';
	import Scale from '../icons/Scale.svelte';

	type AudioElement = { element: HTMLAudioElement | undefined };
	const audioWeighIn = getContext<AudioElement>('audioElement');
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
					audioWeighIn.element?.play();
					if (page.data.user.reviewToday) {
						goto('/review?allowUpdate=true');
					} else {
						goto('/review');
					}
					page.data.user.streakMeter += 1;
					page.data.dailyProgress.weighIn = true;
					animationManager.weighInPowerline = true;
				}
			};
		}}
	>
		<!-- Header -->
		<ColoredHeader text="Enter your Weight" />
		<!-- Input -->
		<Input
			id="weight"
			name="weight"
			placeholder={page.data.user.currentWeight.toFixed(2)}
			value={page.data.user.currentWeight.toFixed(2)}
			type="number"
			unit="kg"
		/>
		<!-- Button -->
		<Button text="Submit" type="submit" wide={true} />
	</form>
</div>
