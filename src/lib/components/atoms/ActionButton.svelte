<script lang="ts">
	export let text = '';
	export let disabled = false;
	export let onclick = () => {};
	export let width = 14;
</script>

<button
	class="mx-4 h-14 w-{width} rounded border border-gray-400/10 bg-gray-300 text-[20px] font-bold text-neutral-600 shadow disabled:bg-gray-200 disabled:text-neutral-400"
	on:click={onclick}
	{disabled}
>
	{text}
</button>
