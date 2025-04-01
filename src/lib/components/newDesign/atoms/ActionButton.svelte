<script lang="ts">
	import Book from '../icons/Book.svelte';
	import Camera from '../icons/Camera.svelte';
	import Chart from '../icons/Chart.svelte';
	import Cutlery from '../icons/Cutlery.svelte';
	import Insignia from '../icons/Insignia.svelte';
	import Scale from '../icons/Scale.svelte';

	interface Props {
		size: 'small' | 'big';
		icon: 'scale' | 'book' | 'cutlery' | 'insignia' | 'chart' | 'camera';
		glowStrength?: number;
		disabled?: boolean;
		hidden?: boolean;
		onclick?: () => void;
	}

	let { size, icon, glowStrength = 0, disabled = false, hidden = false, onclick }: Props = $props();
</script>

{#snippet buttonIcon(icon: string, glow: boolean)}
	{#if icon === 'scale'}
		<Scale {glow} />
	{:else if icon === 'book'}
		<Book {glow} />
	{:else if icon === 'cutlery'}
		<Cutlery {glow} />
	{:else if icon === 'insignia'}
		<Insignia {glow} />
	{:else if icon === 'chart'}
		<Chart {glow} />
	{:else if icon === 'camera'}
		<Camera {glow} />
	{/if}
{/snippet}

<!-- Note: Glow filter is available on the page and need not be imported here.  -->
<div
	class={{
		relative: true,
		'pointer-events-none opacity-0': hidden
	}}
>
	<!-- Non-glowing button -->
	<button
		class={{
			'absolute flex items-center justify-center rounded-[3px] border-3 border-stone-700 transition-opacity duration-2500': true,
			'size-16': size === 'big',
			'size-11': size === 'small'
		}}
		style="opacity: {1 - glowStrength};box-shadow: 0 2px 4px rgba(0,0,0,0.4)"
		disabled={true}
	>
		{@render buttonIcon(icon, false)}
	</button>
	<!-- Glowing button -->
	<button
		class={{
			'flex items-center justify-center rounded-[3px] border-3 border-white/90 transition-opacity duration-2500': true,
			'size-16': size === 'big',
			'size-11': size === 'small'
		}}
		style="filter: url(#blue-glow-powerline); opacity: {glowStrength}"
		{onclick}
		{disabled}
	>
		{@render buttonIcon(icon, true)}
	</button>
</div>
