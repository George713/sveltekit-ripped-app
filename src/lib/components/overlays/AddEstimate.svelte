<script lang="ts">
	import { deserialize } from '$app/forms';
	import { estimatesLog, showSpinner, visibleOverlay } from '$lib/stores';
	import type { EatEstimate } from '$lib/types';

	import AddManuallyBtn from '$atoms/AddManuallyBtn.svelte';
	import RecordBtn from '$atoms/addEstimate/RecordBtn.svelte';
	import AcceptBtn from '$atoms/addEstimate/AcceptBtn.svelte';
	import MinimizeBtn from '$atoms/MinimizeBtn.svelte';
	import Background from '$overlays/Background.svelte';
	import RecordedItems from '$molecules/RecordedItems.svelte';

	let isRecording = false;
	let recordingResult: any = false;
	let recordedText = 'Record using your voice...';
	$: newText = recordedText != 'Record using your voice...';

	const makeManualEntry = () => {
		recordingResult = {
			items: [{ name: 'Estimate', kcal: 0, protein: 0, icon: '📙' }],
			combinedName: 'Estimate',
			sumKcal: 0,
			sumProtein: 0
		};
	};

	const submitToServer = async () => {
		// Show spinner
		$showSpinner = true;

		// Return to previous modal
		visibleOverlay.set('none');

		const formData = new FormData();
		formData.append('kcal', recordingResult.sumKcal);
		formData.append('protein', recordingResult.sumProtein);
		formData.append('name', recordingResult.combinedName);

		const response = await fetch('?/addEstimate', {
			method: 'POST',
			body: formData
		});

		const result = deserialize(await response.text());

		if (result.type === 'success' && result.data) {
			const newEstimate = result.data.newEstimate as EatEstimate;
			// Update estimatesLog
			estimatesLog.update((items) => {
				// @ts-ignore
				return [...items, newEstimate];
			});
		}

		// Hide spinner
		$showSpinner = false;
	};
</script>

<Background opacity={90} classAddons="justify-end space-y-3">
	{#if recordingResult}
		<RecordedItems {recordingResult} />
	{:else}
		<p class="mx-10 my-1 flex justify-center {newText ? '' : 'text-xl'} text-white/70">
			{recordedText}
		</p>
	{/if}
	<div class="flex items-center justify-center">
		<div class="basis-1/4">
			{#if !recordingResult}
				<AddManuallyBtn {makeManualEntry} />
			{/if}
		</div>
		<div class="flex basis-1/4 justify-center">
			<RecordBtn bind:isRecording bind:recordedText bind:recordingResult />
		</div>
		<div class="basis-1/4 pl-5">
			{#if recordingResult}
				<AcceptBtn handleClick={submitToServer} />
			{/if}
		</div>
	</div>
	<MinimizeBtn viewTarget="eat" stroke={'stroke-zinc-700'} />
</Background>
