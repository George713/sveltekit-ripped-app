<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import Minimizer from '$lib/components/newDesign/atoms/Minimizer.svelte';

	import Sigil from '$lib/components/newDesign/atoms/Sigil.svelte';

	const bodyfat = $state(page.data.user.currentBF);
	const change = $state(0);
</script>

{#snippet rankInfo(rank: 'wood' | 'bronze' | 'silver' | 'gold' | 'platinum', range: string)}
	<div class="flex w-full items-center justify-center px-8">
		<div class="flex w-1/3 justify-center">
			<Sigil {rank} size="small" />
		</div>
		<p class="w-1/3 text-center">{rank.charAt(0).toUpperCase() + rank.slice(1)}</p>
		<p class="w-1/4 text-right">{range}</p>
	</div>
{/snippet}

<div class="mt-10 mb-5">
	<Sigil rank={page.data.user.currentStatus} />
</div>
<div class="mb-8 flex flex-col justify-center space-y-2 text-right">
	<div class="flex items-center">
		<p class="w-1/2 leading-5 font-medium text-stone-200">Your current body fat percentage is:</p>
		<p
			class="font-bungee w-1/3 text-right text-2xl text-stone-200 drop-shadow-[0px_2px_0px_rgba(79,70,229,1),0px_-2px_0px_rgba(79,70,229,1),2px_0px_0px_rgba(79,70,229,1),-2px_2px_0px_rgba(79,70,229,1)]"
		>
			{bodyfat}%
		</p>
	</div>
	<div class="flex">
		<p class="w-1/2 font-medium text-stone-400">Change:</p>
		<p class="w-1/3 text-right text-stone-400">{change.toFixed(1)}%</p>
	</div>
</div>
<div class="flex grow flex-col items-center space-y-2 text-xl text-white opacity-70">
	{@render rankInfo('wood', '>20%')}
	{@render rankInfo('bronze', '15-20%')}
	{@render rankInfo('silver', '12-15%')}
	{@render rankInfo('gold', '10-12%')}
	{@render rankInfo('platinum', '<10%')}
</div>

<div class="mb-1.5 flex w-full justify-center">
	<Minimizer onclick={() => goto('/')} direction="down" />
</div>
