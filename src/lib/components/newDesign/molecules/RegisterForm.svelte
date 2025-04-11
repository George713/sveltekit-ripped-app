<script lang="ts">
	import { applyAction, enhance } from '$app/forms';

	import { toastManager } from '$lib/stateManagers.svelte';

	import AuthInput from '../atoms/AuthInput.svelte';
	import Button from '../atoms/Button.svelte';

	let { form } = $props();
</script>

<div class="grow"></div>
<form
	action="?/register"
	method="POST"
	class="mb-15 flex flex-col items-center space-y-2"
	use:enhance={() => {
		return async ({ result }) => {
			if (result.type === 'failure') {
				// Show toast with error message
				toastManager.addToast({
					type: 'error',
					message: result.data?.error as string,
					timeout: 4000
				});
			} else {
				// Otherwise redirect as planned
				await applyAction(result);
			}
		};
	}}
>
	{#if form?.success}
		<p class="text-center text-2xl font-bold text-stone-200">Success!</p>
		<p class="mb-10 w-60 text-center text-xl text-stone-200">
			Check your email inbox for our confirmation email.
		</p>
	{:else}
		<AuthInput id="email" name="email" placeholder="Email" type="email" />
		<AuthInput id="password" name="password" placeholder="Password" type="password" />
		<AuthInput
			id="repeatPassword"
			name="repeatPassword"
			placeholder="Repeat password"
			type="password"
		/>
		<Button text="Register" type="submit" wide={true} />
	{/if}
</form>
