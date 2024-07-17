<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { page } from '$app/stores';
	import { showSpinner } from '$lib/stores';
	import { uploadToS3 } from '$lib/utils';

	import ActionButton from './ActionButton.svelte';

	let inputElement: HTMLInputElement;
	const maxWidth = 1080; // max. width of image taken

	const handleFileChange = async (event: Event) => {
		const target = event.target as HTMLInputElement | null;
		if (target && target.files && target.files.length > 0) {
			// Show spinner
			$showSpinner = true;

			// Get presigned URL
			const response = await fetch('/api/getPresignedURL', {
				method: 'POST',
				body: new FormData()
			});
			const presignedURL = (await response.json()).url;

			// Read the file into an Image object
			const file = target.files[0];
			const img = new Image();
			img.src = URL.createObjectURL(file);

			img.onload = async () => {
				// Create a canvas and get its context
				const canvas = document.createElement('canvas');
				const ctx = canvas.getContext('2d');

				if (ctx) {
					// Determine the new dimensions while maintaining aspect ratio
					let width = img.width;
					let height = img.height;

					if (width > maxWidth) {
						height *= maxWidth / width;
						width = maxWidth;
					}

					// Set canvas dimensions and draw the image
					canvas.width = width;
					canvas.height = height;
					ctx.drawImage(img, 0, 0, width, height);

					// Convert the canvas content to a PNG blob
					canvas.toBlob(
						(blob) => {
							if (blob) {
								uploadToS3(blob, presignedURL);
								console.log('error');
							}
						},
						'image/png',
						1.0 // quality factor
					);

					invalidateAll();
				}
			};

			// Hide spinner
			$showSpinner = false;
		}
	};
</script>

<ActionButton text="P" disabled={$page.data.dailyProgress.weeklyPic} />

<input
	bind:this={inputElement}
	on:change={handleFileChange}
	type="file"
	accept="image/*"
	capture="user"
	hidden
/>
