<script lang="ts">
	// Svelte & Sveltekit
	import { onMount } from 'svelte';
	// Logic
	import { isMobile } from '$lib/utils.svelte';

	interface Props {
		image: string;
		imageBlob: Blob | null;
		showCamera: boolean;
	}

	let { image = $bindable(), imageBlob = $bindable(), showCamera = $bindable() }: Props = $props();

	let video: HTMLVideoElement;
	let canvas: HTMLCanvasElement;
	let stream: MediaStream;

	onMount(() => {
		const constraints = isMobile()
			? { video: { facingMode: { ideal: 'environment' } } }
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

	const handlePhotoTaken = (imageDataUrl: string, blob: Blob) => {
		image = imageDataUrl;
		imageBlob = blob;
		showCamera = false;
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

<div class="relative h-full w-full rounded-b-lg">
	<!-- svelte-ignore a11y_media_has_caption -->
	<video
		bind:this={video}
		autoplay
		playsinline
		class="absolute z-30 h-full w-full rounded-[10px] object-cover"
	></video>
	<canvas bind:this={canvas} class="absolute top-0 h-full w-full rounded-[10px] object-cover"
	></canvas>
	<div
		class="fixed top-0 left-0 z-10 flex h-full w-full items-end justify-center bg-black/40 backdrop-blur-[4px]"
		onclick={() => (showCamera = false)}
		role="none"
	>
		<button
			onclick={takePhoto}
			type="button"
			class="mb-20 rounded-2xl border-2 border-neutral-400 p-3 font-semibold text-neutral-400"
		>
			Take Photo
		</button>
	</div>
</div>
