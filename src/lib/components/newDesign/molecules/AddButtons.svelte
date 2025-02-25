<script lang="ts">
	import Button from '../atoms/Button.svelte';

	interface Props {
		showAddOverlay: boolean;
	}

	let { showAddOverlay = $bindable() }: Props = $props();
</script>

<div class="flex justify-center space-x-1 px-4">
	<Button text="FoodLib" icon="book" onclick={() => {}} variant="secondary" classAddons="flex-1" />
	<Button
		text="Add"
		icon="plus"
		onclick={() => (showAddOverlay = true)}
		variant="secondary"
		classAddons="flex-1"
	/>
	<Button
		text="Record"
		icon="microphone"
		onclick={() => (showAddOverlay = true)}
		variant="secondary"
		classAddons="flex-1"
	/>
</div>
