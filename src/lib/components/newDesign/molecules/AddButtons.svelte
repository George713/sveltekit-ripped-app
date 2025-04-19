<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import Button from '../atoms/Button.svelte';

	interface Props {
		showAddOverlay: boolean;
	}

	let { showAddOverlay = $bindable() }: Props = $props();

	const currentPath = $state(page.url.pathname);
</script>

<div class="flex justify-center space-x-1">
	<Button
		text="FoodLib"
		icon="book"
		onclick={() => goto(`/foodLib?origin=${currentPath}`)}
		variant="secondary"
		classAddons="flex-1"
	/>
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
