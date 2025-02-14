<script lang="ts">
	interface Props {
		text: string;
		type?: 'submit' | 'button' | 'reset' | null | undefined;
		onclick?: () => void;
		variant?: 'primary' | 'secondary';
	}

	const { text, type = 'submit', onclick, variant = 'primary' }: Props = $props();
</script>

<button
	{type}
	class={{
		'rounded-sm px-3': true,
		'h-10 w-3/4 max-w-[270px] bg-indigo-600 text-xl font-semibold text-stone-200':
			variant === 'primary',
		'border border-stone-500 py-2.5 text-xs text-stone-500': variant === 'secondary'
	}}
	{onclick}
>
	{text}
</button>
