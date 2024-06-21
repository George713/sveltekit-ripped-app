<!-- Camera.svelte -->
<script lang="ts">
	import { onMount } from 'svelte';

	let video: HTMLVideoElement;
	let canvas: HTMLCanvasElement;
	let stream: MediaStream;
	let photoTaken = false;

	export let onPhotoTaken: (dataUrl: string) => void;

	onMount(() => {
		navigator.mediaDevices.getUserMedia({ video: true }).then(handleStream).catch(handleError);
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
		photoTaken = true;
		if (context) {
			context.drawImage(video, 0, 0, canvas.width, canvas.height);
			const dataUrl = canvas.toDataURL('image/png');
			onPhotoTaken(dataUrl);
		} else {
			console.error('Failed to get 2D context for canvas');
		}
	};
</script>

<div class="absolute h-full w-full rounded-b-lg">
	<!-- svelte-ignore a11y-media-has-caption -->
	<video
		bind:this={video}
		autoplay
		playsinline
		class="w-full h-full object-cover rounded-b-lg {photoTaken ? 'invisible' : ''}"
	/>
	<canvas
		bind:this={canvas}
		class="absolute top-0 w-full h-full rounded-b-lg {photoTaken ? '' : 'invisible'}"
	/>
	<div class="absolute top-0 w-full h-full rounded-b-lg {photoTaken ? 'bg-black/30' : ''}" />
	<button on:click={takePhoto} class="absolute top-[200px]">Take Photo</button>
</div>
