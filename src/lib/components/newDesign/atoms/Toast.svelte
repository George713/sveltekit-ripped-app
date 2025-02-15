<script lang="ts">
	import { fade } from 'svelte/transition';

	import type { Toast } from '$lib/types';
	import Attention from '../icons/Attention.svelte';

	interface Props {
		toast: Toast;
	}

	let { toast }: Props = $props();
</script>

<div
	transition:fade
	class={{
		'flex w-full flex-col rounded-lg border bg-black/60 p-4 backdrop-blur-xs': true,
		'border-rose-700': toast.type == 'error',
		'border-amber-500': toast.type == 'attention'
	}}
>
	<Attention color={toast.type === 'error' ? 'rose' : 'amber'} classAddons="absolute" />
	<p
		class={{
			'mx-10 mb-2 leading-5 font-bold': true,
			'text-rose-700': toast.type == 'error',
			'text-amber-500': toast.type == 'attention'
		}}
	>
		{toast.type.charAt(0).toUpperCase() + toast.type.slice(1)}
	</p>
	<p
		class={{
			'mx-10 ': true,
			'text-rose-700': toast.type == 'error',
			'text-amber-500': toast.type == 'attention'
		}}
	>
		{toast.message}
	</p>
</div>
