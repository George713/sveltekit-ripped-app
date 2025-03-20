<script lang="ts">
	import { onMount } from 'svelte';
	import { carouselManager } from './state.svelte';

	// Define props interface as per Svelte 5 requirements
	interface Props {
		selectedIndex: number;
		children?: (...args: any[]) => any;
	}

	let { selectedIndex = $bindable(), children }: Props = $props();

	// State variables using Svelte 5 $state rune
	carouselManager.selectedItemIndex = selectedIndex;
	let startX = $state(0);
	let currentX = $state(0);
	let isDragging = $state(false);

	// We'll use this to count the number of children in the slot
	let carouselContainer: HTMLElement;

	// Reset the index counter before rendering
	onMount(() => {
		if (carouselContainer) {
			carouselManager.itemCount = Array.from(carouselContainer.children).length;
		}
	});

	// Handle touch/mouse events for swiping
	const handleTouchStart = (e: TouchEvent | MouseEvent) => {
		startX = 'touches' in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
		isDragging = true;
	};

	const handleTouchMove = (e: TouchEvent | MouseEvent) => {
		if (!isDragging) return;
		currentX = 'touches' in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
	};

	const handleTouchEnd = () => {
		if (!isDragging) return;

		const diff = startX - currentX;
		const threshold = 10; // Minimum swipe distance

		if (Math.abs(diff) > threshold) {
			if (diff > 0 && carouselManager.selectedItemIndex < carouselManager.itemCount - 1) {
				// Swipe left - show next item
				carouselManager.selectedItemIndex++;
			} else if (diff < 0 && carouselManager.selectedItemIndex > 0) {
				// Swipe right - show previous item
				carouselManager.selectedItemIndex--;
			}
		}

		isDragging = false;
	};
</script>

<div
	class="relative flex h-60 w-full items-center justify-center overflow-x-clip perspective-midrange"
	bind:this={carouselContainer}
	ontouchstart={handleTouchStart}
	ontouchmove={handleTouchMove}
	ontouchend={handleTouchEnd}
	ontouchcancel={handleTouchEnd}
	onmousedown={handleTouchStart}
	onmousemove={handleTouchMove}
	onmouseup={handleTouchEnd}
	onmouseleave={handleTouchEnd}
	tabindex="0"
	role="slider"
	aria-valuenow={carouselManager.selectedItemIndex}
>
	{@render children?.()}
</div>
