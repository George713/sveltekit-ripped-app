<script lang="ts">
	import { Label, Switch } from 'bits-ui';

	interface Props {
		isMale: boolean;
	}

	let { isMale = $bindable() }: Props = $props();
</script>

<div class="flex w-full items-center justify-center space-x-3 pl-5 text-lg">
	<Label.Root
		for="male"
		class={{
			'transition-colors duration-250': true,
			'font-bold text-indigo-600': isMale,
			'text-stone-600': !isMale
		}}
	>
		Male
	</Label.Root>
	<Switch.Root
		id="gender"
		name="gender"
		bind:checked={isMale}
		class="h-9 w-15 rounded-full bg-stone-900"
	>
		<Switch.Thumb
			class={{
				'block size-7 rounded-full bg-indigo-600 drop-shadow-[2px_2px_4px_rgba(0,0,0,0.25)] transition-transform duration-250': true,
				'translate-x-1': isMale,
				'translate-x-7': !isMale
			}}
		/>
	</Switch.Root>
	<Label.Root
		for="female"
		class={{
			'transition-colors duration-250': true,
			'font-bold text-indigo-600': !isMale,
			'text-stone-600': isMale
		}}>Female</Label.Root
	>
</div>
