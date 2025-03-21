<script lang="ts">
	import { onMount } from 'svelte';
	import { slide } from 'svelte/transition';
	import { page } from '$app/state';
	import { goto } from '$app/navigation';

	import { visibilityManager } from '$lib/stateManagers.svelte';
	import { focusElement, selectInput } from '$lib/utils';

	import Arrow from '$lib/components/newDesign/icons/Arrow.svelte';
	import Minimizer from '$lib/components/newDesign/atoms/Minimizer.svelte';
	import Sigil from '$lib/components/newDesign/atoms/Sigil.svelte';
	import Crest from '$lib/components/newDesign/icons/Crest.svelte';

	interface Props {
		data: {
			bodyfat: number | null;
		};
	}

	let { data }: Props = $props();

	// When the user chooses bia method to unlock their sigil
	const unlockProcess = $derived(page.url.searchParams.get('unlock') === 'true');

	// Initialize progressState based on the current value of unlockProcess
	let progressState = $state(0);

	let inputValue = $state(data.bodyfat !== null ? data.bodyfat : '');
	let inputElement: HTMLInputElement;

	// When the component mounts, focus and select the input
	onMount(() => {
		progressState = unlockProcess ? 0 : 4;
		// Need to wait for the next tick for the DOM to be fully updated
		setTimeout(() => {
			if (inputElement) {
				inputElement.focus();
				inputElement.select();
			}
		}, 10);
	});

	const onSubmit = async () => {
		visibilityManager.toggleSpinnerOverlay();
		const formData = new FormData();
		formData.append('bodyfat', inputValue.toString());
		try {
			await fetch('?/addBIAMeasurement', {
				method: 'POST',
				body: formData
			});
			if (unlockProcess) {
				goto('/bodyfat/reveal?oldBodyfat=50' + '&previousRank=tbd', {
					invalidateAll: true
				});
			} else {
				goto(
					'/bodyfat/reveal?oldBodyfat=' +
						page.data.user.currentBF +
						'&previousRank=' +
						page.data.user.currentStatus,
					{ invalidateAll: true }
				);
			}
		} catch (error) {
			// Handle error
		}
		visibilityManager.toggleSpinnerOverlay();
	};
</script>

<div class="relative mt-3 flex w-full items-center justify-center">
	<div class="absolute left-2">
		<Minimizer
			direction="left"
			onclick={() => goto(unlockProcess ? '/unlock/rank?step=6' : '/bodyfat')}
		/>
	</div>
	<div class="flex items-center justify-center space-x-2">
		<Crest color="fill-stone-400" />
		<p class="font-medium text-stone-400">
			{unlockProcess ? 'Unlock your Crest' : 'Update your Body Fat'}
		</p>
	</div>
</div>
<div class="mt-10 flex -translate-x-4 transform items-center justify-center space-x-4">
	<Sigil rank="tbd" size="small" />
	<div class="flex flex-col font-medium text-stone-200">
		<p>The</p>
		<p class="text-2xl">BIA Method</p>
	</div>
</div>

<div class="mb-8 flex w-full grow flex-col justify-end px-14">
	<p
		class={{
			'text-sm transition-colors duration-1000': true,
			'text-stone-200': progressState === 0,
			'text-stone-600': progressState !== 0
		}}
	>
		During the bioelectrical impedance analysis (BIA) a weak electrical current flows through the
		body.
	</p>

	{#if progressState >= 1}
		<p
			class={{
				'mt-4 text-sm transition-colors duration-1000': true,
				'text-stone-200': progressState === 1,
				'text-stone-600': progressState !== 1
			}}
			in:slide={{ duration: 1000 }}
		>
			Using flow directions starting from and going to hands and feet, body composition can be
			analyzed.
		</p>
	{/if}

	{#if progressState >= 2}
		<div
			class={{
				'mt-4 transition-colors duration-1000': true,
				'text-stone-200': progressState === 2,
				'text-stone-600': progressState !== 2
			}}
			in:slide={{ duration: 1000 }}
		>
			<p class="font-bold">Note #1:</p>
			<p class="-mt-1 text-sm">Make sure you are not dehydrated before a measurement.</p>
		</div>
	{/if}

	{#if progressState >= 3}
		<div
			class={{
				'mt-4 transition-colors duration-1000': true,
				'text-stone-200': progressState === 3,
				'text-stone-600': progressState !== 3
			}}
			in:slide={{ duration: 1000 }}
		>
			<p class="font-bold">Note #2:</p>
			<p class="-mt-1 text-sm">
				Measure yourself before training as ‘pumped up’ muscles distort the analysis.
			</p>
		</div>
	{/if}

	{#if progressState <= 3}
		<div class="mt-8 flex w-full justify-center" transition:slide={{ duration: 1000 }}>
			<Arrow onclick={() => progressState++} />
		</div>
	{:else}
		<div class="mt-4 space-y-4" in:slide={{ duration: 1000 }}>
			<p class="font-bold text-stone-200">Body fat percentage:</p>

			<div class="flex w-full justify-center">
				<div class="flex w-24 space-x-1 rounded border border-stone-400 p-2 text-stone-200">
					<input
						id="bodyfat"
						type="number"
						step="0.1"
						min="0"
						max="50"
						bind:value={inputValue}
						bind:this={inputElement}
						onfocus={selectInput}
						use:focusElement
						class="w-13 border-none text-right focus-visible:outline-none"
					/>
					<label for="bodyfat">%</label>
				</div>
			</div>

			<div class="mt-5 flex w-full justify-center">
				<button
					class="rounded bg-indigo-600 px-5 py-2 font-bold text-stone-200 disabled:bg-stone-600 disabled:text-stone-400"
					onclick={onSubmit}
				>
					Confirm
				</button>
			</div>
		</div>
	{/if}
</div>
