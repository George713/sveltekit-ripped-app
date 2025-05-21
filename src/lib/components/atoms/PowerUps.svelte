<script lang="ts">
	import { streakManager } from '$lib/stateManagers.svelte';

	// Path of Hex Icon
	let path =
		'm 15.80264,27.378367 -7.0972,4.0924 -0.0132,8.209 7.1235,4.0924 7.0972,-4.0924 0.0132,-8.209 z m -0.0495,2.00609 1.8424,1.06347 v 2.12696 l -1.8424,1.06347 -1.8424,-1.06347 v -2.12696 z m -3.7035,2.12589 1.8425,1.06348 v 2.12695 l -1.8425,1.06348 1.8424,1.06348 v 2.12803 l -1.8424,1.0635 -1.8424,-1.0635 v -2.12803 l 1.8424,-1.06348 -1.8424,-1.06348 v -2.12695 z m 7.3938,0 1.8424,1.06348 v 2.12695 l -1.8423,1.06348 1.8424,1.06348 v 2.12803 l -1.8424,1.0635 -1.8424,-1.0635 v -2.12803 l 1.8424,-1.06348 -1.8424,-1.06348 v -2.12695 z m -3.6903,2.13132 1.8424,1.06347 v 2.12696 l -1.8379,1.06127 1.8379,1.0602 v 2.128 l -1.8424,1.0635 -1.8424,-1.0635 v -2.128 l 1.838,-1.0602 -1.838,-1.06127 v -2.12696 z';
</script>

{#snippet hexSymbol(translateX: number, translateY: number, glow: boolean)}
	<!--
     Two variants of the hexSymbol are implemented here, where only one of them
     is visible except during the transition process. This type of
     implementation is used, as the filter-property (the css property behind
     tailwind's `drop-shadow`) cannot be transitioned. By using a transition
     via opacity, this can be circumvented.
     -->

	<!-- Glowing variant -->
	<path
		d={path}
		style="transform: translate({translateX}%,{translateY}%);"
		class={{
			'fill-cyan-100 drop-shadow-[0_0_2px_var(--color-cyan-800),0_0_4px_var(--color-cyan-400)] transition-opacity duration-1000': true,
			'opacity-0': !glow,
			'opacity-100': glow
		}}
	/>

	<!-- Non-glowing variant -->
	<path
		d={path}
		style="transform: translate({translateX}%,{translateY}%);"
		class={{
			'fill-stone-700 drop-shadow-[0_2px_4px_rgba(20,20,20,1)] transition-opacity duration-1000': true,
			'opacity-0': glow,
			'opacity-100': !glow
		}}
	/>
{/snippet}

<svg
	class="absolute"
	style="transform: translate(-168%, 218%);"
	width="66.727997"
	height="72.112114"
	viewBox="-13 -13 66.727997 72.112106"
	xmlns="http://www.w3.org/2000/svg"
>
	<!-- Note: Reverse order for correct glow overlap -->
	{@render hexSymbol(0, -41, streakManager.streak >= 5)}
	{@render hexSymbol(-13, -20.5, streakManager.streak >= 4)}
	{@render hexSymbol(26, -41, streakManager.streak >= 3)}
	{@render hexSymbol(13, -20.5, streakManager.streak >= 2)}
	{@render hexSymbol(0, 0, streakManager.streak >= 1)}
</svg>
