<script lang="ts">
	// Atoms
	import PowerUps from '$atoms/PowerUps.svelte';
	import VaultButton from '$atoms/VaultButton.svelte';
	import PowerLines from '$atoms/powerlines/PowerLines.svelte';
	// Molecules
	import ActionButtons from '$molecules/ActionButtons.svelte';
	import AdditionalActionButtons from '$molecules/AdditionalActionButtons.svelte';
	import TrackingWidget from '$molecules/TrackingWidget.svelte';
</script>

<div class="mt-auto flex flex-col items-center">
	<TrackingWidget />
	<PowerLines />
	<PowerUps />
	<VaultButton />
	<AdditionalActionButtons />
	<ActionButtons />
</div>
