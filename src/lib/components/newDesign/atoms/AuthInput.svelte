<script lang="ts">
	interface Props {
		id: string;
		placeholder: string;
		type: string;
	}

	const { id, placeholder, type }: Props = $props();
</script>

<input
	class="h-10 w-3/4 max-w-[270px] appearance-none rounded-sm border border-stone-400 bg-transparent px-3 text-stone-400 placeholder-stone-400 focus:border-2 focus:border-indigo-600 focus:bg-transparent focus:text-stone-400 focus:outline-hidden"
	{type}
	{placeholder}
	{id}
	required
/>
