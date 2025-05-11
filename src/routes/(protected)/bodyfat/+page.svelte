<script lang="ts">
	import { goto } from '$app/navigation';
	import Sigil from '$atoms/Sigil.svelte';
	import Minimizer from '$atoms/Minimizer.svelte';
	import Crest from '$icons/Crest.svelte';
</script>

{#snippet btn(text: string, onclick: () => void)}
	<button class="h-10 w-25 rounded border border-stone-700 text-stone-400" {onclick}>{text}</button>
{/snippet}

<div class="mt-0.5 flex flex-col space-y-5">
	<Minimizer direction="left" onclick={() => goto('/')} />
	<Sigil rank="tbd" />
	<div class="flex items-center justify-center space-x-2">
		<Crest />
		<p class="font-medium text-stone-200">Update your Body Fat</p>
	</div>
	<div class="flex w-full justify-center">
		<div class="my-5 flex w-64 flex-col space-y-7 text-sm text-stone-200">
			<p>
				Checking on your body fat every so often is important. Maybe your weight loss is slowing
				down, but you are still losing body fat. By measuring body fat percentage every four weeks,
				we identify this situation.
			</p>
			<p>Which method would you like to use?</p>
		</div>
	</div>
	<div class="flex justify-center space-x-2">
		{@render btn('Navy', () => {
			goto('/bodyfat/navy');
		})}
		{@render btn('BIA', () => {
			goto('/bodyfat/bia');
		})}
	</div>
</div>
