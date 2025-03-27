<script lang="ts">
	import PowerUps from '../atoms/PowerUps.svelte';
	import ConquerorButton from '../atoms/ConquerorButton.svelte';
	import PowerLines from '../atoms/powerlines/PowerLines.svelte';
	import ActionButtons from '../molecules/ActionButtons.svelte';
	import AdditionalActionButtons from '../molecules/AdditionalActionButtons.svelte';
	import TrackingWidget from '../molecules/TrackingWidget.svelte';

	let xpGained = $state<number | undefined>(undefined);
	let briefGlow = $state(false);
</script>

<div class="mt-auto flex flex-col items-center">
	<TrackingWidget />
	<PowerLines />
	<PowerUps />
	<ConquerorButton />
	<AdditionalActionButtons />
	<ActionButtons />
</div>
