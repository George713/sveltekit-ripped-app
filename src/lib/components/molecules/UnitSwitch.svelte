<script lang="ts">
	import { Label, Switch } from 'bits-ui';

	interface Props {
		useMetricSystem: boolean;
	}

	let { useMetricSystem = $bindable() }: Props = $props();
</script>

<div class="flex w-full items-center justify-center space-x-3 pl-5 text-lg">
	<Label.Root
		for="metric"
		class={{
			'transition-colors duration-250': true,
			'font-bold text-indigo-600': useMetricSystem,
			'text-stone-600': !useMetricSystem
		}}
	>
		kg
	</Label.Root>
	<Switch.Root
		id="unitSystem"
		name="unitSystem"
		bind:checked={useMetricSystem}
		class="h-9 w-15 rounded-full bg-stone-900"
	>
		<Switch.Thumb
			class={{
				'block size-7 rounded-full bg-indigo-600 drop-shadow-[2px_2px_4px_rgba(0,0,0,0.25)] transition-transform duration-250': true,
				'translate-x-1': useMetricSystem,
				'translate-x-7': !useMetricSystem
			}}
		/>
	</Switch.Root>
	<Label.Root
		for="imperial"
		class={{
			'transition-colors duration-250': true,
			'font-bold text-indigo-600': !useMetricSystem,
			'text-stone-600': useMetricSystem
		}}>lbs</Label.Root
	>
</div>
