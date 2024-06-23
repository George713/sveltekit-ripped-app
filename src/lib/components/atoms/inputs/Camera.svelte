<!-- Camera.svelte -->
<script lang="ts">
	import { onMount } from 'svelte';
	import { isMobile } from '$lib/utils';

	export let showCamera: boolean;
	export let handlePhotoTaken: (imageDataUrl: string, imageBlob: Blob) => void;

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
			canvas.width = canvas.clientWidth * 2;
			canvas.height = canvas.clientHeight * 2;

			// Calculate the visible area of the video
			const videoAspectRatio = video.videoWidth / video.videoHeight;
			const containerAspectRatio = canvas.width / canvas.height;
			let width, height, x, y;
			if (videoAspectRatio > containerAspectRatio) {
				// Video is wider than the container
				width = canvas.height * videoAspectRatio;
				height = canvas.height;
				x = (width - canvas.width) / 2;
				y = 0;
			} else {
				// Video is taller than the container
				width = canvas.width;
				height = canvas.width / videoAspectRatio;
				x = 0;
				y = (height - canvas.height) / 2;
			}
			// Draw the visible part of the video on the canvas
			context.drawImage(video, -x, -y, width, height);

			// Convert image to URL for immediate display
			const imageDataUrl = canvas.toDataURL('image/png');

			// Convert the image to WebP format for later upload
			canvas.toBlob(
				(blob) => {
					if (blob) {
						handlePhotoTaken(imageDataUrl, blob);
					} else console.log('error');
				},
				'image/webp',
				0.9 // quality factor
			);
		}
	};
</script>

<div class="relative w-full h-full rounded-b-lg">
	<!-- svelte-ignore a11y-media-has-caption -->
	<video
		bind:this={video}
		autoplay
		playsinline
		class="absolute z-30 w-full h-full rounded-b-lg object-cover"
	/>
	<canvas bind:this={canvas} class="absolute top-0 w-full h-full rounded-b-lg object-cover" />
	<div
		class="fixed z-10 top-0 left-0 w-full h-full bg-black/40 flex justify-center items-end backdrop-blur-[1px]"
		on:click={() => (showCamera = false)}
		role="none"
	>
		<button
			on:click={takePhoto}
			class="mb-20 border-2 rounded-2xl p-3 text-neutral-400 font-semibold border-neutral-400"
		>
			Take Photo
		</button>
	</div>
</div>
