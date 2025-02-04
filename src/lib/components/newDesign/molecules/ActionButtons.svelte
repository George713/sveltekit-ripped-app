<script lang="ts">
	import { visibilityManager } from '$lib/stateManagers.svelte';

	import ActionButton from '../atoms/ActionButton.svelte';
</script>

<div class="mt-58 flex w-full justify-center space-x-8" style="transform: translateY(-43%)">
	<ActionButton
		size="big"
		icon="scale"
		glow={false}
		onclick={visibilityManager.toggleWeightOverlay}
	/>
	<ActionButton size="big" icon="book" glow={false} />
	<ActionButton size="big" icon="cutlery" glow={false} />
</div>
