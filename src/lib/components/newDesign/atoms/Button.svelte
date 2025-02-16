<script lang="ts">
	import Microphone from '../icons/Microphone.svelte';
	import Plus from '../icons/Plus.svelte';

	interface Props {
		text: string;
		type?: 'submit' | 'button' | 'reset' | null | undefined;
		onclick?: () => void;
		variant?: 'primary' | 'secondary';
		icon?: 'plus' | 'microphone';
		classAddons?: string;
	}

	const {
		text,
		type = 'submit',
		onclick,
		variant = 'primary',
		icon,
		classAddons = ''
	}: Props = $props();
</script>

{#snippet symbol(icon?: 'plus' | 'microphone')}
	{#if icon === 'plus'}
		<Plus size="small" />
	{:else if icon === 'microphone'}
		<Microphone />
	{/if}
{/snippet}

<button
	{type}
	class={{
		'flex items-center justify-center space-x-1 rounded-sm px-3': true,
		[classAddons]: classAddons,
		'h-10 w-3/4 max-w-[270px] bg-indigo-600 text-xl font-semibold text-stone-200':
			variant === 'primary',
		'border border-stone-500 py-1 text-sm text-stone-400': variant === 'secondary'
	}}
	{onclick}
>
	{@render symbol(icon)}
	<p>
		{text}
	</p>
</button>
