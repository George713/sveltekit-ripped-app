<script lang="ts">
	import { detailedCollectible } from '$lib/stores';

	$: item = $detailedCollectible;
</script>

<div class="mx-7 text-gray-400">
	<!-- Collectible Name & Quantity -->
	<div class="flex w-full items-end p-0.5">
		<p class="grow text-2xl">{item.name}</p>
		<p class="text-sm">Quantity: {item.count}</p>
	</div>
	<!-- Image -->
	<img
		class="rounded-sm border-2 {item.rarity === 'bronze'
			? 'border-bronze'
			: item.rarity === 'silver'
				? 'border-silver'
				: item.rarity === 'gold'
					? 'border-gold'
					: 'border-blue-600/50'}"
		src={item.imgPath}
		alt="Image of {item.name}"
	/>
	<!-- Text -->
	<p class="text-pretty p-1 text-xs">{item.text}</p>
</div>
