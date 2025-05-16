<script lang="ts">
	// Svelte & Sveltekit
	import { fly } from 'svelte/transition';
	// Logic
	import { ingredientManager } from '$lib/stateManagers.svelte';
	import { selectInput, SwipeDetector } from '$lib/utils.svelte';

	interface Props {
		id: number;
		icon: string;
		name: string;
		kcal: number;
		protein: number;
		shouldFocus: boolean;
	}

	let {
		id,
		icon,
		name = $bindable(),
		kcal = $bindable(),
		protein = $bindable(),
		shouldFocus = false
	}: Props = $props();

	let nameInput: HTMLInputElement;

	const swipeDetector = new SwipeDetector({
		threshold: 50,
		onSwipeLeft: () => {},
		onSwipeRight: () => ingredientManager.remove(id)
	});

	$effect(() => {
		if (shouldFocus) {
			nameInput?.focus();
		}
	});
</script>

<div
	class="flex h-9 w-full items-center space-x-1 rounded-[6px] border border-stone-700 px-2 text-sm font-thin text-stone-400"
	ontouchstart={swipeDetector.handleTouchStart}
	ontouchmove={swipeDetector.handleTouchMove}
	in:fly={{ x: -20, duration: 750 }}
	out:fly={{ x: 20, duration: 750 }}
>
	<label for={'name_' + id} class="size-5">{icon}</label>
	<input
		type="text"
		id={'name_' + id}
		name="name"
		class="grow focus-visible:outline-none"
		spellcheck="false"
		autocomplete="off"
		onfocus={selectInput}
		bind:value={name}
		bind:this={nameInput}
	/>
	<input
		type="number"
		id={'kcal_' + id}
		name="kcal"
		step="0.1"
		class="w-9 text-right focus-visible:outline-none"
		spellcheck="false"
		autocomplete="off"
		onfocus={selectInput}
		bind:value={kcal}
	/>
	<label for={'kcal_' + id}>kcal</label>
	<input
		type="number"
		id={'protein_' + id}
		name="protein"
		step="0.1"
		class="w-7 text-right focus-visible:outline-none"
		spellcheck="false"
		autocomplete="off"
		onfocus={selectInput}
		bind:value={protein}
	/>
	<label for={'protein_' + id} class="pr-4">g</label>
</div>
