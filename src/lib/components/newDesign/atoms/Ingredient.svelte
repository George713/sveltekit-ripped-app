<script lang="ts">
	import { selectInput } from '$lib/utils';

	interface Props {
		icon: string;
		name: string;
		kcal: number;
		protein: number;
		shouldFocus: boolean;
	}

	let {
		icon,
		name = $bindable(),
		kcal = $bindable(),
		protein = $bindable(),
		shouldFocus = false
	}: Props = $props();

	let nameInput: HTMLInputElement;

	$effect(() => {
		if (shouldFocus) {
			nameInput?.focus();
		}
	});
</script>

<div
	class="flex h-9 w-full items-center space-x-1 rounded-[6px] border border-stone-700 px-2 text-sm font-thin text-stone-400"
>
	<label for={'name_' + name} class="size-5">{icon}</label>
	<input
		type="text"
		id={'name_' + name}
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
		id={'kcal_' + name}
		name="kcal"
		step="0.1"
		class="w-9 text-right focus-visible:outline-none"
		spellcheck="false"
		autocomplete="off"
		onfocus={selectInput}
		bind:value={kcal}
	/>
	<label for={'kcal_' + name}>kcal</label>
	<input
		type="number"
		id={'protein_' + name}
		name="protein"
		step="0.1"
		class="w-7 text-right focus-visible:outline-none"
		spellcheck="false"
		autocomplete="off"
		onfocus={selectInput}
		bind:value={protein}
	/>
	<label for={'protein_' + name} class="pr-4">g</label>
</div>
