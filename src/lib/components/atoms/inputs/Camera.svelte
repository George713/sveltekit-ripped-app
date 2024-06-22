<!-- Camera.svelte -->
<script lang="ts">
	import { onMount } from 'svelte';
	import { isMobile } from '$lib/utils';

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
		video.play().then(() => {
			// Set canvas dimensions to match the visible area of the video
			const videoAspectRatio = video.videoWidth / video.videoHeight;
			const containerAspectRatio = video.clientWidth / video.clientHeight;

			if (videoAspectRatio > containerAspectRatio) {
				// Video is wider than the container
				canvas.width = video.clientWidth;
				canvas.height = video.clientWidth / videoAspectRatio;
			} else {
				// Video is taller than the container
				canvas.width = video.clientHeight * videoAspectRatio;
				canvas.height = video.clientHeight;
			}
		});
	};

	const handleError = (error: any) => {
		console.error('Error accessing camera:', error);
	};

	// const takePhoto = () => {
	// 	const context = canvas.getContext('2d');
	// 	if (context) {
	// 		// Draw the image on the canvas
	// 		context.drawImage(video, 0, 0, canvas.width, canvas.height);

	// 		// Convert image to URL for immediate display
	// 		const imageDataUrl = canvas.toDataURL('image/png');

	// 		/**
	// 		 * Convert the image to WebP format for later upload.
	// 		 * toBlob() takes a callback, which is executed after the blob
	// 		 * has been produced.
	// 		 */
	// 		canvas.toBlob(
	// 			(blob) => {
	// 				if (blob) {
	// 					handlePhotoTaken(imageDataUrl, blob);
	// 				} else console.log('error');
	// 			},
	// 			'image/webp',
	// 			0.9 // quality factor
	// 		);
	// 	}
	// };

	const takePhoto = () => {
		const context = canvas.getContext('2d');
		if (context) {
			// Calculate the source rectangle from the video
			const videoAspectRatio = video.videoWidth / video.videoHeight;
			const containerAspectRatio = video.clientWidth / video.clientHeight;

			let sx, sy, sw, sh;
			if (videoAspectRatio > containerAspectRatio) {
				// Video is wider than the container
				sw = video.videoHeight * containerAspectRatio;
				sh = video.videoHeight;
				sx = (video.videoWidth - sw) / 2;
				sy = 0;
			} else {
				// Video is taller than the container
				sw = video.videoWidth;
				sh = video.videoWidth / containerAspectRatio;
				sx = 0;
				sy = (video.videoHeight - sh) / 2;
			}

			// Draw the image on the canvas with the calculated source and destination rectangles
			context.drawImage(video, sx, sy, sw, sh, 0, 0, canvas.width, canvas.height);

			// Convert image to URL for immediate display
			const imageDataUrl = canvas.toDataURL('image/png');

			/**
			 * Convert the image to WebP format for later upload.
			 * toBlob() takes a callback, which is executed after the blob
			 * has been produced.
			 */
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
	>
		<button
			on:click={takePhoto}
			class="mb-20 border-2 rounded-2xl p-3 text-neutral-400 font-semibold border-neutral-400"
		>
			Take Photo
		</button>
	</div>
</div>
