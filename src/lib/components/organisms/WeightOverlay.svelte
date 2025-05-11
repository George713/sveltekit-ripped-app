<script lang="ts">
	// Logic
	import { visibilityManager } from '$lib/stateManagers.svelte';
	// Atoms
	import BackgroundSemiTransparent from '$atoms/BackgroundSemiTransparent.svelte';
	// Molecules
	import WeightInput from '$molecules/WeightInput.svelte';
</script>

<BackgroundSemiTransparent
	onclick={(e) => {
		if (e.target === e.currentTarget) {
			visibilityManager.toggleWeightOverlay();
		}
	}}
	classAddons="flex flex-col items-center justify-end pb-64"
>
	<WeightInput />
</BackgroundSemiTransparent>
