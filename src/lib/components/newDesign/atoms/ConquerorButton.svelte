<script lang="ts">
	import { page } from '$app/state';
	import { calorieManager } from '$lib/stateManagers.svelte';

	interface Props {
		scale?: number;
	}

	const { scale = 1 }: Props = $props();

	let alreadyUsed = $state(page.data.dailyProgress.harvest); // results in glow
	let shake = $derived(!alreadyUsed && calorieManager.inRange);
</script>

<!-- Note: Style tag will be overwritten by `shake` class when `calorieManager.inRange` is true. -->
<svg
	width={89 * scale}
	height={101 * scale}
	viewBox="0 0 89 101"
	fill="none"
	xmlns="http://www.w3.org/2000/svg"
	class={{ shake: shake }}
>
	<!-- Define the inset shadow filter -->
	<defs>
		<filter
			id="shadows-and-lighting"
			x="0"
			y="0.309326"
			width="89"
			height="100.293"
			filterUnits="userSpaceOnUse"
			color-interpolation-filters="sRGB"
		>
			<!-- Define Background -->
			<feFlood flood-opacity="0" result="BackgroundImageFix" />
			<!-- Shadow #1 -->
			<feColorMatrix
				in="SourceAlpha"
				type="matrix"
				values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
				result="hardAlpha"
			/>
			<feOffset dx="2" dy="4" />
			<feGaussianBlur stdDeviation="3" />
			<feComposite in2="hardAlpha" operator="out" />
			<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
			<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1541_2285" />
			<!-- Shadow #2 -->
			<feColorMatrix
				in="SourceAlpha"
				type="matrix"
				values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
				result="hardAlpha"
			/>
			<feOffset dx="1" dy="1" />
			<feGaussianBlur stdDeviation="1" />
			<feComposite in2="hardAlpha" operator="out" />
			<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
			<feBlend
				mode="normal"
				in2="effect1_dropShadow_1541_2285"
				result="effect2_dropShadow_1541_2285"
			/>
			<!-- Glowing Edge -->
			<feColorMatrix
				in="SourceAlpha"
				type="matrix"
				values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
				result="hardAlpha"
			/>
			<feOffset dx="-1" dy="-1" />
			<feGaussianBlur stdDeviation="0.5" />
			<feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.25 0" />
			<feBlend
				mode="normal"
				in2="effect2_dropShadow_1541_2285"
				result="effect3_dropShadow_1541_2285"
			/>
			<!-- Flatten for inset shadow -->
			<feBlend mode="normal" in="SourceGraphic" in2="effect3_dropShadow_1541_2285" result="shape" />
			<!-- Inset Shadow -->
			<feColorMatrix
				in="SourceAlpha"
				type="matrix"
				values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
				result="hardAlpha"
			/>
			<feOffset dx="4" dy="4" />
			<feGaussianBlur stdDeviation="7.5" />
			<feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
			<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
			<feBlend mode="normal" in2="shape" result="effect4_innerShadow_1541_2285" />
		</filter>
	</defs>
	<!-- Hex button shape -->
	<path
		d="M41.5 2.57735C42.1188 2.22008 42.8812 2.22008 43.5 2.57735L80 23.6506C80.6188 24.0079 81 24.6682 81 25.3827V67.5293C81 68.2438 80.6188 68.904 80 69.2613L43.5 90.3346C42.8812 90.6918 42.1188 90.6918 41.5 90.3346L5 69.2613C4.3812 68.904 4 68.2438 4 67.5293V25.3827C4 24.6682 4.3812 24.0079 5 23.6506L41.5 2.57735Z"
		class="fill-stone-700"
		filter="url(#shadows-and-lighting)"
	/>
	<!-- Button Flame Icon -->
	<!-- Note: Used twice for correct transition into glowing state -->
	<!-- Non-glowing -->
	<path
		d="M39.9726 27.0067C25.3232 31.0721 41.1808 39.2459 35.7354 42.1789C32.9768 43.6644 28.499 43.4447 30.2968 35.9649C21.3227 43.2596 23.9322 59.88 34.3421 65.363C32.0581 63.2034 30.6305 60.147 30.6305 56.7622C30.6305 50.2329 35.9405 44.9231 42.4697 44.9231C48.9991 44.9231 54.3088 50.2331 54.3088 56.7622C54.3088 59.9208 53.0665 62.7939 51.0443 64.9188C63.7209 58.4454 61.3823 40.6539 52.9369 36.1068C54.9523 40.8319 53.9087 44.4644 51.4043 46.4899C52.6357 30.3644 34.8752 36.8623 39.9726 27.0066V27.0067ZM42.4696 46.4949C36.7899 46.4949 32.2026 51.0825 32.2026 56.7622C32.2026 62.442 36.7902 67.0295 42.4696 67.0295C48.1493 67.0295 52.737 62.442 52.737 56.7622C52.737 51.0827 48.1494 46.495 42.4697 46.495L42.4696 46.4949ZM42.4696 51.0187C46.4216 51.0187 49.6432 54.2403 49.6432 58.1922C49.6432 62.1441 46.4216 65.363 42.4697 65.363C38.518 65.363 35.2989 62.1441 35.2989 58.1922C35.2989 54.2403 38.518 51.0189 42.4697 51.0189L42.4696 51.0187ZM42.4696 52.5907C39.3675 52.5907 36.8709 55.0899 36.8709 58.1922C36.8709 61.2943 39.3675 63.791 42.4696 63.791C45.5719 63.791 48.0712 61.2945 48.0712 58.1922C48.0712 55.09 45.572 52.5907 42.4697 52.5907H42.4696ZM42.4696 54.1599C44.6944 54.1599 46.4967 55.9648 46.4967 58.1895C46.4967 60.4143 44.6944 62.2165 42.4697 62.2165C40.2451 62.2165 38.4402 60.4143 38.4402 58.1895C38.4402 57.4821 38.6244 56.8172 38.9449 56.2391C39.0996 57.2766 39.9934 58.0739 41.0741 58.0739C42.2634 58.0739 43.2268 57.1078 43.2268 55.9185C43.2268 55.1934 42.8693 54.5528 42.32 54.1626C42.3697 54.1607 42.4197 54.1599 42.4698 54.1599H42.4696Z"
		class="fill-[#312210]/80"
	/>
	<!-- Glowing -->
	<path
		d="M39.9726 27.0067C25.3232 31.0721 41.1808 39.2459 35.7354 42.1789C32.9768 43.6644 28.499 43.4447 30.2968 35.9649C21.3227 43.2596 23.9322 59.88 34.3421 65.363C32.0581 63.2034 30.6305 60.147 30.6305 56.7622C30.6305 50.2329 35.9405 44.9231 42.4697 44.9231C48.9991 44.9231 54.3088 50.2331 54.3088 56.7622C54.3088 59.9208 53.0665 62.7939 51.0443 64.9188C63.7209 58.4454 61.3823 40.6539 52.9369 36.1068C54.9523 40.8319 53.9087 44.4644 51.4043 46.4899C52.6357 30.3644 34.8752 36.8623 39.9726 27.0066V27.0067ZM42.4696 46.4949C36.7899 46.4949 32.2026 51.0825 32.2026 56.7622C32.2026 62.442 36.7902 67.0295 42.4696 67.0295C48.1493 67.0295 52.737 62.442 52.737 56.7622C52.737 51.0827 48.1494 46.495 42.4697 46.495L42.4696 46.4949ZM42.4696 51.0187C46.4216 51.0187 49.6432 54.2403 49.6432 58.1922C49.6432 62.1441 46.4216 65.363 42.4697 65.363C38.518 65.363 35.2989 62.1441 35.2989 58.1922C35.2989 54.2403 38.518 51.0189 42.4697 51.0189L42.4696 51.0187ZM42.4696 52.5907C39.3675 52.5907 36.8709 55.0899 36.8709 58.1922C36.8709 61.2943 39.3675 63.791 42.4696 63.791C45.5719 63.791 48.0712 61.2945 48.0712 58.1922C48.0712 55.09 45.572 52.5907 42.4697 52.5907H42.4696ZM42.4696 54.1599C44.6944 54.1599 46.4967 55.9648 46.4967 58.1895C46.4967 60.4143 44.6944 62.2165 42.4697 62.2165C40.2451 62.2165 38.4402 60.4143 38.4402 58.1895C38.4402 57.4821 38.6244 56.8172 38.9449 56.2391C39.0996 57.2766 39.9934 58.0739 41.0741 58.0739C42.2634 58.0739 43.2268 57.1078 43.2268 55.9185C43.2268 55.1934 42.8693 54.5528 42.32 54.1626C42.3697 54.1607 42.4197 54.1599 42.4698 54.1599H42.4696Z"
		class:opacity-0={!alreadyUsed}
		class:opacity-100={alreadyUsed}
		class="fill-white/90 transition-opacity duration-1000"
		style="filter: url(#blue-glow-powerline)"
	/>
</svg>

<style>
	@keyframes shake {
		0% {
			transform: translate(0.5px, 0.5px) rotate(0deg);
		}
		10% {
			transform: translate(-0.5px, -1px) rotate(-1deg);
		}
		20% {
			transform: translate(-1.5px, 0px) rotate(1deg);
		}
		30% {
			transform: translate(1.5px, 1px) rotate(0deg);
		}
		40% {
			transform: translate(0.5px, -0.5px) rotate(1deg);
		}
		50% {
			transform: translate(-0.5px, 1px) rotate(-1deg);
		}
		60% {
			transform: translate(-1.5px, 0.5px) rotate(0deg);
		}
		70% {
			transform: translate(1.5px, 0.5px) rotate(-1deg);
		}
		80% {
			transform: translate(-0.5px, -0.5px) rotate(1deg);
		}
		90% {
			transform: translate(0.5px, 1px) rotate(0deg);
		}
		100% {
			transform: translate(0.5px, -1px) rotate(-1deg);
		}
	}

	.shake {
		animation: shake 1.5s infinite;
	}
</style>
