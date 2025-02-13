<script lang="ts">
	import { dailySelectionManager } from '$lib/stateManagers.svelte';

	import CardArrayBackground from '../atoms/CardArrayBackground.svelte';
	import SelectionHeader from '../atoms/SelectionHeader.svelte';
	import CardArray from '../molecules/CardArray.svelte';
</script>

<div class="flex w-full flex-col px-0.5">
	<div class="flex w-full items-end justify-between px-2 pb-[1px]">
		<SelectionHeader icon="cutlery" text="Daily Selection" />
	</div>
	<CardArrayBackground color="dark">
		<CardArray
			items={dailySelectionManager.items}
			theme="dark"
			clickMode="removeFromDailySelection"
		/>
	</CardArrayBackground>
</div>
