<script lang="ts">
	import { page } from '$app/state';
	import { visibilityManager } from '$lib/stateManagers.svelte';

	import XPHud from '$lib/components/newDesign/atoms/XPHud.svelte';
	import Sigil from '$lib/components/newDesign/atoms/Sigil.svelte';
	import ActionPanel from '$lib/components/newDesign/organisms/ActionPanel.svelte';
	import WeightOverlay from '$lib/components/newDesign/organisms/WeightOverlay.svelte';
	import LockCover from '$lib/components/newDesign/organisms/LockCover.svelte';

	const { data } = $props();
</script>

<XPHud />
<Sigil rank={page.data.user.currentStatus} />
<ActionPanel />
{#if visibilityManager.weightOverlay}
	<WeightOverlay />
{/if}

{#if data.unlockProgress && (!data.unlockProgress.unlockedRank || !data.unlockProgress.unlockedControls || !data.unlockProgress.unlockedAddons)}
	<LockCover unlockProgress={data.unlockProgress} />
{/if}
