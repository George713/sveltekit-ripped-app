<script lang="ts">
	import { page } from '$app/state';
	import { goto } from '$app/navigation';
	import { fade, slide } from 'svelte/transition';

	import { selectInput, focusElement } from '$lib/utils';

	import Sigil from '$lib/components/newDesign/atoms/Sigil.svelte';
	import Minimizer from '$lib/components/newDesign/atoms/Minimizer.svelte';
	import Crest from '$lib/components/newDesign/icons/Crest.svelte';
	import Arrow from '$lib/components/newDesign/icons/Arrow.svelte';

	let { data } = $props();

	let progressState = $state((data.heightCm || 0) > 0 ? 1 : 0);
	let height = $state(data.heightCm || 0);
	let neck = $state(data.neckCm || 0);
	let waist = $state(data.waistCm || 0);
	let hip = $state(data.hipCm || 0);

	const isInputEmpty = $derived(
		progressState === 0
			? height === 0
			: progressState === 1
				? neck === 0
				: progressState === 2
					? waist === 0
					: hip === 0
	);

	const updateValue = (id: string, value: number) => {
		if (id === 'height') height = value;
		else if (id === 'neck') neck = value;
		else if (id === 'waist') waist = value;
		else if (id === 'hip') hip = value;
	};

	const calculateBF = () => {
		if (page.data.user.isMale) {
			return (
				495 / (1.0324 - 0.19077 * Math.log10(waist - neck) + 0.15456 * Math.log10(height)) - 450
			);
		} else {
			return (
				495 / (1.29579 - 0.35004 * Math.log10(waist + hip - neck) + 0.221 * Math.log10(height)) -
				450
			);
		}
	};
</script>

{#snippet input(header: string, text: string, id: string, active: boolean, value: number)}
	<div
		transition:slide={{ duration: 750 }}
		class={{
			'flex w-full flex-col space-y-4 px-14': true,
			'text-stone-200': active,
			'text-stone-600': !active
		}}
	>
		<div class="">
			<p class="font-bold">{header}</p>
			<p class="-mt-1 text-sm">{text}</p>
		</div>
		<div class="flex w-full justify-center">
			<div class="flex w-24 space-x-1 rounded border border-stone-400 p-2">
				<input
					{id}
					type="number"
					step="0.1"
					min="0"
					max="300"
					onfocus={selectInput}
					use:focusElement
					class="w-13 border-none text-right focus-visible:outline-none"
					{value}
					oninput={(e) => updateValue(id, parseFloat(e.currentTarget.value))}
				/>
				<label for={id}>cm</label>
			</div>
		</div>
	</div>
{/snippet}

<div class="relative mt-3 flex w-full items-center justify-center">
	<div class="absolute left-2">
		<Minimizer direction="left" onclick={() => goto('/bodyfat')} />
	</div>
	<div class="flex items-center justify-center space-x-2">
		<Crest color="fill-stone-400" />
		<p class="font-medium text-stone-400">Update your Body Fat</p>
	</div>
</div>
<div class="mt-10 flex -translate-x-4 transform items-center justify-center space-x-4">
	<Sigil rank="tbd" size="small" />
	<div class="flex flex-col font-medium text-stone-200">
		<p>The</p>
		<p class="text-2xl">Navy Method</p>
	</div>
</div>

<div class="flex grow flex-col justify-end space-y-4">
	{@render input('Step #1:', 'Measure your height (in cm):', 'height', progressState === 0, height)}
	{#if progressState >= 1}
		{@render input(
			'Step #2:',
			"Measure the circumference around your neck just below Adam's apple (in cm):",
			'neck',
			progressState === 1,
			neck
		)}
	{/if}
	{#if progressState >= 2}
		{@render input(
			'Step #3:',
			'Measure the circumference around your navel (in cm). Relax your arms and don’t suck in your stomach:',
			'waist',
			progressState === 2,
			waist
		)}
	{/if}
</div>
<div class="mt-16 mb-14 flex w-full justify-center">
	{#if progressState < 2}
		<Arrow disabled={isInputEmpty} onclick={() => progressState++} />
	{:else}
		<button
			class="rounded bg-indigo-600 px-4 py-3 font-bold text-stone-200 disabled:bg-stone-600 disabled:text-stone-400"
			disabled={isInputEmpty}
			transition:fade
			onclick={() => console.log(calculateBF())}
		>
			Calculate BF%
		</button>
	{/if}
</div>
