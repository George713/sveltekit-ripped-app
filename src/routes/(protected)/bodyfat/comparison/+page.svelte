<script lang="ts">
	import { page } from '$app/state';
	import { goto } from '$app/navigation';
	import { innerHeight } from 'svelte/reactivity/window';
	import { sineInOut } from 'svelte/easing';
	import { slide } from 'svelte/transition';

	import Minimizer from '$lib/components/newDesign/atoms/Minimizer.svelte';
	import Sigil from '$lib/components/newDesign/atoms/Sigil.svelte';
	import Arrow from '$lib/components/newDesign/icons/Arrow.svelte';
	import Crest from '$lib/components/newDesign/icons/Crest.svelte';
	import { Carousel, CarouselItem } from '$lib/components/newDesign/molecules/carousel';
	import { visibilityManager } from '$lib/stateManagers.svelte';

	// Image item type
	interface ImageItem {
		src: string;
		alt: string;
		value: string;
	}

	// Images for the carousel
	const images: ImageItem[] = page.data.user.isMale
		? [
				{ src: '/comparison/men/sub10.webp', alt: 'Sub 10% body fat', value: '9.9' },
				{ src: '/comparison/men/10to12.webp', alt: '10-12% body fat', value: '11' },
				{ src: '/comparison/men/12to15.webp', alt: '12-15% body fat', value: '14' },
				{ src: '/comparison/men/15to20.webp', alt: '15-20% body fat', value: '18' },
				{ src: '/comparison/men/20to22.webp', alt: '20-22% body fat', value: '21' },
				{ src: '/comparison/men/22to28.webp', alt: '22-28% body fat', value: '26' },
				{ src: '/comparison/men/28to33.webp', alt: '28-33% body fat', value: '31' },
				{ src: '/comparison/men/33to38.webp', alt: '33-38% body fat', value: '36' },
				{ src: '/comparison/men/38plus.webp', alt: '38+% body fat', value: '40' }
			]
		: [
				{ src: '/comparison/women/sub14.webp', alt: 'Sub 14% body fat', value: '13.9' },
				{ src: '/comparison/women/15.webp', alt: 'Around 15% body fat', value: '15' },
				{ src: '/comparison/women/20.webp', alt: 'Around 20% body fat', value: '20' },
				{ src: '/comparison/women/25.webp', alt: 'Around 25% body fat', value: '25' },
				{ src: '/comparison/women/30.webp', alt: 'Around 30% body fat', value: '30' },
				{ src: '/comparison/women/35.webp', alt: 'Around 35% body fat', value: '35' },
				{ src: '/comparison/women/40.webp', alt: 'Around 40% body fat', value: '40' },
				{ src: '/comparison/women/45.webp', alt: '45+% body fat', value: '45' }
			];

	let progressState = $state(0);
	let selectedIndex = $state(6);
	const bodyfat = $derived(
		selectedIndex === images.length
			? page.data.user.isMale
				? '45'
				: '50'
			: images[selectedIndex].value
	);

	const onSubmit = async () => {
		visibilityManager.toggleSpinnerOverlay();
		const formData = new FormData();
		formData.append('bodyfat', bodyfat);
		try {
			await fetch('?/addBFComparison', {
				method: 'POST',
				body: formData
			});
			goto('/bodyfat/reveal?oldBodyfat=50' + '&previousRank=tbd' + '&estimation=true', {
				invalidateAll: true
			});
		} catch (error) {
			// Handle error
		}
		visibilityManager.toggleSpinnerOverlay();
	};
</script>

<div class="relative mt-3 flex w-full items-center justify-center">
	<div class="absolute left-2">
		<Minimizer direction="left" onclick={() => goto('/unlock/rank?step=6')} />
	</div>
	<div class="flex items-center justify-center space-x-2">
		<Crest color="fill-stone-400" />
		<p class="font-medium text-stone-400">Unlock your Crest</p>
	</div>
</div>
<div class="mt-10 flex -translate-x-4 transform items-center justify-center space-x-4">
	<Sigil rank="tbd" size="small" />
	<div class="flex flex-col font-medium text-stone-200">
		<p>By</p>
		<p class="text-2xl">Comparison</p>
	</div>
</div>

<div
	class={{
		'flex flex-none grow flex-col items-center justify-end transition-all delay-1000 duration-1000 ease-in-out': true
	}}
>
	<div class="px-14 text-sm">
		<!-- When all elements are visible, hide first paragraph if screen is too small. -->
		{#if !(progressState === 3 && (innerHeight.current as number) < 724)}
			<p
				class={{
					'transition-colors duration-1000': true,
					'text-stone-200': progressState === 0,
					'text-stone-600': progressState !== 0
				}}
				out:slide={{ duration: 1000 }}
			>
				A rough estimate of our body fat levels can gathered by comparing our current composition to
				that of others.
			</p>
		{/if}
		{#if progressState >= 1}
			<p
				class={{
					'mt-4 transition-colors duration-1000': true,
					'text-stone-200': progressState === 1,
					'text-stone-600': progressState !== 1
				}}
				in:slide={{ duration: 1000, easing: sineInOut }}
			>
				In a moment you can match a body composition best describing your current stage.
			</p>
		{/if}
		{#if progressState >= 2}
			<p
				class={{
					'mt-4 transition-colors duration-2000': true,
					'text-stone-200': progressState === 2,
					'text-stone-600': progressState !== 2
				}}
				in:slide={{ duration: 2000 }}
			>
				Keep in mind that this is just an estimate to get you started. Every four weeks a new
				measurement can be entered using more precise methods.
			</p>
		{/if}
	</div>
	{#if progressState !== 3}
		<div class="mt-8 mb-4" out:slide={{ duration: 1000 }}>
			<Arrow onclick={() => progressState++} />
		</div>
	{/if}
</div>
{#if progressState === 3}
	<div class="mt-4 mb-8 w-full" transition:slide={{ duration: 1000 }}>
		<Carousel bind:selectedIndex>
			{#each images as image, index}
				<CarouselItem {index}>
					<img src={image.src} alt={image.alt} class="rounded-[5px]" />
				</CarouselItem>
			{/each}

			<!-- Alternative card -->
			<CarouselItem index={images.length}>
				<div
					class="flex h-[140px] w-[120px] flex-col items-center justify-center space-y-4 p-2 text-center"
				>
					<p class="text-xs text-stone-200">
						If you think you are beyond this scale, this is fine.
					</p>
					<p class="text-xs text-stone-200">Just select this card.</p>
				</div>
			</CarouselItem>
		</Carousel>

		<div class="mt-4 flex w-full justify-center">
			<button
				class="rounded bg-indigo-600 px-5 py-2 font-bold text-stone-200 disabled:bg-stone-600 disabled:text-stone-400"
				onclick={onSubmit}
			>
				Confirm
			</button>
		</div>
	</div>
{/if}
