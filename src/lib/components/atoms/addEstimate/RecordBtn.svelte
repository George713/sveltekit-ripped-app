<script lang="ts">
	export let isRecording: boolean;
	export let recordedText: string;
	export let recordingResult: any;

	let isProcessing = false;
	let recognition: any;
	let isRecognitionEnded: boolean = false;

	const handleButton = () => {
		if (!recordingResult) {
			toggleRecording();
		} else {
			recordedText = 'Record using your voice...';
			recordingResult = false;
		}
	};

	const toggleRecording = () => {
		isRecording = !isRecording;
		if (isRecording) {
			recordedText = 'Listening...';
			startTranscription();
		} else {
			stopTranscription();
		}
	};

	const startTranscription = async () => {
		isRecognitionEnded = false;

		recognition = new (window as any).webkitSpeechRecognition();
		recognition.continuous = true;
		recognition.interimResults = true;
		recognition.lang = 'de-DE';
		recognition.onresult = (event: any) => {
			recordedText = Array.from(event.results).reduce(
				(accumulatedTranscript: string, result: any) =>
					accumulatedTranscript + result[0].transcript,
				''
			);
		};
		recognition.onerror = (event: any) => {
			console.error('Transcription error:', event.error);
		};
		/**
		 * `onend` events occur several times during the live recording, but are
		 * separate from the manually triggered end of the recording. Here,
		 * `isRecording` derives from the manual trigger. If the recording is
		 * over and the recognition has ended, `isRecognitionEnded` is set to true.
		 */
		recognition.onend = () => {
			if (!isRecording) {
				isRecognitionEnded = true;
			}
		};
		recognition.start();
	};

	const stopTranscription = () => {
		// Stops recognition
		if (recognition) {
			recognition.stop();
			waitForRecognitionEnd();
		}
	};

	const waitForRecognitionEnd = () => {
		// Once recognition has ended, send `recordedText` to backend.
		if (isRecognitionEnded) {
			sendTranscriptToBackend(recordedText);
		} else {
			setTimeout(waitForRecognitionEnd, 100); // Check every 100ms
		}
	};

	const sendTranscriptToBackend = async (transcript: string) => {
		isProcessing = true;

		const formData = new FormData();
		formData.append('transcript', transcript);

		try {
			const response = await fetch('/api/processVoice', {
				method: 'POST',
				body: formData
			});

			if (response.ok) {
				const result = await response.json();
				const jsonString = extractJSON(result.recordingResult);
				recordingResult = JSON.parse(jsonString);
			} else {
				console.error('Failed to send audio to backend');
			}
		} catch (error) {
			console.error('Error sending audio to backend:', error);
		}

		isProcessing = false;
	};

	const extractJSON = (text: string) => {
		// Remove the backticks and any additional formatting characters
		const jsonString = text
			.replace(/```json\s*/, '')
			.replace(/```\s*/, '')
			.trim();
		return jsonString;
	};
</script>

<button on:click={handleButton}>
	<svg
		class="h-16 w-16 {isRecording ? 'animate-pulse' : ''} {isProcessing ? 'animate-spin' : ''}"
		width="63"
		height="63"
		viewBox="0 0 63 63"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		{#if !recordingResult}
			<circle cx="31.5" cy="31.5" r="31.5" fill="#FF3325" fill-opacity="0.7" />
			{#if isRecording}
				<rect x="20" y="20" width="23" height="23" rx="2" fill="white" />
			{:else if isProcessing}
				<path
					d="M32.8462 15.3462V20.7308C32.8462 21.0878 32.7043 21.4302 32.4519 21.6826C32.1994 21.9351 31.857 22.0769 31.5 22.0769C31.143 22.0769 30.8006 21.9351 30.5481 21.6826C30.2957 21.4302 30.1538 21.0878 30.1538 20.7308V15.3462C30.1538 14.9891 30.2957 14.6467 30.5481 14.3943C30.8006 14.1418 31.143 14 31.5 14C31.857 14 32.1994 14.1418 32.4519 14.3943C32.7043 14.6467 32.8462 14.9891 32.8462 15.3462ZM47.6538 30.1538H42.2692C41.9122 30.1538 41.5698 30.2957 41.3174 30.5481C41.0649 30.8006 40.9231 31.143 40.9231 31.5C40.9231 31.857 41.0649 32.1994 41.3174 32.4519C41.5698 32.7043 41.9122 32.8462 42.2692 32.8462H47.6538C48.0109 32.8462 48.3533 32.7043 48.6057 32.4519C48.8582 32.1994 49 31.857 49 31.5C49 31.143 48.8582 30.8006 48.6057 30.5481C48.3533 30.2957 48.0109 30.1538 47.6538 30.1538ZM40.0669 38.1631C39.8145 37.9106 39.472 37.7688 39.115 37.7688C38.758 37.7688 38.4155 37.9106 38.1631 38.1631C37.9106 38.4155 37.7688 38.758 37.7688 39.115C37.7688 39.472 37.9106 39.8145 38.1631 40.0669L41.9705 43.8744C42.223 44.1268 42.5654 44.2687 42.9224 44.2687C43.2795 44.2687 43.6219 44.1268 43.8744 43.8744C44.1268 43.6219 44.2687 43.2795 44.2687 42.9224C44.2687 42.5654 44.1268 42.223 43.8744 41.9705L40.0669 38.1631ZM31.5 40.9231C31.143 40.9231 30.8006 41.0649 30.5481 41.3174C30.2957 41.5698 30.1539 41.9122 30.1538 42.2692V47.6538C30.1538 48.0109 30.2957 48.3533 30.5481 48.6057C30.8006 48.8582 31.143 49 31.5 49C31.857 49 32.1994 48.8582 32.4519 48.6057C32.7043 48.3533 32.8462 48.0109 32.8462 47.6538V42.2692C32.8461 41.9122 32.7043 41.5698 32.4519 41.3174C32.1994 41.0649 31.857 40.9231 31.5 40.9231ZM22.9331 38.1631L19.1256 41.9705C18.8732 42.223 18.7313 42.5654 18.7313 42.9224C18.7313 43.2795 18.8732 43.6219 19.1256 43.8744C19.3781 44.1268 19.7205 44.2687 20.0776 44.2687C20.4346 44.2687 20.777 44.1268 21.0295 43.8744L24.8369 40.0669C25.0894 39.8145 25.2312 39.4721 25.2312 39.115C25.2312 38.758 25.0894 38.4155 24.8369 38.1631C24.5845 37.9106 24.242 37.7688 23.885 37.7688C23.528 37.7688 23.1855 37.9106 22.9331 38.1631ZM22.0769 31.5C22.0769 31.143 21.9351 30.8006 21.6826 30.5481C21.4302 30.2957 21.0878 30.1539 20.7308 30.1538H15.3462C14.9891 30.1538 14.6467 30.2957 14.3943 30.5481C14.1418 30.8006 14 31.143 14 31.5C14 31.857 14.1418 32.1994 14.3943 32.4519C14.6467 32.7043 14.9891 32.8462 15.3462 32.8462H20.7308C21.0878 32.8461 21.4302 32.7043 21.6826 32.4519C21.9351 32.1994 22.0769 31.857 22.0769 31.5ZM21.0295 19.1256C20.777 18.8732 20.4346 18.7313 20.0776 18.7313C19.7205 18.7313 19.3781 18.8732 19.1256 19.1256C18.8732 19.3781 18.7313 19.7205 18.7313 20.0776C18.7313 20.4346 18.8732 20.777 19.1256 21.0295L22.9331 24.8369C23.1857 25.0886 23.5279 25.2298 23.8845 25.2295C24.2411 25.2292 24.583 25.0874 24.8352 24.8352C25.0874 24.583 25.2292 24.2411 25.2295 23.8845C25.2298 23.5279 25.0886 23.1857 24.8369 22.9331L21.0295 19.1256Z"
					fill="#EFEFEF"
				/>
			{:else}
				<path
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M28.6666 21C28.6666 19.159 30.1589 17.6666 31.9999 17.6666C33.8409 17.6666 35.3333 19.159 35.3333 21H33.6666C32.7461 21 31.9999 21.7462 31.9999 22.6666C31.9999 23.5871 32.7461 24.3333 33.6666 24.3333H35.3333V27.6666H33.6666C32.7461 27.6666 31.9999 28.4128 31.9999 29.3333C31.9999 30.2538 32.7461 31 33.6666 31H35.3333V32.6666C35.3333 34.5076 33.8409 36 31.9999 36C30.1589 36 28.6666 34.5076 28.6666 32.6666V21ZM31.9999 14.3333C28.318 14.3333 25.3333 17.3181 25.3333 21V32.6666C25.3333 36.3485 28.318 39.3333 31.9999 39.3333C35.6818 39.3333 38.6666 36.3485 38.6666 32.6666V29.3333V22.6666V21C38.6666 17.3181 35.6818 14.3333 31.9999 14.3333ZM23.6666 29.3333C23.6666 28.4128 22.9204 27.6666 21.9999 27.6666C21.0795 27.6666 20.3333 28.4128 20.3333 29.3333V32.6666C20.3333 38.5441 24.6794 43.4065 30.3333 44.2151V46H25.3333C24.4128 46 23.6666 46.7461 23.6666 47.6666C23.6666 48.5871 24.4128 49.3333 25.3333 49.3333H31.9999H38.6666C39.5871 49.3333 40.3333 48.5871 40.3333 47.6666C40.3333 46.7461 39.5871 46 38.6666 46H33.6666V44.2151C39.3204 43.4065 43.6666 38.5441 43.6666 32.6666V29.3333C43.6666 28.4128 42.9204 27.6666 41.9999 27.6666C41.0794 27.6666 40.3333 28.4128 40.3333 29.3333V32.6666C40.3333 37.269 36.6023 41 31.9999 41C27.3976 41 23.6666 37.269 23.6666 32.6666V29.3333Z"
					fill="#DADADA"
				/>
			{/if}
		{:else}
			<g opacity="0.5">
				<circle cx="31.5" cy="31.5" r="19.5" fill="#FF3325" fill-opacity="0.7" />
				<path
					d="M33.9998 28H38.9998V23M38.7091 36.3569C37.7772 37.7918 36.4099 38.8902 34.8079 39.4907C33.2059 40.0913 31.4534 40.1624 29.8079 39.6937C28.1625 39.225 26.7109 38.2413 25.6658 36.8867C24.6207 35.5321 24.0376 33.878 24.0018 32.1675C23.9659 30.4569 24.479 28.78 25.4665 27.3828C26.4539 25.9856 27.8633 24.942 29.4877 24.4048C31.1121 23.8676 32.8661 23.865 34.4919 24.398C36.1177 24.9309 37.5298 25.971 38.5209 27.3656"
					stroke="white"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
			</g>
		{/if}
	</svg>
</button>
