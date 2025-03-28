<script lang="ts">
	import { afterNavigate } from '$app/navigation';

	import { xpManager } from '$lib/stateManagers.svelte';
	import NumberFlow, { continuous } from '@number-flow/svelte';

	afterNavigate(() => {
		// Timeout is set so that the vault animation (in ConquerorButton) finishes first
		setTimeout(() => {
			const xpGained = xpManager.extractCachedDirectXP();
		}, 3000);
	});
</script>

<div class="relative mt-1 flex flex-col p-3 text-stone-700">
	<div class="mb-[-3px] flex justify-between">
		<!-- Level -->
		<div class="font-bungee text-xl">
			Lv.{xpManager.level}
		</div>
		<!-- XP numeric -->
		{#if xpManager.level < 10}
			<div class="mr-0.5 mb-0.25 flex items-end text-xs">
				<NumberFlow
					plugins={[continuous]}
					value={xpManager.currentXP}
					spinTiming={{
						// Used for the digit spin animations.
						// Will fall back to `transformTiming` if unset:
						duration: 2000,
						easing: 'ease-in-out'
					}}
					opacityTiming={{
						// Used for fading in/out characters:
						duration: 750,
						easing: 'ease-out'
					}}
				/>
				<NumberFlow
					plugins={[continuous]}
					value={xpManager.requiredXP}
					prefix="/"
					spinTiming={{
						// Used for the digit spin animations.
						// Will fall back to `transformTiming` if unset:
						duration: 2000,
						easing: 'ease-in-out'
					}}
					opacityTiming={{
						// Used for fading in/out characters:
						duration: 750,
						easing: 'ease-out'
					}}
				/>
			</div>
		{/if}
	</div>
	<!-- XP Bar -->
	<div class="relative">
		<!-- Total -->
		<div class="absolute h-0.5 w-full rounded-xl bg-stone-700"></div>
		<!-- Current -->
		<div
			class="absolute h-0.5 rounded-xl bg-stone-500 transition-all duration-2000"
			style:width="{xpManager.progressPct}%"
		></div>
	</div>
</div>
