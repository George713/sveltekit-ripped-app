<script lang="ts">
	import { goto } from '$app/navigation';
	import { slide } from 'svelte/transition';

	import ConquerorButton from '$lib/components/newDesign/atoms/ConquerorButton.svelte';
	import Minimizer from '$lib/components/newDesign/atoms/Minimizer.svelte';
	import Arrow from '$lib/components/newDesign/icons/Arrow.svelte';
	import Controller from '$lib/components/newDesign/icons/Controller.svelte';
	import { calorieManager, visibilityManager } from '$lib/stateManagers.svelte';
	import { focusElement, selectInput } from '$lib/utils';
	import CalorieTool from '$lib/components/newDesign/organisms/CalorieTool.svelte';

	let progressState = $state(0);
	let method = $state<string | undefined>(undefined);

	let inputValue: number | undefined = $state(undefined);
	// Starts as undefined, will be set to HTMLInputElement when mounted
	let inputElement = $state<HTMLInputElement | undefined>(undefined);

	const selectMethod = (selected: 'tool' | 'diy') => {
		method = selected;
	};

	const onSubmit = async () => {
		visibilityManager.toggleSpinnerOverlay();
		const formData = new FormData();
		formData.append('calories', inputValue!.toString());
		try {
			const response = await fetch('?/addCalorieTarget', {
				method: 'POST',
				body: formData
			});
			if (response.ok) {
				calorieManager.target = inputValue!;
				goto('/?unlockControls=true');
			}
		} catch (error) {
			// Handle error
		}
		visibilityManager.toggleSpinnerOverlay();
	};
</script>

{#snippet btn(text: string, onclick: () => void, selected: boolean)}
	<button
		class={{
			'h-10 w-25 rounded transition-colors duration-200': true,
			'border border-stone-700 bg-transparent text-stone-400': !selected,
			'border border-indigo-600 text-indigo-600': selected
		}}
		{onclick}
	>
		{text}
	</button>
{/snippet}

<div class="flex h-full flex-col">
	<div class="absolute top-1.5 left-1">
		<Minimizer direction="left" onclick={() => goto('/')} />
	</div>
	<div class="mt-7 ml-3.5 flex justify-center">
		<ConquerorButton scale={2.3} />
	</div>
	<div class="flex items-center justify-center space-x-2 pr-2">
		<Controller scale={1.2} />
		<p class="font-medium text-stone-200">Unlock Controls</p>
	</div>

	{#if method !== 'tool'}
		<div class="mb-8 flex w-full grow flex-col justify-end px-14 text-sm">
			{#if !method}
				<p
					class={{
						'transition-colors duration-1000': true,
						'text-stone-200': progressState === 0,
						'text-stone-600': progressState !== 0
					}}
					out:slide={{ duration: 1000 }}
				>
					Next to physical exercise the amount we eat determines how our bodies transform. Let’s
					figure out how many calories you should eat.
				</p>
			{/if}

			{#if progressState >= 1}
				<p
					class={{
						'mt-4 transition-colors duration-1000': true,
						'text-stone-200': progressState === 1,
						'text-stone-600': progressState !== 1
					}}
					transition:slide={{ duration: 1000 }}
				>
					Don’t worry about the initial calorie value too much. We will update it based on your
					weekly weight change.
				</p>
			{/if}

			{#if progressState >= 2}
				<p
					class={{
						'mt-4 transition-colors duration-1000': true,
						'text-stone-200': progressState === 2 && !method,
						'text-stone-600': progressState !== 2 || method
					}}
					transition:slide={{ duration: 1000 }}
				>
					Would you like to use a simple estimator tool or enter the initial calories yourself?
				</p>
				<div class="mt-4 flex justify-center space-x-2" transition:slide={{ duration: 1000 }}>
					<!-- @ts-expect-error TS2367: Ignoring type overlap error -->
					{@render btn('Use Tool', () => selectMethod('tool'), method === 'tool')}
					{@render btn('Do it myself', () => selectMethod('diy'), method === 'diy')}
				</div>
			{/if}

			<!-- If DIY is selected -->
			{#if method === 'diy'}
				<div class="mt-4 space-y-4" in:slide={{ duration: 1000 }}>
					<p class="font-bold text-stone-200">Daily target calories:</p>

					<div class="flex w-full justify-center">
						<div class="flex w-24 space-x-1 rounded border border-stone-400 p-2 text-stone-200">
							<input
								class="w-13 border-none text-right focus-visible:outline-none"
								id="calories"
								type="number"
								step="1"
								min="0"
								max="5000"
								required
								bind:value={inputValue}
								bind:this={inputElement}
								onfocus={selectInput}
								use:focusElement
							/>
							<label for="calories">kcal</label>
						</div>
					</div>

					<div class="mt-5 flex w-full justify-center">
						<button
							class="rounded bg-indigo-600 px-5 py-2 font-bold text-stone-200 disabled:bg-stone-600 disabled:text-stone-400"
							disabled={inputValue === undefined}
							onclick={onSubmit}
						>
							Confirm
						</button>
					</div>
				</div>
			{/if}
		</div>
	{:else}
		<!-- If TOOL is selected -->
		<CalorieTool bind:calculatedCalories={inputValue} {onSubmit} />
	{/if}

	{#if progressState !== 2 && method !== 'tool'}
		<div
			transition:slide={{ duration: 1000 }}
			class="my-5 flex w-full flex-col items-center justify-center"
		>
			<Arrow disabled={false} onclick={() => progressState++} />
		</div>
	{/if}
</div>
