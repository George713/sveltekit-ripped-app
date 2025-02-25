<script lang="ts">
	import { page } from '$app/state';
	import { visibilityManager } from '$lib/stateManagers.svelte';
	import { goto } from '$app/navigation';

	import ActionButton from '../atoms/ActionButton.svelte';
</script>

<div class="mt-58 flex w-full justify-center space-x-8" style="transform: translateY(-43%)">
	<ActionButton
		size="big"
		icon="scale"
		glow={page.data.dailyProgress.weighIn}
		disabled={page.data.dailyProgress.weighIn}
		onclick={visibilityManager.toggleWeightOverlay}
	/>
	<ActionButton
		size="big"
		icon="book"
		glow={page.data.dailyProgress.planned}
		disabled={false}
		onclick={() => goto('/planner')}
	/>
	<!-- {page.data.dailyProgress.planned} -->
	<ActionButton
		size="big"
		icon="cutlery"
		glow={page.data.dailyProgress.harvest}
		disabled={page.data.dailyProgress.harvest}
		onclick={() => goto('/log')}
	/>
</div>
