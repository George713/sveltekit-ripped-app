<script lang="ts">
	import Button from '../atoms/Button.svelte';

	let toggle = $state(false);

	const toggleRecording = () => {
		toggle = !toggle;
	};
</script>

<div class="flex w-full flex-1 flex-col justify-end">
	<!-- Buttons -->
	<div class="flex space-x-1">
		<Button text="Add" variant="secondary" icon="plus" classAddons="grow" />
		<Button
			text="Record"
			variant="secondary"
			icon="microphone"
			classAddons="grow"
			{toggle}
			onclick={toggleRecording}
		/>
	</div>
</div>
