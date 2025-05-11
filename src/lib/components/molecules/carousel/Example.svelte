<script lang="ts">
	import { Carousel, CarouselItem } from '$molecules/carousel';

	// Image item type
	interface ImageItem {
		src: string;
		alt: string;
		value: string;
	}

	// Images for the carousel
	const images: ImageItem[] = [
		{ src: '/comparison/men/sub10.webp', alt: 'Sub 10% body fat', value: 'sub10' },
		{ src: '/comparison/men/10to12.webp', alt: '10-12% body fat', value: '10to12' },
		{ src: '/comparison/men/12to15.webp', alt: '12-15% body fat', value: '12to15' },
		{ src: '/comparison/men/15to20.webp', alt: '15-20% body fat', value: '15to20' },
		{ src: '/comparison/men/20plus.webp', alt: '20+% body fat', value: '20plus' }
	];

	// Create a reactive variable for the selected index - using Svelte 5 $state rune
	let selectedIndex = $state(4);
</script>

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
			<p class="text-xs text-stone-200">If you think you are beyond this scale, this is fine.</p>
			<p class="text-xs text-stone-200">Just select this card.</p>
		</div>
	</CarouselItem>
</Carousel>
