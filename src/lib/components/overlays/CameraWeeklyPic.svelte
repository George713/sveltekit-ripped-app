<!-- Camera.svelte -->
<script lang="ts">
	import { onMount } from 'svelte';
	import { isMobile, uploadToS3 } from '$lib/utils';
	import Background from '$overlays/Background.svelte';
	import { showSpinner, visibleOverlay } from '$lib/stores';
	import { invalidateAll } from '$app/navigation';

	let photoTaken = false;

	let video: HTMLVideoElement;
	let canvas: HTMLCanvasElement;
	let stream: MediaStream;

	onMount(() => {
		const constraints = isMobile()
			? { video: { facingMode: { exact: 'environment' } } }
			: { video: true };
		navigator.mediaDevices.getUserMedia(constraints).then(handleStream).catch(handleError);
	});

	const handleStream = (mediaStream: MediaStream) => {
		stream = mediaStream;
		video.srcObject = mediaStream;
		video.play();
	};

	const handleError = (error: any) => {
		console.error('Error accessing camera:', error);
	};

	const takePhoto = () => {
		const context = canvas.getContext('2d');
		if (context) {
			// Set canvas dimensions to match the container size
			canvas.width = video.videoWidth;
			canvas.height = video.videoHeight;

			// Draw the visible part of the video on the canvas
			context.drawImage(video, 0, 0, canvas.width, canvas.height);

			photoTaken = true;
		}
	};

	const uploadImage = async () => {
		// Show spinner
		$showSpinner = true;

		// Get presigned URL
		const response = await fetch('/api/getPresignedURL', {
			method: 'POST',
			body: new FormData()
		});
		const presignedURL = (await response.json()).url;

		// Convert the image to WebP format for  upload
		canvas.toBlob(
			(blob) => {
				if (blob) {
					uploadToS3(blob, presignedURL);
					// Return to home screen
					visibleOverlay.set('none');
					// Hide spinner
					$showSpinner = false;
				} else console.log('error');
			},
			'image/png',
			1.0 // quality factor
		);

		invalidateAll();
	};

	// Function to list available cameras
	const listCameras = async () => {
		const devices = await navigator.mediaDevices.enumerateDevices();
		const cameras = devices.filter((device) => device.kind === 'videoinput');
		return cameras;
	};

	// Function to switch camera
	const switchCamera = async (deviceId: string) => {
		const constraints = { video: { deviceId: { exact: deviceId } } };
		navigator.mediaDevices.getUserMedia(constraints).then(handleStream).catch(handleError);
	};
</script>

<Background>
	<div
		class="absolute p-5 w-full h-full bg-black/40 flex items-center justify-center"
		role="button"
		tabindex={0}
		on:click|self={() => visibleOverlay.set('none')}
		on:keydown|self={() => visibleOverlay.set('none')}
	>
		<!-- svelte-ignore a11y-media-has-caption -->
		<video
			bind:this={video}
			autoplay
			playsinline
			class="rounded-lg {!photoTaken ? '' : 'hidden'}"
		/>
		<div class="relative {photoTaken ? '' : 'hidden'}">
			<canvas bind:this={canvas} class="rounded-lg object-contain w-full" />
			<!-- Redo Button -->
			<button on:click={() => (photoTaken = false)} class="absolute bottom-1 right-1 w-8 h-8">
				<svg viewBox="0 0 24 24" class=" fill-none stroke-neutral-400">
					<path
						d="M13.9998 8H18.9998V3M18.7091 16.3569C17.7772 17.7918 16.4099 18.8902 14.8079 19.4907C13.2059 20.0913 11.4534 20.1624 9.80791 19.6937C8.16246 19.225 6.71091 18.2413 5.66582 16.8867C4.62073 15.5321 4.03759 13.878 4.00176 12.1675C3.96593 10.4569 4.47903 8.78001 5.46648 7.38281C6.45392 5.98561 7.86334 4.942 9.48772 4.40479C11.1121 3.86757 12.8661 3.86499 14.4919 4.39795C16.1177 4.93091 17.5298 5.97095 18.5209 7.36556"
						stroke-width="1.5"
					/>
				</svg>
			</button>
		</div>
		{#if !photoTaken}
			<button
				on:click={takePhoto}
				class="absolute bottom-20 border-2 rounded-2xl p-3 text-neutral-400 font-semibold border-neutral-400"
			>
				Take Photo
			</button>
		{:else}
			<!-- Submit Button -->
			<button
				on:click={uploadImage}
				class="absolute bottom-20 border-2 rounded-2xl p-3 text-neutral-400 font-semibold border-neutral-400"
			>
				Submit Photo
			</button>
		{/if}
		<!-- Camera Selection Dropdown -->
		<div class="absolute bottom-5">
			<select on:change={(e) => switchCamera(e.target.value)}>
				{#await listCameras()}
					<option value="">Loading cameras...</option>
				{:then cameras}
					{#each cameras as camera}
						<option value={camera.deviceId}>{camera.label || `Camera ${camera.deviceId}`}</option>
					{/each}
				{:catch error}
					<option value="">Error loading cameras</option>
				{/await}
			</select>
		</div>
	</div>
</Background>
