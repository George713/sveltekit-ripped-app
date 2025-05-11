<script lang="ts">
	// Logic
	import { focusElement, selectInput } from '$lib/utils.svelte';

	interface Props {
		id: string;
		name: string;
		placeholder: string;
		type: string;
		unit: string;
		step?: string;
		value?: number | undefined;
	}

	let { id, name, placeholder, type, unit, step = '0.01', value = $bindable() }: Props = $props();
</script>

<div
	class="flex h-10 space-x-2 rounded-sm border border-stone-400 px-2 focus-within:border-4 focus-within:border-double focus-within:border-indigo-600"
>
	<input
		class="w-14 appearance-none text-right text-stone-400 placeholder-stone-400 focus:text-stone-200 focus:outline-hidden"
		{type}
		{placeholder}
		{id}
		{name}
		{step}
		bind:value
		use:focusElement
		onfocus={selectInput}
		required
	/>
	<span class="flex items-center text-stone-400">{unit}</span>
</div>
