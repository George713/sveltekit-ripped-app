<script lang="ts">
	import { goto, invalidateAll } from '$app/navigation';
	import { slide } from 'svelte/transition';

	import { visibilityManager } from '$lib/stateManagers.svelte';
	import { uploadToS3 } from '$lib/utils';

	import Minimizer from '$lib/components/newDesign/atoms/Minimizer.svelte';
	import Arrow from '$lib/components/newDesign/icons/Arrow.svelte';
	import PuzzlePiece from '$lib/components/newDesign/icons/PuzzlePiece.svelte';

	let progressState = $state(0);
	let inputElementJourneyStart: HTMLInputElement;
	let inputElementGoofy: HTMLInputElement;

	const maxWidth = 1080; // max. width of image taken

	const handleFileChange = async (event: Event, type: 'initial' | 'goofy') => {
		const target = event.target as HTMLInputElement | null;
		if (target && target.files && target.files.length > 0) {
			visibilityManager.toggleSpinnerOverlay();

			// Determine initPic status
			const formData = new FormData();
			formData.append('type', type);

			// Get presigned URL
			const response = await fetch('/api/getPresignedURL', {
				method: 'POST',
				body: formData
			});
			const presignedURL = (await response.json()).url;

			// Read the file into an Image object
			const file = target.files[0];
			const img = new Image();
			img.src = URL.createObjectURL(file);

			// Convert onload to a Promise so we can await it
			await new Promise<void>((resolve) => {
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
								}
								resolve(); // Resolve the promise after upload is initiated
							},
							'image/png',
							1.0 // quality factor
						);
					} else {
						resolve(); // Resolve even if there's an issue with the context
					}
				};

				// Handle loading errors
				img.onerror = () => {
					resolve();
				};
			});

			// Now that image processing is complete, handle navigation
			if (type === 'goofy') {
				await invalidateAll();
				await goto('/?unlockAddons=true');
			} else {
				progressState++;
			}

			visibilityManager.toggleSpinnerOverlay();
		}
	};
</script>

<div class="relative mt-3 flex w-full items-center justify-center">
	<div class="absolute left-2">
		<Minimizer direction="left" onclick={() => goto('/')} />
	</div>
	<div class="flex items-center justify-center space-x-1">
		<PuzzlePiece />
		<p class="text-xl font-medium text-stone-400">Unlock Addons</p>
	</div>
</div>

<div class="mt-6 space-y-3 px-14 text-sm text-stone-200">
	<p>Unlocks:</p>
	<ul class="list-disc space-y-3 pl-6">
		<li>Weekly Review</li>
		<li>Weekly Progress Picture</li>
	</ul>
</div>

<div
	class={{
		'mt-6 flex flex-none grow flex-col items-center justify-end transition-all delay-1000 duration-1000 ease-in-out': true
	}}
>
	<div class="px-14 text-sm">
		{#if progressState < 4}
			<p
				class={{
					'transition-colors duration-1000': true,
					'text-stone-200': progressState === 0,
					'text-stone-600': progressState !== 0
				}}
				transition:slide={{ duration: 1000 }}
			>
				Every Sunday a new progress picture can be taken. To best see the effect, try to take the
				picture under similar conditions, e.g. after waking up or after a workout. Clothing, which
				shows off your body, is beneficial of course.
			</p>
		{/if}
		{#if progressState >= 1 && progressState < 4}
			<p
				class={{
					'mt-4 transition-colors duration-1000': true,
					'text-stone-200': progressState === 1,
					'text-stone-600': progressState !== 1
				}}
				transition:slide={{ duration: 1000 }}
			>
				In order to track your visual progress let’s take a photo of the beginning of your
				transformation journey. Don’t worry about the quality of the picture too much.
			</p>
		{/if}
		<input
			bind:this={inputElementJourneyStart}
			onchange={(event) => handleFileChange(event, 'initial')}
			type="file"
			accept="image/*"
			capture="user"
			hidden
		/>
		{#if progressState >= 2 && progressState < 4}
			<p
				class={{
					'mt-4 transition-colors duration-1000': true,
					'text-stone-200': progressState === 2,
					'text-stone-600': progressState !== 2
				}}
				transition:slide={{ duration: 1000 }}
			>
				Let’s take a moment to appreciate our bodies. Maybe it’s not in the shape we want it to be,
				but it got us to where we are today. Let’s thank our body &mdash; for it might very well be
				the last time we see it like this.
			</p>
		{/if}
		{#if progressState >= 3}
			<p
				class={{
					'mt-4 transition-colors duration-1000': true,
					'text-stone-200': progressState === 3 || progressState === 4,
					'text-stone-600': progressState !== 3 && progressState !== 4
				}}
				in:slide={{ duration: 1000 }}
			>
				Take a goofy picture. This is the photo our founder took. Let it inspire you ;-)
			</p>
		{/if}
		{#if progressState >= 4}
			<div class="mx-auto flex justify-center" in:slide={{ duration: 1000 }}>
				<img
					src="/referenceImages/goofyFounder.webp"
					alt="Goofy Founder"
					loading="lazy"
					class="mt-4 mb-6 h-80 w-50 rounded-lg"
				/>
			</div>
		{/if}
		<input
			bind:this={inputElementGoofy}
			onchange={(event) => handleFileChange(event, 'goofy')}
			type="file"
			accept="image/*"
			capture="user"
			hidden
		/>
	</div>
	<div class="mt-8 mb-4">
		<Arrow
			onclick={() => {
				if (progressState === 1) {
					inputElementJourneyStart.click();
				} else if (progressState === 4) {
					inputElementGoofy.click();
				} else {
					progressState++;
				}
			}}
		/>
	</div>
</div>
