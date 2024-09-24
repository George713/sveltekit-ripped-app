<script lang="ts">
	import { rewards, visibleOverlay } from '$lib/stores';

	export let collectible: string;

	$: collectible_group = collectible.split('_')[0];

	let iconWidth = 31.92999;

	let translateX = 0;

	const spin = () => {
		let index = 0;
		switch (collectible_group) {
			case 'quotes':
				index = 0;
				break;
			case 'nuts':
				index = 1;
				break;
			case 'sports':
				index = 2;
				break;
			case 'statues':
				index = 3;
				break;
			case '?':
				index = 4;
				break;
		}
		translateX -= (50 + index) * iconWidth;
		// Show new collectible after 3.25s (spinnings takes 2s)
		setTimeout(() => {
			// Set store value of visibleOverlay to 'collectible'
			// Assuming you have a store named `visibleOverlayStore`
			visibleOverlay.set('none');
			rewards.reset();
		}, 3250);
	};
</script>

<!-- Background -->
<div class="relative h-28 w-64 rounded bg-black/50">
	<!-- Header -->
	<p class="mb-1 ml-5 mt-2 font-light text-white">Collectible</p>
	<!-- Content -->
	<div
		class="absolute bottom-3 right-5 my-auto flex h-[88px] w-16 flex-col items-center rounded border border-yellow-500 bg-yellow-500/5"
	>
		<button on:click={spin} class="mt-2 text-center text-xs text-white/80">Click to collect</button>
		<div class="m-auto w-9">
			<div class="slot-machine" style={`background-position: ${translateX}px 0;`}></div>
		</div>
	</div>
</div>

<style>
	.slot-machine {
		background-image: url('/collections.svg');
		background-repeat: repeat-x;
		width: 100%;
		height: 31px; /* Adjust as needed */
		background-size: auto 100%;
		transition: background-position 2s cubic-bezier(0.4, 0.3, 0.2, 1); /* Adjust duration as needed */
	}
</style>
