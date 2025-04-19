<script lang="ts">
	import Plus from '../icons/Plus.svelte';

	interface Props {
		imgSrc?: string | string[];
		name: string;
		kcal?: number;
		protein?: number;
		eaten?: boolean;
		theme: 'light' | 'dark';
		type: 'item' | 'newElement';
		onclick?: () => void;
		ontouchstart?: () => void;
		ontouchend?: () => void;
	}

	let {
		imgSrc,
		name,
		kcal,
		protein,
		eaten = false,
		theme,
		type,
		onclick,
		ontouchstart,
		ontouchend
	}: Props = $props();
</script>

{#snippet newElement(name: string)}
	<!-- Image Placeholder with plus symbol -->
	<div class="flex h-[62px] w-[88px] items-center justify-center rounded bg-stone-500">
		<Plus size="big" />
	</div>
	<!-- Label -->
	<p class="m-auto flex items-center justify-center text-[10px] text-stone-700">{name}</p>
{/snippet}

{#snippet image(imgSrc: string, theme: 'light' | 'dark')}
	<div
		class={{
			'relative h-[62px] overflow-hidden rounded ': true,
			'w-[88px]': theme === 'light',
			'w-[86px]': theme === 'dark'
		}}
	>
		<img src={imgSrc} alt="imgUrl" class="absolute h-full w-full object-cover" />
		<div class="absolute inset-0 bg-black/25"></div>
	</div>
{/snippet}

{#snippet imageMosaic(imgSrc: string[])}
	<div class="image-grid relative h-[62px] w-[88px] overflow-hidden rounded">
		{#each imgSrc.slice(0, 4) as src, i}
			<div class="overflow-hidden" style="--i: {i}">
				<img class="h-full w-full object-cover" {src} alt={`${name} - Variation ${i + 1}`} />
			</div>
		{/each}
		<div class="absolute inset-0 bg-black/25"></div>
	</div>
{/snippet}

{#snippet nutritionDetail(text: string, value: number, unit: string, theme: 'light' | 'dark')}
	<div class="flex flex-col items-center justify-center space-y-[-1px]">
		<p
			class={{
				'text-[8px]': true,
				'text-stone-600': theme === 'light',
				'text-stone-500': theme === 'dark'
			}}
		>
			{text}
		</p>
		<p
			class={{
				'text-[10px]': true,
				'text-stone-800': theme === 'light',
				'text-stone-300': theme === 'dark'
			}}
		>
			{value < 10 ? value.toFixed(1) : value.toFixed(0)}
			{unit}
		</p>
	</div>
{/snippet}

{#snippet cardInfo(text: string, kcal: number, protein: number, theme: 'light' | 'dark')}
	<div class="mt-0.5 flex w-full flex-col space-y-[-2px] px-1">
		<!-- Title -->
		<p
			class={{
				' truncate text-left text-[10px]': true,
				'text-stone-800': theme === 'light',
				'text-stone-300': theme === 'dark'
			}}
		>
			{name}
		</p>
		<!-- Info -->
		<div class="flex items-center justify-center space-x-[10px] pl-[5px]">
			{@render nutritionDetail('kcal', kcal, '', theme)}
			{@render nutritionDetail('Protein', protein, 'g', theme)}
		</div>
	</div>
{/snippet}

<button
	type="button"
	{onclick}
	{ontouchstart}
	{ontouchend}
	class={{
		'flex h-[105px] w-[90px] flex-col items-center overflow-visible rounded p-[1px] drop-shadow-[2px_2px_2px_rgba(0,0,0,0.3)]': true,
		'bg-stone-400': theme === 'light',
		'border border-stone-600 bg-stone-800': theme === 'dark',
		'opacity-25': eaten
	}}
>
	{#if type === 'newElement'}
		{@render newElement(name)}
	{:else if type === 'item' && name && typeof kcal === 'number' && typeof protein === 'number'}
		{#if typeof imgSrc === 'string'}
			{@render image(imgSrc, theme)}
		{:else if Array.isArray(imgSrc)}
			{@render imageMosaic(imgSrc)}
		{:else}
			{@render image('https://placehold.co/90x60?text=Estimate&font=roboto', theme)}
		{/if}
		{@render cardInfo(name, kcal, protein, theme)}
	{/if}
</button>

<style>
	.image-grid {
		display: grid;
		gap: 1px;
		grid-template-columns: repeat(2, 1fr);
		aspect-ratio: 1;
	}
</style>
