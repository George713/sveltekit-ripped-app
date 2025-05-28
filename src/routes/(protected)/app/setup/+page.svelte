<script lang="ts">
	import { enhance } from '$app/forms';
	import { type LanguageCode } from '$lib/lang';
	// Atoms
	import Logo from '$atoms/BGLogoBig.svelte';
	import StepIndicator from '$atoms/StepIndicator.svelte';
	// Molecules
	import UnitSwitch from '$molecules/UnitSwitch.svelte';
	import LanguagePicker from '$molecules/LanguagePicker.svelte';
	// Icons
	import Arrow from '$icons/Arrow.svelte';

	let progressState = $state(0);
	let useMetricSystem = $state(true);
	let language = $state('en-GB' as LanguageCode);
	let formElement: HTMLFormElement;
</script>

<form
	method="POST"
	class="flex h-full w-full items-center justify-center"
	use:enhance
	bind:this={formElement}
>
	<input type="hidden" name="useMetricSystem" value={useMetricSystem} />
	<input type="hidden" name="language" value={language} />

	<div class="flex h-full max-h-[932px] flex-col justify-between">
		<Logo />
		<StepIndicator totalSteps={3} currentStep={progressState} />
		<div class="mx-12 mt-10 flex flex-col items-center space-y-5">
			{#if progressState === 0}
				<div class="flex flex-col">
					<p class="text-center text-stone-200">Welcome to</p>
					<div class="mt-5 flex items-center justify-center space-x-2">
						<img class="size-8" src="/pwa-512x512.png" alt="logoFooter" />
						<p class="text-xl font-bold text-stone-200">Have Your Cookie</p>
					</div>
					<p class="mt-16 text-center text-stone-200">
						I am super happy to have you on board ☺️ Let's get you started!
					</p>
					<p class="mt-2 text-center text-stone-200">(Two quick questions.)</p>
				</div>
			{:else if progressState === 1}
				<p class="text-stone-200">Which unit system do you want to use for body weight?</p>
				<UnitSwitch bind:useMetricSystem />
			{:else if progressState === 2}
				<p class="text-stone-200">
					Which language will you be speaking when using the voice feature?
				</p>
				<LanguagePicker bind:language />
			{/if}
		</div>
		<!-- Next Button -->
		<div class="my-5 flex items-center justify-center">
			<Arrow
				onclick={() => {
					if (progressState === 2) {
						formElement.requestSubmit();
					} else {
						progressState++;
					}
				}}
			/>
		</div>
	</div>
</form>
