<!--
Usage: Use as wrapper within svg element.
Alternatively, use filter on other elements via style attribute.
-->
<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		color: 'blue' | 'yellow';
		children: Snippet;
		glowStrength?: '20' | '40' | '60' | '80' | '100';
	}
	let { color, children, glowStrength = '100' }: Props = $props();
</script>

<g filter="url(#{color}-glow-powerline-{glowStrength})">
	{@render children?.()}
</g>

<svg width="0" height="0" viewBox="0 0 1000 1000" fill="none">
	<defs>
		<!-- 100% blue glow -->
		<filter
			id="blue-glow-powerline-100"
			x="-50%"
			y="-50%"
			width="200%"
			height="200%"
			filterUnits="userSpaceOnUse"
			color-interpolation-filters="sRGB"
		>
			<feFlood flood-opacity="0" result="BackgroundImageFix" id="feFlood1" />
			<feColorMatrix
				in="SourceAlpha"
				type="matrix"
				values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
				result="hardAlpha"
				id="feColorMatrix1"
			/>
			<feOffset id="feOffset1" />
			<feGaussianBlur stdDeviation="1.5" id="feGaussianBlur1" />
			<feColorMatrix
				type="matrix"
				values="0 0 0 0 0 0 0 0 0 0.615686 0 0 0 0 1 0 0 0 1 0"
				id="feColorMatrix2"
			/>
			<feBlend
				mode="normal"
				in2="BackgroundImageFix"
				result="effect1_dropShadow_1692_2674"
				id="feBlend2"
			/>
			<feColorMatrix
				in="SourceAlpha"
				type="matrix"
				values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
				result="hardAlpha"
				id="feColorMatrix3"
			/>
			<feOffset id="feOffset3" />
			<feGaussianBlur stdDeviation="1.5" id="feGaussianBlur3" />
			<feColorMatrix
				type="matrix"
				values="0 0 0 0 0 0 0 0 0 0.615686 0 0 0 0 1 0 0 0 1 0"
				id="feColorMatrix4"
			/>
			<feBlend
				mode="normal"
				in2="effect1_dropShadow_1692_2674"
				result="effect2_dropShadow_1692_2674"
				id="feBlend4"
			/>
			<feColorMatrix
				in="SourceAlpha"
				type="matrix"
				values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
				result="hardAlpha"
				id="feColorMatrix5"
			/>
			<feOffset id="feOffset5" />
			<feGaussianBlur stdDeviation="3" id="feGaussianBlur5" />
			<feColorMatrix
				type="matrix"
				values="0 0 0 0 0 0 0 0 0 0.615686 0 0 0 0 1 0 0 0 1 0"
				id="feColorMatrix6"
			/>
			<feBlend
				mode="normal"
				in2="effect2_dropShadow_1692_2674"
				result="effect3_dropShadow_1692_2674"
				id="feBlend6"
			/>
			<feColorMatrix
				in="SourceAlpha"
				type="matrix"
				values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
				result="hardAlpha"
				id="feColorMatrix7"
			/>
			<feOffset id="feOffset7" />
			<feGaussianBlur stdDeviation="6" id="feGaussianBlur7" />
			<feColorMatrix
				type="matrix"
				values="0 0 0 0 0 0 0 0 0 0.615686 0 0 0 0 1 0 0 0 1 0"
				id="feColorMatrix8"
			/>
			<feBlend
				mode="normal"
				in2="effect3_dropShadow_1692_2674"
				result="effect4_dropShadow_1692_2674"
				id="feBlend8"
			/>
			<feColorMatrix
				in="SourceAlpha"
				type="matrix"
				values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
				result="hardAlpha"
				id="feColorMatrix9"
			/>
			<feOffset id="feOffset9" />
			<feGaussianBlur stdDeviation="12" id="feGaussianBlur9" />
			<feColorMatrix
				type="matrix"
				values="0 0 0 0 0 0 0 0 0 0.615686 0 0 0 0 1 0 0 0 1 0"
				id="feColorMatrix10"
			/>
			<feBlend
				mode="normal"
				in2="effect4_dropShadow_1692_2674"
				result="effect5_dropShadow_1692_2674"
				id="feBlend10"
			/>
			<feColorMatrix
				in="SourceAlpha"
				type="matrix"
				values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
				result="hardAlpha"
				id="feColorMatrix11"
			/>
			<feOffset id="feOffset11" />
			<feGaussianBlur stdDeviation="12" id="feGaussianBlur11" />
			<feColorMatrix
				type="matrix"
				values="0 0 0 0 0 0 0 0 0 0.615686 0 0 0 0 1 0 0 0 1 0"
				id="feColorMatrix12"
			/>
			<feBlend
				mode="normal"
				in2="effect5_dropShadow_1692_2674"
				result="effect6_dropShadow_1692_2674"
				id="feBlend12"
			/>
			<feBlend
				mode="normal"
				in="SourceGraphic"
				in2="effect6_dropShadow_1692_2674"
				result="shape"
				id="feBlend13"
			/>=
		</filter>
		<!-- 80% blue glow -->
		<filter
			id="blue-glow-powerline-80"
			x="-50%"
			y="-50%"
			width="200%"
			height="200%"
			filterUnits="userSpaceOnUse"
			color-interpolation-filters="sRGB"
		>
			<feFlood flood-opacity="0" result="BackgroundImageFix" id="feFlood1" />
			<feColorMatrix
				in="SourceAlpha"
				type="matrix"
				values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
				result="hardAlpha"
				id="feColorMatrix1"
			/>
			<feOffset id="feOffset1" />
			<feGaussianBlur stdDeviation="1.5" id="feGaussianBlur1" />
			<feColorMatrix
				type="matrix"
				values="0 0 0 0 0 0 0 0 0 0.615686 0 0 0 0 1 0 0 0 1 0"
				id="feColorMatrix2"
			/>
			<feBlend
				mode="normal"
				in2="BackgroundImageFix"
				result="effect1_dropShadow_1692_2674"
				id="feBlend2"
			/>
			<feColorMatrix
				in="SourceAlpha"
				type="matrix"
				values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
				result="hardAlpha"
				id="feColorMatrix3"
			/>
			<feOffset id="feOffset3" />
			<feGaussianBlur stdDeviation="1.5" id="feGaussianBlur3" />
			<feColorMatrix
				type="matrix"
				values="0 0 0 0 0 0 0 0 0 0.615686 0 0 0 0 1 0 0 0 1 0"
				id="feColorMatrix4"
			/>
			<feBlend
				mode="normal"
				in2="effect1_dropShadow_1692_2674"
				result="effect2_dropShadow_1692_2674"
				id="feBlend4"
			/>
			<feColorMatrix
				in="SourceAlpha"
				type="matrix"
				values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
				result="hardAlpha"
				id="feColorMatrix5"
			/>
			<feOffset id="feOffset5" />
			<feGaussianBlur stdDeviation="3" id="feGaussianBlur5" />
			<feColorMatrix
				type="matrix"
				values="0 0 0 0 0 0 0 0 0 0.615686 0 0 0 0 1 0 0 0 1 0"
				id="feColorMatrix6"
			/>
			<feBlend
				mode="normal"
				in2="effect2_dropShadow_1692_2674"
				result="effect3_dropShadow_1692_2674"
				id="feBlend6"
			/>
			<feColorMatrix
				in="SourceAlpha"
				type="matrix"
				values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
				result="hardAlpha"
				id="feColorMatrix7"
			/>
			<feOffset id="feOffset7" />
			<feGaussianBlur stdDeviation="6" id="feGaussianBlur7" />
			<feColorMatrix
				type="matrix"
				values="0 0 0 0 0 0 0 0 0 0.615686 0 0 0 0 1 0 0 0 1 0"
				id="feColorMatrix8"
			/>
			<feBlend
				mode="normal"
				in2="effect3_dropShadow_1692_2674"
				result="effect4_dropShadow_1692_2674"
				id="feBlend8"
			/>
			<feBlend
				mode="normal"
				in="SourceGraphic"
				in2="effect4_dropShadow_1692_2674"
				result="shape"
				id="feBlend13"
			/>
		</filter>
		<!-- 60% blue glow -->
		<filter
			id="blue-glow-powerline-60"
			x="-50%"
			y="-50%"
			width="200%"
			height="200%"
			filterUnits="userSpaceOnUse"
			color-interpolation-filters="sRGB"
		>
			<feFlood flood-opacity="0" result="BackgroundImageFix" id="feFlood1" />
			<feColorMatrix
				in="SourceAlpha"
				type="matrix"
				values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
				result="hardAlpha"
				id="feColorMatrix1"
			/>
			<feOffset id="feOffset1" />
			<feGaussianBlur stdDeviation="1.5" id="feGaussianBlur1" />
			<feColorMatrix
				type="matrix"
				values="0 0 0 0 0 0 0 0 0 0.615686 0 0 0 0 1 0 0 0 1 0"
				id="feColorMatrix2"
			/>
			<feBlend
				mode="normal"
				in2="BackgroundImageFix"
				result="effect1_dropShadow_1692_2674"
				id="feBlend2"
			/>
			<feColorMatrix
				in="SourceAlpha"
				type="matrix"
				values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
				result="hardAlpha"
				id="feColorMatrix3"
			/>
			<feOffset id="feOffset3" />
			<feGaussianBlur stdDeviation="1.5" id="feGaussianBlur3" />
			<feColorMatrix
				type="matrix"
				values="0 0 0 0 0 0 0 0 0 0.615686 0 0 0 0 1 0 0 0 1 0"
				id="feColorMatrix4"
			/>
			<feBlend
				mode="normal"
				in2="effect1_dropShadow_1692_2674"
				result="effect2_dropShadow_1692_2674"
				id="feBlend4"
			/>
			<feColorMatrix
				in="SourceAlpha"
				type="matrix"
				values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
				result="hardAlpha"
				id="feColorMatrix5"
			/>
			<feOffset id="feOffset5" />
			<feGaussianBlur stdDeviation="3" id="feGaussianBlur5" />
			<feColorMatrix
				type="matrix"
				values="0 0 0 0 0 0 0 0 0 0.615686 0 0 0 0 1 0 0 0 1 0"
				id="feColorMatrix6"
			/>
			<feBlend
				mode="normal"
				in2="effect2_dropShadow_1692_2674"
				result="effect3_dropShadow_1692_2674"
				id="feBlend6"
			/>
			<feBlend
				mode="normal"
				in="SourceGraphic"
				in2="effect3_dropShadow_1692_2674"
				result="shape"
				id="feBlend13"
			/>
		</filter>
		<!-- 40% blue glow -->
		<filter
			id="blue-glow-powerline-40"
			x="-50%"
			y="-50%"
			width="200%"
			height="200%"
			filterUnits="userSpaceOnUse"
			color-interpolation-filters="sRGB"
		>
			<feFlood flood-opacity="0" result="BackgroundImageFix" id="feFlood1" />
			<feColorMatrix
				in="SourceAlpha"
				type="matrix"
				values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
				result="hardAlpha"
				id="feColorMatrix1"
			/>
			<feOffset id="feOffset1" />
			<feGaussianBlur stdDeviation="1.5" id="feGaussianBlur1" />
			<feColorMatrix
				type="matrix"
				values="0 0 0 0 0 0 0 0 0 0.615686 0 0 0 0 1 0 0 0 1 0"
				id="feColorMatrix2"
			/>
			<feBlend
				mode="normal"
				in2="BackgroundImageFix"
				result="effect1_dropShadow_1692_2674"
				id="feBlend2"
			/>
			<feColorMatrix
				in="SourceAlpha"
				type="matrix"
				values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
				result="hardAlpha"
				id="feColorMatrix3"
			/>
			<feOffset id="feOffset3" />
			<feGaussianBlur stdDeviation="1.5" id="feGaussianBlur3" />
			<feColorMatrix
				type="matrix"
				values="0 0 0 0 0 0 0 0 0 0.615686 0 0 0 0 1 0 0 0 1 0"
				id="feColorMatrix4"
			/>
			<feBlend
				mode="normal"
				in2="effect1_dropShadow_1692_2674"
				result="effect2_dropShadow_1692_2674"
				id="feBlend4"
			/>
			<feBlend
				mode="normal"
				in="SourceGraphic"
				in2="effect2_dropShadow_1692_2674"
				result="shape"
				id="feBlend13"
			/>
		</filter>
		<!-- 20% blue glow -->
		<filter
			id="blue-glow-powerline-20"
			x="-50%"
			y="-50%"
			width="200%"
			height="200%"
			filterUnits="userSpaceOnUse"
			color-interpolation-filters="sRGB"
		>
			<feFlood flood-opacity="0" result="BackgroundImageFix" id="feFlood1" />
			<feColorMatrix
				in="SourceAlpha"
				type="matrix"
				values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
				result="hardAlpha"
				id="feColorMatrix1"
			/>
			<feOffset id="feOffset1" />
			<feGaussianBlur stdDeviation="1.5" id="feGaussianBlur1" />
			<feColorMatrix
				type="matrix"
				values="0 0 0 0 0 0 0 0 0 0.615686 0 0 0 0 1 0 0 0 1 0"
				id="feColorMatrix2"
			/>
			<feBlend
				mode="normal"
				in2="BackgroundImageFix"
				result="effect1_dropShadow_1692_2674"
				id="feBlend2"
			/>
			<feBlend
				mode="normal"
				in="SourceGraphic"
				in2="effect1_dropShadow_1692_2674"
				result="shape"
				id="feBlend13"
			/>
		</filter>
		<!-- 100% yellow glow -->
		<filter
			id="yellow-glow-powerline-100"
			x="0.25"
			y="0"
			width="1000"
			height="1000"
			filterUnits="userSpaceOnUse"
			color-interpolation-filters="sRGB"
		>
			<feFlood flood-opacity="0" result="BackgroundImageFix" />
			<feColorMatrix
				in="SourceAlpha"
				type="matrix"
				values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
				result="hardAlpha"
			/>
			<feOffset />
			<feGaussianBlur stdDeviation="0.1596" />
			<feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 0.960784 0 0 0 0 0.541176 0 0 0 1 0" />
			<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1683_2832" />
			<feColorMatrix
				in="SourceAlpha"
				type="matrix"
				values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
				result="hardAlpha"
			/>
			<feOffset />
			<feGaussianBlur stdDeviation="0.0798" />
			<feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 0.960784 0 0 0 0 0.541176 0 0 0 1 0" />
			<feBlend
				mode="normal"
				in2="effect1_dropShadow_1683_2832"
				result="effect2_dropShadow_1683_2832"
			/>
			<feColorMatrix
				in="SourceAlpha"
				type="matrix"
				values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
				result="hardAlpha"
			/>
			<feOffset />
			<feGaussianBlur stdDeviation="0.5586" />
			<feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 0.960784 0 0 0 0 0.541176 0 0 0 1 0" />
			<feBlend
				mode="normal"
				in2="effect2_dropShadow_1683_2832"
				result="effect3_dropShadow_1683_2832"
			/>
			<feColorMatrix
				in="SourceAlpha"
				type="matrix"
				values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
				result="hardAlpha"
			/>
			<feOffset />
			<feGaussianBlur stdDeviation="1.1172" />
			<feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 0.960784 0 0 0 0 0.541176 0 0 0 1 0" />
			<feBlend
				mode="normal"
				in2="effect3_dropShadow_1683_2832"
				result="effect4_dropShadow_1683_2832"
			/>
			<feColorMatrix
				in="SourceAlpha"
				type="matrix"
				values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
				result="hardAlpha"
			/>
			<feOffset />
			<feGaussianBlur stdDeviation="1.9152" />
			<feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 0.960784 0 0 0 0 0.541176 0 0 0 1 0" />
			<feBlend
				mode="normal"
				in2="effect4_dropShadow_1683_2832"
				result="effect5_dropShadow_1683_2832"
			/>
			<feColorMatrix
				in="SourceAlpha"
				type="matrix"
				values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
				result="hardAlpha"
			/>
			<feOffset />
			<feGaussianBlur stdDeviation="3.3516" />
			<feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 0.960784 0 0 0 0 0.541176 0 0 0 1 0" />
			<feBlend
				mode="normal"
				in2="effect5_dropShadow_1683_2832"
				result="effect6_dropShadow_1683_2832"
			/>
			<feBlend mode="normal" in="SourceGraphic" in2="effect6_dropShadow_1683_2832" result="shape" />
		</filter>
	</defs>
</svg>
