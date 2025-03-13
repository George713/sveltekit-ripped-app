<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/state';
	import { goto } from '$app/navigation';
	import { cubicIn } from 'svelte/easing';
	import { fly } from 'svelte/transition';

	import Lock from '../atoms/locks/Lock.svelte';
	import SigilLock from '../atoms/locks/SigilLock.svelte';
	import ControlsLock from '../atoms/locks/ControlsLock.svelte';
	import SideElementsLock from '../atoms/locks/SideElementsLock.svelte';

	interface Props {
		unlockProgress: {
			unlockedRank: boolean;
			unlockedControls: boolean;
			unlockedAddons: boolean;
		} | null;
	}

	let { unlockProgress }: Props = $props();

	// Reference dimensions from design (360x740)
	const DESIGN_WIDTH = 360;
	const DESIGN_HEIGHT = 740;

	// Setup responsive scaling with Svelte 5 runes
	let width = $state(0);
	let height = $state(0);
	let scaleX = $state(1);
	let scaleY = $state(1);
	let offsetXElement1 = $state(0);
	let offsetYElement1 = $state(0);
	let offsetXElement2 = $state(0);
	let offsetYElement2 = $state(0);
	let offsetXElement3 = $state(0);
	let offsetYElement3 = $state(0);

	// State for controlling the visibility of the side elements
	let unlockRank = $state(false);
	let unlockControls = $state(false);
	let unlockAddons = $state(false);
	// State for controlling the rotation of the locks
	let turnLockRank = $state(false);
	let turnLockControls = $state(false);
	let turnLockAddons = $state(false);
	$inspect(scaleX, scaleY);

	// Update dimensions and calculate scale
	const updateDimensions = () => {
		if (typeof window !== 'undefined') {
			width = window.innerWidth;
			height = window.innerHeight;

			// Calculate independent scale factors for x and y
			scaleX = width / DESIGN_WIDTH;
			scaleY = height / DESIGN_HEIGHT;

			// Calculate offset for centering
			offsetXElement1 = (width - 360) * 0.65;
			offsetYElement1 = (height - 740) * 0.45;
			offsetXElement2 = (width - 360) * 0.25;
			offsetYElement2 = (height - 740) * 0.05;
			offsetXElement3 = (width - 360) * 0.2;
			offsetYElement3 = (height - 740) * 0.27;
		}
	};

	$effect(() => {
		if (page.url.searchParams.get('unlockRank') === 'true') {
			turnLockRank = true;
			setTimeout(() => {
				unlockRank = true;
				fetch('?/unlockRank', {
					method: 'POST',
					body: new FormData()
				});
			}, 2500);
		}

		if (page.url.searchParams.get('unlockControls') === 'true') {
			turnLockControls = true;
			setTimeout(() => {
				unlockControls = true;
				fetch('?/unlockControls', {
					method: 'POST',
					body: new FormData()
				});
			}, 2500);
		}

		if (page.url.searchParams.get('unlockAddons') === 'true') {
			turnLockAddons = true;
			setTimeout(() => {
				unlockAddons = true;
				fetch('?/unlockAddons', {
					method: 'POST',
					body: new FormData()
				});
			}, 2500);
		}
	});

	onMount(() => {
		// Set up resize listener
		if (typeof window !== 'undefined') {
			window.addEventListener('resize', updateDimensions);
			updateDimensions(); // Initialize

			return () => {
				window.removeEventListener('resize', updateDimensions);
			};
		}
	});
</script>

<!-- Wrapper with responsive positioning for all lock elements -->
<div class="fixed inset-0 h-full w-full overflow-hidden">
	<!-- SigilLock at top -->
	{#if !unlockProgress?.unlockedRank}
		{#if !unlockRank}
			<div
				class="absolute top-0 left-0"
				out:fly={{ y: -1000, duration: 4500, opacity: 1, easing: cubicIn }}
			>
				<div style="transform: scale({scaleX}, {scaleY});">
					<SigilLock />
				</div>

				<div
					class="absolute z-10"
					style="transform: translate({210 + offsetXElement1}px, {-150 +
						offsetYElement1}px) scale({scaleX})"
				>
					<Lock text="Unlock Rank" onclick={() => goto('/unlock/rank')} isRotated={turnLockRank} />
				</div>
			</div>
		{/if}
	{/if}

	<!-- ControlsLock at bottom -->
	{#if !unlockProgress?.unlockedControls}
		{#if !unlockControls}
			<div
				class="absolute bottom-0 left-0"
				out:fly={{ x: -500, duration: 4500, opacity: 1, easing: cubicIn }}
			>
				<div style="transform: scale({scaleX}, {scaleY});">
					<ControlsLock />
				</div>

				<div
					class="absolute z-10"
					style="transform: translate({30 + offsetXElement2}px, {-120 -
						offsetYElement2}px) scale({scaleX})"
				>
					<Lock
						text="Unlock Controls"
						onclick={() => goto('/unlock/controls')}
						isRotated={turnLockControls}
					/>
				</div>
			</div>
		{/if}
	{/if}

	<!-- SideElementsLock at bottom right -->
	{#if !unlockProgress?.unlockedAddons}
		{#if !unlockAddons}
			<div
				class="absolute right-0 bottom-0"
				out:fly={{ x: 500, duration: 4500, opacity: 1, easing: cubicIn }}
			>
				<div style="transform: scale({scaleX}, {scaleY});">
					<SideElementsLock />
				</div>

				<div
					class="absolute z-10"
					style="transform: translate({40 - offsetXElement3}px, {-237 -
						offsetYElement3}px) scale({scaleX})"
				>
					<Lock
						text="Unlock Addons"
						smallText={true}
						onclick={() => goto('/unlock/addons')}
						isRotated={turnLockAddons}
					/>
				</div>
			</div>
		{/if}
	{/if}
</div>
