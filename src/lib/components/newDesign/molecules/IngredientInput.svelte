<script lang="ts">
	import { audioRecorder } from '$lib/audioRecorder.svelte';
	import Button from '../atoms/Button.svelte';
	import FastSpinner from '../icons/FastSpinner.svelte';
</script>

<div class="flex w-full flex-1 flex-col justify-end">
	<!-- Ingredient Field -->
	<div class="mx-1 mb-2">
		{#if audioRecorder.isProcessing}
			<div class="flex justify-center">
				<FastSpinner />
			</div>
		{:else}
			<p class="text-center text-sm text-stone-200">
				{#if audioRecorder.isListening}
					Listening...
				{:else}
					{(audioRecorder.recordedText.trim() + ' ' + audioRecorder.tempTranscript.trim()).trim()}
				{/if}
			</p>
		{/if}
	</div>
	<!-- Buttons -->
	<div class="flex space-x-1">
		<Button text="Add" variant="secondary" icon="plus" classAddons="grow" />
		<Button
			text="Record"
			variant="secondary"
			icon="microphone"
			classAddons="grow"
			toggle={audioRecorder.isRecording}
			onclick={audioRecorder.record}
		/>
	</div>
</div>
