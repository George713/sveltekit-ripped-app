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
		glow: boolean;
		glowStrength?: '20' | '40' | '60' | '80' | '100';
		disabled?: boolean;
		hidden?: boolean;
		onclick?: () => void;
	}

	let {
		size,
		icon,
		glow,
		glowStrength = '100',
		disabled = false,
		hidden = false,
		onclick
	}: Props = $props();
</script>

{#snippet buttonIcon(icon: string)}
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
<button
	class={{
		'flex items-center justify-center rounded-[3px] border-3': true,
		'size-16': size === 'big',
		'size-11': size === 'small',
		'border-white/90': glow,
		'border-stone-700': !glow,
		'pointer-events-none opacity-0': hidden
	}}
	style={glow
		? 'filter: url(#blue-glow-powerline' + `-${glowStrength})`
		: 'box-shadow: 0 2px 4px rgba(0,0,0,0.4)'}
	{onclick}
	{disabled}
>
	{@render buttonIcon(icon)}
</button>
