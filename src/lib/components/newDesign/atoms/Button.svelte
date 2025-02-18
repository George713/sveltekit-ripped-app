<script lang="ts">
	import Microphone from '../icons/Microphone.svelte';
	import Plus from '../icons/Plus.svelte';

	interface Props {
		text: string;
		type?: 'submit' | 'button' | 'reset' | null | undefined;
		onclick?: () => void;
		variant?: 'primary' | 'secondary';
		wide?: boolean;
		icon?: 'plus' | 'microphone';
		toggle?: boolean;
		disabled?: boolean;
		classAddons?: string;
	}

	const {
		text,
		type = 'submit',
		onclick,
		variant = 'primary',
		wide = false,
		icon,
		toggle = false,
		disabled = false,
		classAddons = ''
	}: Props = $props();
</script>

{#snippet symbol(icon?: 'plus' | 'microphone')}
	{#if icon === 'plus'}
		<Plus size="small" />
	{:else if icon === 'microphone'}
		<Microphone {toggle} />
	{/if}
{/snippet}

<button
	{type}
	class={{
		'flex items-center justify-center space-x-1 rounded-sm px-5': true,
		[classAddons]: classAddons,
		'h-10 bg-indigo-600 text-xl font-semibold text-stone-200': variant === 'primary' && !disabled,
		'h-10 bg-stone-600 text-xl font-semibold text-stone-400': variant === 'primary' && disabled,
		'h-9 border border-stone-700 py-1.5 text-sm text-stone-400': variant === 'secondary' && !toggle,
		'animate-pulse border border-rose-700 py-1.5 text-sm text-rose-700':
			variant === 'secondary' && toggle,
		'w-3/4 max-w-[270px]': wide
	}}
	{onclick}
	{disabled}
>
	{@render symbol(icon)}
	<p>
		{text}
	</p>
</button>
