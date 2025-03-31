<script lang="ts">
	import { page } from '$app/state';
	import { visibilityManager } from '$lib/stateManagers.svelte';

	import BackgroundSemiTransparent from '../atoms/BackgroundSemiTransparent.svelte';
	import Button from '../atoms/Button.svelte';
	import ColoredHeader from '../atoms/ColoredHeader.svelte';
	import Input from '../atoms/inputs/Input.svelte';
	import Chart from '../icons/Chart.svelte';

	interface Props {
		adjustTarget: (newCalories: number | undefined) => void;
	}

	const { adjustTarget }: Props = $props();

	let newCalories = $state(page.data.dailyProgress.targetCalories);
</script>

<BackgroundSemiTransparent
	onclick={(e) => {
		if (e.target === e.currentTarget) {
			visibilityManager.toggleCalorieOverlay();
		}
	}}
	classAddons="flex flex-col items-center justify-end pb-64"
>
	<div
		class="relative flex w-80 items-center justify-center rounded-lg border border-indigo-600 bg-black/60 backdrop-blur"
	>
		<!-- Icon -->
		<div class="absolute top-2.5 left-2.5">
			<Chart color="fill-indigo-500" />
		</div>
		<!-- Center element -->
		<form autocomplete="off" class="my-4 flex flex-col items-center justify-center space-y-2">
			<!-- Header -->
			<ColoredHeader text="Enter caloric target" />
			<!-- Input -->
			<Input
				id="calories"
				name="calories"
				placeholder={page.data.dailyProgress.targetCalories.toString()}
				type="number"
				unit="kcal"
				step="1"
				bind:value={newCalories}
			/>
			<!-- Button -->
			<Button text="Submit" type="button" wide={true} onclick={() => adjustTarget(newCalories)} />
		</form>
	</div>
</BackgroundSemiTransparent>
