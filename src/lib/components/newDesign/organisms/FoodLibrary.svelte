<script lang="ts">
	import { foodItemManager } from '$lib/stateManagers.svelte';

	import CardArrayBackground from '../atoms/CardArrayBackground.svelte';
	import SelectionHeader from '../atoms/SelectionHeader.svelte';
	import SubtleButton from '../atoms/SubtleButton.svelte';
	import CardArray from '../molecules/CardArray.svelte';
</script>

<div class="mx-0.5 flex flex-col">
	<div class="flex w-full items-end justify-between px-2 pb-[1px]">
		<SelectionHeader icon="book" text="Food Library" />
		<SubtleButton text="Sets" />
	</div>
	<CardArrayBackground color="light">
		<CardArray items={foodItemManager.items} />
	</CardArrayBackground>
</div>
