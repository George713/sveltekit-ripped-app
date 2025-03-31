<script lang="ts">
	import { draw } from 'svelte/transition';
	import { cubicInOut } from 'svelte/easing';
	import Glow from './Glow.svelte';

	interface SvgInfo {
		width: number;
		height: number;
		path: string;
		strokeWidth: number;
		glowColor: 'blue' | 'yellow';
		glowLineColor?: string;
		opacity?: number;
	}

	interface Props {
		svgInfo: SvgInfo;
		glow: boolean;
		glowStrength?: '20' | '40' | '60' | '80' | '100';
		vflip?: boolean;
		hflip?: boolean;
		translate?: [number, number];
		scale?: number;
		rotate?: number;
		hidden?: boolean;
	}

	let {
		svgInfo,
		glow,
		glowStrength = '100',
		vflip = false,
		hflip = false,
		translate = [0, 0],
		scale = 1,
		rotate = 0,
		hidden = false
	}: Props = $props();
</script>

<svg
	width={svgInfo.width}
	height={svgInfo.height}
	viewBox="0 0 {svgInfo.width} {svgInfo.height}"
	fill="none"
	class={{
		absolute: true,
		[`opacity-${svgInfo.opacity}`]: svgInfo.opacity !== undefined,
		hidden: hidden
	}}
	style="transform: {vflip ? `scaleY(-1)` : ``} {hflip
		? `scaleX(-1)`
		: ``} translate({translate[0]}%,{translate[1]}%) scale({scale}) rotate({rotate}deg)"
>
	<!-- Not-Glowing Path -->
	<path d={svgInfo.path} stroke="#44403c" stroke-opacity="1" stroke-width={svgInfo.strokeWidth} />
	<!-- Glowing Path -->
	{#if glow}
		<Glow color={svgInfo.glowColor} {glowStrength}>
			<path
				d={svgInfo.path}
				stroke={svgInfo.glowLineColor ? svgInfo.glowLineColor : 'white'}
				stroke-opacity="1"
				stroke-width={svgInfo.strokeWidth}
				transition:draw={{ duration: 2500, easing: cubicInOut }}
			/>
		</Glow>
	{/if}
</svg>
