<script lang="ts">
	interface Props {
		text: string;
	}

	const { text }: Props = $props();
</script>

<button
	class="h-10 w-3/4 max-w-[270px] rounded-sm bg-indigo-600 px-3 text-[20px] font-semibold text-stone-200"
>
	{text}
</button>
