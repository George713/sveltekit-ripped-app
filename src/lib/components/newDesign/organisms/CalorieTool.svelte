<script lang="ts">
	import { selectInput } from '$lib/utils';
	import { slide } from 'svelte/transition';
	import GenderSwitch from '../molecules/GenderSwitch.svelte';
	import { page } from '$app/state';

	interface Props {
		calculatedCalories: number | undefined;
		onSubmit: () => void;
	}

	let { calculatedCalories = $bindable(), onSubmit }: Props = $props();

	let isMale = $state(page.data.user.isMale);
	let weight = $state<number | undefined>(undefined);
	let height = $state<number | undefined>(undefined);
	let age = $state<number | undefined>(undefined);

	const inputIsMissing = $derived(!weight || !height || !age);

	const calculateCalories = () => {
		// Calculate BRM (Base Metabolic Rate) with Mifflin-St Jeor Equation
		let bmr: number;
		if (isMale) {
			bmr = 10 * weight! + 6.25 * height! - 5 * age! + 5;
		} else {
			bmr = 10 * weight! + 6.25 * height! - 5 * age! - 161;
		}

		// Total Daily Energy Expenditure for sedentary people (factor 1.2)
		const tdee = bmr * 1.2;
		// Round down to nearest 25kcal interval and subtract 200
		calculatedCalories = Math.floor(tdee / 25) * 25 - 200;
	};
</script>

{#snippet input(
	id: string,
	label: string,
	unit: string,
	value: number | undefined,
	onChange: (val: number) => void
)}
	<div class="flex items-center gap-2">
		<label for={id} class="w-30 text-right font-bold text-stone-400">{label}</label>
		<div class="flex h-10 w-22 justify-end gap-1 rounded bg-stone-900 px-2">
			<input
				{id}
				type="number"
				{value}
				oninput={(e) => onChange(Number(e.currentTarget.value))}
				onfocus={selectInput}
				required
				class="w-13 border-none text-right text-stone-200 focus-visible:outline-none"
			/>
			<span class="flex items-center text-stone-200">{unit}</span>
		</div>
	</div>
{/snippet}

<div class="my-auto flex flex-col items-center justify-center space-y-5">
	<GenderSwitch bind:isMale />
	<div
		class={{
			'flex w-full flex-col items-center justify-center space-y-2 transition-opacity': true,
			'opacity-50': calculatedCalories
		}}
	>
		{@render input('weight', 'Current Weight:', 'kg', weight, (val) => (weight = val))}
		{@render input('height', 'Height:', 'cm', height, (val) => (height = val))}
		{@render input('age', 'Age:', 'years', age, (val) => (age = val))}
	</div>
	{#if !calculatedCalories}
		<button
			class="mt-5 rounded bg-indigo-600 px-4 py-3 font-bold text-stone-200 disabled:bg-stone-600 disabled:text-stone-400"
			disabled={inputIsMissing}
			onclick={calculateCalories}
			out:slide={{ duration: 1000 }}
		>
			Calculate
		</button>
	{/if}

	{#if calculatedCalories}
		<div class="mt-4 flex w-full flex-col space-y-4 px-14" in:slide={{ duration: 1000 }}>
			<p class="font-bold text-stone-200">Daily target calories:</p>

			<div class="flex w-full justify-center">
				<div class="flex w-24 space-x-1 rounded border border-stone-400 p-2 text-stone-200">
					<input
						class="w-13 border-none text-right focus-visible:outline-none"
						id="calories"
						type="number"
						step="1"
						min="0"
						max="5000"
						required
						bind:value={calculatedCalories}
						onfocus={selectInput}
					/>
					<label for="calories">kcal</label>
				</div>
			</div>

			<div class="mt-5 flex w-full justify-center">
				<button
					class="rounded bg-indigo-600 px-5 py-2 font-bold text-stone-200 disabled:bg-stone-600 disabled:text-stone-400"
					onclick={onSubmit}
				>
					Confirm
				</button>
			</div>
		</div>
	{/if}
</div>
