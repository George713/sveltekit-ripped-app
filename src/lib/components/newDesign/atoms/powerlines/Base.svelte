<script lang="ts">
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
		glow: boolean;
		vflip?: boolean;
		hflip?: boolean;
		translate?: [number, number];
		scale?: number;
		rotate?: number;
	}

	let {
		svgInfo,
		glow,
		vflip = false,
		hflip = false,
		translate = [0, 0],
		scale = 1,
		rotate = 0
	}: Props = $props();
</script>

<svg
	width={svgInfo.width}
	height={svgInfo.height}
	viewBox="0 0 {svgInfo.width} {svgInfo.height}"
	fill="none"
	class="absolute"
	style="transform: {vflip ? `scaleY(-1)` : ``} {hflip
		? `scaleX(-1)`
		: ``} translate({translate[0]}%,{translate[1]}%) scale({scale}) rotate({rotate}deg)"
>
	{#if glow}
		<Glow color={svgInfo.glowColor}>
			<path
				d={svgInfo.path}
				stroke={svgInfo.glowLineColor ? svgInfo.glowLineColor : 'white'}
				stroke-opacity="1"
				stroke-width={svgInfo.strokeWidth}
			/>
		</Glow>
	{:else}
		<path d={svgInfo.path} stroke="#44403c" stroke-opacity="1" stroke-width={svgInfo.strokeWidth} />
	{/if}
</svg>
