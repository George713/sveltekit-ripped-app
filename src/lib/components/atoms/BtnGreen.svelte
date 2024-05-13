<script lang="ts">
	export let text: string;
	export let secondary: boolean = false;
	export let onclick: () => void;
</script>

{#if secondary}
	<button
		on:click={onclick}
		class="w-28 h-14 border-2 rounded border-green-400 text-lg font-medium text-stone-700 shadow-md"
		>{text}</button
	>
{:else}
	<button
		on:click={onclick}
		class="w-28 h-14 rounded bg-green-400 text-lg font-bold text-stone-700 shadow-md">{text}</button
	>
{/if}
