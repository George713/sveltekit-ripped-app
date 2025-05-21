<script lang="ts">
	// Svelte & Sveltekit
	import { draw } from 'svelte/transition';
	import { cubicInOut } from 'svelte/easing';
	// Relative imports
	import Glow from './Glow.svelte';

	interface SvgInfo {
		width: number;
		height: number;
		path: string;
		strokeWidth: number;
		glowColor: 'blue' | 'yellow';
		glowLineColor?: string;
	}

	interface Props {
		svgInfo: SvgInfo;
		glowStrength: number;
		animate: boolean;
		vflip?: boolean;
		hflip?: boolean;
		translate?: [number, number];
		scale?: number;
		rotate?: number;
		hidden?: boolean;
	}

	let {
		svgInfo,
		glowStrength,
		animate,
		vflip = false,
		hflip = false,
		translate = [0, 0],
		scale = 1,
		rotate = 0,
		hidden = false
	}: Props = $props();

	// Custom transition function that only applies draw when `animate` is true
	const triggeredDraw = (node: SVGElement & { getTotalLength(): number }, params: any) => {
		if (!animate) {
			// No-op transition when `animate` is false
			return {
				delay: 0,
				duration: 0,
				easing: cubicInOut,
				css: () => ''
			};
		}

		// Use the standard draw transition when `animate` is true
		return draw(node, params);
	};
</script>

<svg
	width={svgInfo.width}
	height={svgInfo.height}
	viewBox="0 0 {svgInfo.width} {svgInfo.height}"
	fill="none"
	class={{
		'absolute overflow-visible': true,
		hidden: hidden
	}}
	style="transform: {vflip ? `scaleY(-1)` : ``} {hflip
		? `scaleX(-1)`
		: ``} translate({translate[0]}%,{translate[1]}%) scale({scale}) rotate({rotate}deg)"
>
	<!-- Not-Glowing Path -->
	<path d={svgInfo.path} stroke="#44403c" stroke-opacity="1" stroke-width={svgInfo.strokeWidth} />
	<!-- Glowing Path -->
	<g style={`opacity: ${glowStrength};`}>
		<Glow color={svgInfo.glowColor}>
			<path
				d={svgInfo.path}
				stroke={svgInfo.glowLineColor ? svgInfo.glowLineColor : 'white'}
				stroke-opacity="1"
				stroke-width={svgInfo.strokeWidth}
				stroke-linecap="round"
				in:triggeredDraw={{ duration: 2500, easing: cubicInOut }}
			/>
		</Glow>
	</g>
</svg>
