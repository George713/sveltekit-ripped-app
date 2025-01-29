<script lang="ts">
	import { fade } from 'svelte/transition';

	import type { Toast } from '$lib/types';

	interface Props {
		toast: Toast;
	}

	let { toast }: Props = $props();
</script>

{#snippet type(type: string)}
	{#if type == 'error'}
		<img src="/icons/Attention.svg" alt="errorIcon" class="absolute" />
		<p class="mx-10 mb-2 leading-5 font-bold text-rose-700">Error</p>
	{/if}
{/snippet}

<div transition:fade class="flex w-full flex-col rounded-lg border border-rose-700 bg-black/60 p-4">
	{@render type(toast.type)}
	<p class="mx-10 text-rose-700">
		{toast.message}
	</p>
</div>
