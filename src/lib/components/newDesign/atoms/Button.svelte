<script lang="ts">
	interface Props {
		text: string;
		type?: 'submit' | 'button' | 'reset' | null | undefined;
		onclick?: () => void;
	}

	const { text, type = 'submit', onclick }: Props = $props();
</script>

<button
	{type}
	class="h-10 w-3/4 max-w-[270px] rounded-sm bg-indigo-600 px-3 text-xl font-semibold text-stone-200"
	{onclick}
>
	{text}
</button>
