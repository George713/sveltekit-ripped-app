<script lang="ts">
	// Icons
	import Magnifier from '$icons/Magnifier.svelte';

	interface Props {
		twoWeekData: Array<'success' | 'failure' | 'unknown'>;
	}

	let { twoWeekData }: Props = $props();
</script>

{#snippet statusSquare(status: 'success' | 'failure' | 'unknown', size: 'small' | 'big')}
	<div
		class={{
			'flex justify-center rounded text-stone-400': true,
			'size-4 items-end text-[10px]': size === 'small',
			'size-5 items-center text-sm': size === 'big',
			'bg-emerald-600': status === 'success',
			'bg-rose-900': status === 'failure',
			'bg-stone-600': status === 'unknown'
		}}
	>
		{status === 'unknown' ? '?' : ''}
	</div>
{/snippet}

{#snippet squareWithText(text: string, status: 'success' | 'failure' | 'unknown')}
	<div class="flex items-end space-x-1">
		{@render statusSquare(status, 'small')}
		<p class="text-[10px] text-stone-400">{text}</p>
	</div>
{/snippet}

{#snippet week(text: string, data: Array<'success' | 'failure' | 'unknown'>)}
	<div class="flex items-center space-x-2">
		<p class="w-17 text-right text-sm font-medium text-stone-400">{text}</p>
		<div class="mr-2 flex space-x-1">
			{#each data as status}
				{@render statusSquare(status, 'big')}
			{/each}
		</div>
	</div>
{/snippet}

<div class="flex flex-col items-center space-y-1">
	<div class="flex items-center space-x-1">
		<Magnifier scale={1.1} />
		<p class="font-medium text-stone-300">Tracking Success</p>
	</div>
	{@render week('prior week', twoWeekData.slice(0, 7))}
	{@render week('last week', twoWeekData.slice(-7))}
	<div class="mt-1 flex w-full justify-center space-x-4 opacity-50">
		{@render squareWithText('Hit target', 'success')}
		{@render squareWithText('Missed target', 'failure')}
		{@render squareWithText('No data', 'unknown')}
	</div>
</div>
