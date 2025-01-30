<script lang="ts">
	import { xpManager } from '$lib/stateManagers.svelte';
</script>

<div class="relative flex flex-col p-3 text-stone-700">
	<div class="flex justify-between">
		<!-- Level -->
		<div class="font-bungee text-xl">Lv.{xpManager.level}</div>
		<!-- XP numeric -->
		{#if xpManager.level < 10}
			<div class="mb-0.5 flex items-end text-xs">{xpManager.currentXP}/{xpManager.requiredXP}</div>
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
