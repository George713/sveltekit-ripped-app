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
		<StepIndicator totalSteps={2} currentStep={progressState} />
		<div class="mx-12 mt-10 flex flex-col items-center space-y-5">
			{#if progressState === 0}
				<p class="text-stone-200">Which unit system do you want to use for body weight?</p>
				<UnitSwitch bind:useMetricSystem />
			{:else}
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
					if (progressState === 0) {
						progressState++;
					} else if (progressState === 1) {
						formElement.requestSubmit();
					}
				}}
			/>
		</div>
	</div>
</form>
