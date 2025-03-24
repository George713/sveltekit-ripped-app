<script lang="ts">
	import PowerUps from '../atoms/PowerUps.svelte';
	import ConquerorButton from '../atoms/ConquerorButton.svelte';
	import PowerLines from '../atoms/powerlines/PowerLines.svelte';
	import ActionButtons from '../molecules/ActionButtons.svelte';
	import AdditionalActionButtons from '../molecules/AdditionalActionButtons.svelte';
	import TrackingWidget from '../molecules/TrackingWidget.svelte';
</script>

<div class="mt-auto flex flex-col items-center">
	<TrackingWidget />
	<PowerLines />
	<PowerUps />
	<button class="absolute" style="transform: translate(2%,143%)">
		<ConquerorButton />
	</button>
	<AdditionalActionButtons />
	<ActionButtons />
</div>
