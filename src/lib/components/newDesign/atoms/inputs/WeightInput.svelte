<script lang="ts">
	import { focusElement } from '$lib/utils';

	interface Props {
		id: string;
		name: string;
		placeholder: string;
		type: string;
	}

	const { id, name, placeholder, type }: Props = $props();
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
		step="0.01"
		use:focusElement
		required
	/>
	<span class="flex items-center text-stone-400">kg</span>
</div>
