<script lang="ts">
	import CardArrayBackground from '../atoms/CardArrayBackground.svelte';
	import Bolt from '../icons/Bolt.svelte';
	import Scale from '../icons/Scale.svelte';

	interface Props {
		icon: 'bolt' | 'scale';
		color: 'amber' | 'indigo';
		mainText: string;
		subText: string;
		value: number;
		unit: string;
	}

	let { icon, color, mainText, subText, value, unit }: Props = $props();
</script>

{#snippet symbol(variant: 'bolt' | 'scale')}
	{#if variant === 'bolt'}
		<Bolt size="big" color="yellow" />
	{:else if variant === 'scale'}
		<Scale scale={1} color="fill-indigo-500" />
	{/if}
{/snippet}

<CardArrayBackground color="dark" classAddons="flex-col p-3 w-40">
	<div class="flex space-x-2">
		{@render symbol(icon)}
		<div class="mr-2 flex flex-col">
			<p class="text-sm font-medium text-stone-300">{mainText}</p>
			<p class="text-xs font-medium text-stone-300">{subText}</p>
			<div class="mt-3 flex items-baseline">
				<p
					class={{
						'text-xl font-bold ': true,
						'text-indigo-500': color === 'indigo',
						'text-amber-400': color === 'amber'
					}}
				>
					{value >= 0 && unit === 'kg' ? '+' : ''}{unit === 'kg'
						? value.toFixed(2)
						: value.toLocaleString('en-US')}
				</p>
				<p
					class={{
						'ml-1 font-medium': true,
						'text-indigo-500': color === 'indigo',
						'text-amber-400': color === 'amber'
					}}
				>
					{unit}
				</p>
			</div>
		</div>
	</div>
</CardArrayBackground>
