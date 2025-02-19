<script lang="ts">
	import { audioRecorder } from '$lib/audioRecorder.svelte';
	import { ingredientManager } from '$lib/stateManagers.svelte';
	import Button from '../atoms/Button.svelte';
	import Ingredient from '../atoms/Ingredient.svelte';
	import FastSpinner from '../icons/FastSpinner.svelte';
</script>

<div class="flex w-full flex-1 flex-col justify-end">
	<!-- Ingredient Field -->
	<div class="mb-1">
		<div class="flex flex-col space-y-1">
			{#each ingredientManager.items as item}
				<Ingredient
					icon={item.icon}
					bind:name={item.name}
					bind:kcal={item.kcal}
					bind:protein={item.protein}
				/>
			{/each}
		</div>
		{#if audioRecorder.isProcessing}
			<div class="mt-1 flex h-9 items-center justify-center">
				<FastSpinner />
			</div>
		{:else if audioRecorder.isRecording}
			<p class="mt-1 flex h-9 items-center justify-center text-center text-sm text-stone-200">
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
