<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import Minimizer from '$lib/components/newDesign/atoms/Minimizer.svelte';
	import Sigil from '$lib/components/newDesign/atoms/Sigil.svelte';
	import Arrow from '$lib/components/newDesign/icons/Arrow.svelte';
	import Crest from '$lib/components/newDesign/icons/Crest.svelte';
	import { innerHeight } from 'svelte/reactivity/window';
	import { fade, slide } from 'svelte/transition';

	let progressState = $state(Number(page.url.searchParams.get('step')) || 0);
	let sex = $state<'male' | 'female' | undefined>(undefined);
	let method = $state<'navy' | 'bia' | 'comparison' | 'doItLater' | undefined>(undefined);

	const selectSex = (selected: 'male' | 'female') => {
		sex = selected;
	};

	const selectMethod = (selected: 'navy' | 'bia' | 'comparison' | 'doItLater') => {
		method = selected;

		const target = {
			navy: '/bodyfat/navy?unlock=true',
			bia: '/bodyfat/bia?unlock=true',
			comparison: '/bodyfat/comparison',
			doItLater: '/'
		}[method];

		setTimeout(() => {
			goto(target);
		}, 1000);
	};
</script>

{#snippet btn(text: string, onclick: () => void, selected: boolean)}
	<button
		class={{
			'h-10 w-25 rounded transition-colors duration-200': true,
			'border border-stone-700 bg-transparent text-stone-400': !selected,
			'bg-indigo-600 text-stone-200': selected
		}}
		{onclick}
	>
		{text}
	</button>
{/snippet}

<div class="mt-0.5 flex h-full flex-col space-y-5">
	<Minimizer direction="left" onclick={() => goto('/')} />
	<Sigil rank="tbd" />
	<div class="flex items-center justify-center space-x-2">
		<Crest />
		<p class="font-medium text-stone-200">Unlock your Crest</p>
	</div>
	<div
		class="flex w-full grow flex-col justify-end space-y-4 px-14 text-sm"
		transition:slide={{ duration: 1000 }}
	>
		{#if progressState >= 0 && progressState <= 2}
			<p
				class={{
					'text-stone-200': progressState === 0,
					'text-stone-600': progressState !== 0
				}}
			>
				Many people strive for a lower weight, when it is lower body fat they should be aiming for.
			</p>
		{/if}
		{#if progressState >= 1 && progressState <= 2}
			<p
				class={{
					'text-stone-200': progressState === 1,
					'text-stone-600': progressState !== 1
				}}
				transition:slide={{ duration: 1000 }}
			>
				This is why we will track your body fat percentage once a month.
			</p>
		{/if}
		{#if progressState === 2}
			<div class="space-y-4 text-stone-200" transition:slide={{ duration: 1000 }}>
				<p>What a healthy body fat percentage is depends on your sex.</p>
				<p class="font-medium">I am:</p>
				<div class="flex justify-center space-x-2">
					{@render btn('Male', () => selectSex('male'), sex === 'male')}
					{@render btn('Female', () => selectSex('female'), sex === 'female')}
				</div>
			</div>
		{/if}
		{#if progressState >= 3}
			<!-- innerHeight is used to handle different screen sizes -->
			{#if (innerHeight.current as number) > 779 || progressState < 6}
				<p
					class={{
						'text-stone-200': progressState === 3,
						'text-stone-600': progressState !== 3
					}}
					transition:slide={{ duration: 1000 }}
				>
					There are different techniques for estimating your body fat percentage.
				</p>
			{/if}
		{/if}
		{#if progressState >= 4}
			{#if (innerHeight.current as number) > 720 || progressState < 6}
				<p
					class={{
						'text-stone-200': progressState === 4,
						'text-stone-600': progressState !== 4
					}}
					transition:slide={{ duration: 1000 }}
				>
					We recommend using the Navy method (requires a measurement tape) for its consistency...
				</p>
			{/if}
		{/if}
		{#if progressState >= 5}
			<p
				class={{
					'text-stone-200': progressState === 5,
					'text-stone-600': progressState !== 5
				}}
				transition:slide={{ duration: 1000 }}
			>
				or a bioelectrical impendance scale as found in many gyms for its simplicity (BIA method).
			</p>
		{/if}
		{#if progressState === 6}
			<div class="space-y-4 text-stone-200" transition:slide={{ duration: 1000 }}>
				<p>
					If you don’t have either available right now, you can also guess your body fat percentage
					by comparing with reference pictures.
				</p>
				<p>Which method would you like to use?</p>
			</div>
		{/if}
	</div>

	<div
		class={{
			'flex w-full flex-col items-center justify-center': true,
			'my-5': progressState < 6,
			'mb-7': progressState === 6
		}}
	>
		{#if progressState < 6}
			<Arrow disabled={progressState === 2 && sex === undefined} onclick={() => progressState++} />
		{:else}
			<div class="space-y-2" transition:fade={{ delay: 1000 }}>
				<div class="flex justify-center space-x-2">
					{@render btn('Navy', () => selectMethod('navy'), method === 'navy')}
					{@render btn('BIA', () => selectMethod('bia'), method === 'bia')}
				</div>

				<div class="flex justify-center space-x-2">
					{@render btn('Comparison', () => selectMethod('comparison'), method === 'comparison')}
					{@render btn('Do it later', () => selectMethod('doItLater'), method === 'doItLater')}
				</div>
			</div>
		{/if}
	</div>
</div>
