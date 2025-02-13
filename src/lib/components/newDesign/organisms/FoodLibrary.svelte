<script lang="ts">
	import { foodItemManager } from '$lib/stateManagers.svelte';

	import CardArrayBackground from '../atoms/CardArrayBackground.svelte';
	import SelectionHeader from '../atoms/SelectionHeader.svelte';
	import SubtleButton from '../atoms/SubtleButton.svelte';
	import CardArray from '../molecules/CardArray.svelte';
</script>

<div class="flex w-full flex-col px-0.5">
	<div class="flex w-full items-end justify-between px-2 pb-[1px]">
		<SelectionHeader icon="book" text="Food Library" />
		<SubtleButton text="Sets" />
	</div>
	<CardArrayBackground color="light">
		<CardArray items={foodItemManager.items} theme="light" clickMode="addToDailySelection" />
	</CardArrayBackground>
</div>
