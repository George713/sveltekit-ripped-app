<script lang="ts">
	import { calorieManager, proteinManager } from '$lib/stateManagers.svelte';

	import Bolt from '../icons/Bolt.svelte';
	import Eggs from '../icons/Eggs.svelte';
</script>

{#snippet bar(color: 'yellow' | 'blue' | 'red', fillPct: number)}
	<div class="flex space-x-1">
		<div class="flex w-6 items-center justify-center">
			{#if color === 'yellow'}
				<Bolt size="small" color="yellow" />
			{:else if color === 'blue'}
				<Eggs />
			{:else if color === 'red'}
				<Bolt size="small" color="red" />
			{/if}
		</div>

		<div class="inner-shadows flex h-5 w-48 items-center rounded bg-stone-900">
			<div
				class={{
					'mx-1.5 h-[calc(100%-12px)] rounded-[3px] transition-all duration-2000': true,
					'yellow-gradient yellow-glow': color === 'yellow',
					'blue-gradient blue-glow': color === 'blue',
					'red-gradient red-glow animate-pulse-70': color === 'red'
				}}
				style={`width: calc(${fillPct * 100}% - 8px)`}
			></div>
		</div>
	</div>
{/snippet}

<div class="flex flex-col space-y-2">
	{@render bar(calorieManager.underTarget ? 'yellow' : 'red', calorieManager.eatenPct)}
	{@render bar('blue', proteinManager.eatenPct)}
</div>

<style>
	.inner-shadows {
		box-shadow:
        /* Bottom shadow, top shaddow */
			inset 0 -1px 1px rgba(255, 255, 255, 0.1),
			inset 0 1px 4px rgba(0, 0, 0, 0.25);
	}
	.yellow-gradient {
		/* yellow-100: #fef3c7, yellow-300: #fde047 */
		background: linear-gradient(
			to right,
			#fde047 0%,
			#fef3c7 25%,
			#fde047 50%,
			#fef3c7 75%,
			#fde047 100%
		);
	}
	.yellow-glow {
		/* glow via several shadows with different blur values */
		box-shadow:
			0 0 1px #fde047,
			0 0 3px #fde047,
			0 0 6px #fde047;
	}
	.blue-gradient {
		/* sky-100: #E0F2FE, sky-200: #BAE6FD, sky-300: #7DD3FC */
		background: linear-gradient(
			to right,
			#7dd3fc 0%,
			#e0f2fe 25%,
			#bae6fd 50%,
			#e0f2fe 75%,
			#7dd3fc 100%
		);
	}
	.blue-glow {
		/* glow via several shadows with different blur values, using cyan-400 #26c6da */
		box-shadow:
			0 0 0.2px #26c6da,
			0 0 0.5px #26c6da,
			0 0 1px #26c6da,
			0 0 2px #26c6da,
			0 0 4px #26c6da,
			0 0 8px #26c6da;
	}
	.red-gradient {
		/* red-100: #fee2e2, red-300: #fca5a5 */
		background: linear-gradient(
			to right,
			#fca5a5 0%,
			#fee2e2 25%,
			#fca5a5 50%,
			#fee2e2 75%,
			#fca5a5 100%
		);
	}
	.red-glow {
		/* glow via several shadows with different blur values, using red-400 #f87171 */
		box-shadow:
			0 0 0.2px #f87171,
			0 0 0.5px #f87171,
			0 0 1px #f87171,
			0 0 2px #f87171,
			0 0 4px #f87171,
			0 0 8px #f87171;
	}

	/* Custom pulse animation with opacity 0.7 instead of 0.5 */
	@keyframes pulse-70 {
		50% {
			opacity: 0.7;
		}
	}

	.animate-pulse-70 {
		animation: pulse-70 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
	}
</style>
