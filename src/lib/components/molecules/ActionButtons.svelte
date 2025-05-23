<script lang="ts">
	// Svelte & SvelteKit
	import { page } from '$app/state';
	import { goto } from '$app/navigation';
	// Logic
	import { visibilityManager, calorieManager } from '$lib/stateManagers.svelte';
	// Atoms
	import ActionButton from '$atoms/ActionButton.svelte';
</script>

<div class="mt-58 flex w-full justify-center space-x-8" style="transform: translateY(-43%)">
	<ActionButton
		size="big"
		icon="scale"
		glowStrength={page.data.dailyProgress.weighIn ? 1 : 0}
		disabled={page.data.dailyProgress.weighIn}
		onclick={visibilityManager.toggleWeightOverlay}
	/>
	<ActionButton
		size="big"
		icon="book"
		glowStrength={page.data.dailyProgress.planned ? 1 : 0}
		disabled={page.data.dailyProgress.planned}
		onclick={() => goto('/app/planner')}
	/>

	<ActionButton
		size="big"
		icon="cutlery"
		glowStrength={calorieManager.eatenPct}
		disabled={page.data.dailyProgress.vaultOpened}
		onclick={() => goto('/app/log')}
	/>
</div>
