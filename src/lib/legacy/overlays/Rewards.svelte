<script lang="ts">
	import { rewards } from '$lib/stores';
	import CollectibleReward from '$lib/legacy/molecules/rewards/CollectibleReward.svelte';
	import PowerUpReward from '$lib/legacy/molecules/rewards/PowerUpReward.svelte';

	import Background from '../../components/overlays/Background.svelte';
</script>

<Background>
	<div class="absolute bottom-10 w-full">
		<div class="flex flex-col items-center space-y-3">
			{#if $rewards.powerups > 0}
				<PowerUpReward />
			{/if}
			{#if $rewards.collectible}
				<CollectibleReward collectible={$rewards.collectible} />
			{/if}
		</div>
	</div>
</Background>
