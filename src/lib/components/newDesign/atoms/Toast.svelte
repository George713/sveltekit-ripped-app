<script lang="ts">
	import { fade } from 'svelte/transition';

	import type { Toast } from '$lib/types';
	import Attention from '../icons/Attention.svelte';
	import Envelope from '../icons/Envelope.svelte';

	interface Props {
		toast: Toast;
	}

	let { toast }: Props = $props();

	const header = $state(
		toast.type === 'error' ? 'Error' : toast.type === 'note' ? "Founder's Note" : 'Attention'
	);
</script>

<div
	transition:fade
	class={{
		'flex w-full flex-col rounded-lg border bg-black/80 p-4 backdrop-blur-xs': true,
		'border-rose-700': toast.type == 'error',
		'border-amber-500': toast.type == 'attention',
		'border-emerald-500': toast.type == 'note'
	}}
>
	{#if toast.type === 'note'}
		<Envelope classAddons="absolute size-9 -translate-x-1 -translate-y-2" />
	{:else}
		<Attention color={toast.type === 'error' ? 'rose' : 'amber'} classAddons="absolute" />
	{/if}
	<p
		class={{
			'mb-2 ml-10 leading-5 font-bold': true,
			'text-rose-700': toast.type == 'error',
			'text-amber-500': toast.type == 'attention',
			'text-emerald-500': toast.type == 'note'
		}}
	>
		{header}
	</p>
	<p
		class={{
			'mr-2 ml-10 whitespace-pre-line': true,
			'text-rose-700': toast.type == 'error',
			'text-amber-500': toast.type == 'attention',
			'text-emerald-500': toast.type == 'note'
		}}
	>
		{toast.message}
	</p>
</div>
