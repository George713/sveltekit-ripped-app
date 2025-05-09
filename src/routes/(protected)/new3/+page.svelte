<script lang="ts">
	import { goto } from '$app/navigation';
	import Button from '$lib/components/newDesign/atoms/Button.svelte';
	import Minimizer from '$lib/components/newDesign/atoms/Minimizer.svelte';
	import { onMount } from 'svelte';

	class AudioRecorder {
		recognition: any;
		isRecording = $state(false);
		tempTranscript = $state('');

		constructor() {
			this.recognition = new (window as any).webkitSpeechRecognition();
			this.recognition.continuous = true;
			// this.recognition.interimResults = true;
			this.recognition.lang = 'de-DE';

			this.recognition.onresult = (event: any) => {
				this.tempTranscript = Array.from(event.results).reduce(
					(accumulator: string, result: any) => accumulator + result[0].transcript,
					''
				);
				// console.log(event.results);
			};
		}

		toggleRecording = () => {
			this.isRecording = !this.isRecording;
			if (this.isRecording) {
				this.tempTranscript = '';
				this.recognition.start();
			} else {
				this.recognition.stop();
			}
		};
	}

	let audioRecorder = $state<AudioRecorder>();

	onMount(() => {
		audioRecorder = new AudioRecorder();
	});
</script>

<!-- Page -->
<div
	class={{
		'flex h-full w-full flex-col items-center': true
	}}
>
	<div class="w-full">
		<Minimizer onclick={() => goto('/')} direction="left" />
	</div>

	<div class="my-5 flex flex-1 items-end">
		<p class="text-white">{audioRecorder?.tempTranscript}</p>
	</div>

	<Button
		text="Record"
		icon="microphone"
		onclick={audioRecorder?.toggleRecording}
		variant="secondary"
		toggle={audioRecorder?.isRecording}
		classAddons="p-2 my-2"
	/>
</div>
