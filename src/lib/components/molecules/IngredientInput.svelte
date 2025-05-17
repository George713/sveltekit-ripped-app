<script lang="ts">
	// Logic
	import { AudioRecorder } from '$lib/audioRecorder.svelte';
	import { ingredientManager } from '$lib/stateManagers.svelte';
	// Atoms
	import Button from '$atoms/Button.svelte';
	import Ingredient from '$atoms/Ingredient.svelte';
	// Icons
	import FastSpinner from '$icons/FastSpinner.svelte';
	import { onMount } from 'svelte';

	interface Props {
		hidden3rdBtn?: boolean;
	}

	const { hidden3rdBtn = false }: Props = $props();

	let audioRecorder = $state<AudioRecorder>();

	onMount(() => {
		audioRecorder = new AudioRecorder();
	});
</script>

<div class="flex w-full flex-1 flex-col justify-end">
	<!-- Ingredient Field -->
	<div class="mb-1">
		<div class="flex flex-col space-y-1">
			{#each ingredientManager.items as item (item.id)}
				<Ingredient
					id={item.id}
					icon={item.icon}
					bind:name={item.name}
					bind:kcal={item.kcal}
					bind:protein={item.protein}
					shouldFocus={item.shouldFocus}
				/>
			{/each}
		</div>
		{#if audioRecorder!.isProcessing}
			<div class="mt-1 flex h-9 items-center justify-center">
				<FastSpinner />
			</div>
		{:else if audioRecorder!.isRecording}
			<p class="mt-1 flex min-h-9 items-center justify-center text-center text-sm text-stone-200">
				{#if audioRecorder!.isListening}
					Listening...
				{:else}
					{[audioRecorder!.recordedText, audioRecorder!.tempTranscript]
						.map((text) => text.trim())
						.filter((text) => text) // filters empty strings
						.join(', ')}
				{/if}
			</p>
		{/if}
	</div>
	<!-- Buttons -->
	<div
		class={{
			'flex space-x-1': true,
			'justify-end': hidden3rdBtn
		}}
	>
		<Button
			text="Add"
			variant="secondary"
			type="button"
			icon="plus"
			classAddons={hidden3rdBtn ? 'basis-1/3' : 'grow'}
			onclick={() =>
				ingredientManager.add({
					icon: '📙',
					name: 'Estimate',
					kcal: 0,
					protein: 0,
					shouldFocus: true
				})}
		/>
		<Button
			text="Record"
			variant="secondary"
			type="button"
			icon="microphone"
			classAddons={hidden3rdBtn ? 'basis-1/3' : 'grow'}
			toggle={audioRecorder!.isRecording}
			onclick={audioRecorder!.record}
		/>
	</div>
</div>
