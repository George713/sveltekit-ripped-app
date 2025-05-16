<script lang="ts">
	import { fade } from 'svelte/transition';

	interface Props {
		shake?: boolean;
		classAddons?: string;
	}

	let { shake = false, classAddons = '' }: Props = $props();
</script>

<svg
	width="56"
	height="47"
	viewBox="-8 -8 56 47"
	fill="none"
	in:fade={{ duration: 1000 }}
	overflow="visible"
	class={{ shake, [classAddons]: true }}
>
	<!-- Define the filter for the glow effect -->
	<defs>
		<filter id="glow" x="-30%" y="-30%" width="160%" height="160%" filterUnits="userSpaceOnUse">
			<feGaussianBlur stdDeviation="2.5" result="blur" />
			<feColorMatrix
				in="blur"
				type="matrix"
				values="0 0 0 0 0.0627  0 0 0 0 0.7255  0 0 0 0 0.5059  0 0 0 1 0"
				result="glow"
			/>
			<feMerge>
				<feMergeNode in="glow" />
				<feMergeNode in="SourceGraphic" />
			</feMerge>
		</filter>
	</defs>

	<path
		d="M38.7 5.35V25.65C38.7 26.8037 38.2417 27.9101 37.4259 28.7259C36.6101 29.5417 35.5037 30 34.35 30H5.35C4.19631 30 3.08987 29.5417 2.27409 28.7259C1.4583 27.9101 1 26.8037 1 25.65V5.35M38.7 5.35C38.7 4.19631 38.2417 3.08987 37.4259 2.27409C36.6101 1.4583 35.5037 1 34.35 1H5.35C4.19631 1 3.08987 1.4583 2.27409 2.27409C1.4583 3.08987 1 4.19631 1 5.35M38.7 5.35V5.8198C38.7001 6.56248 38.51 7.29282 38.1479 7.94124C37.7858 8.58966 37.2637 9.13457 36.6313 9.52407L22.1313 18.4464C21.4454 18.8689 20.6556 19.0926 19.85 19.0926C19.0444 19.0926 18.2546 18.8689 17.5687 18.4464L3.06867 9.526C2.43631 9.1365 1.91421 8.59159 1.5521 7.94317C1.18999 7.29475 0.999918 6.56442 1 5.82173V5.35"
		stroke="#10B981"
		stroke-width="2"
		stroke-linecap="round"
		stroke-linejoin="round"
		filter="url(#glow)"
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
		animation: shake 4s infinite;
	}
</style>
