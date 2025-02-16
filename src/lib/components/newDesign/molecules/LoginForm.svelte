<script lang="ts">
	import { applyAction, enhance } from '$app/forms';

	import { toastManager } from '$lib/stateManagers.svelte';

	import AuthInput from '../atoms/AuthInput.svelte';
	import Button from '../atoms/Button.svelte';
</script>

<form
	action="?/login"
	method="POST"
	class="flex flex-col items-center space-y-2"
	use:enhance={() => {
		return async ({ result }) => {
			if (result.type === 'failure') {
				// Show toast with error message
				toastManager.addToast({
					type: 'error',
					message: result.data?.error as string,
					timeout: 10000
				});
			} else {
				// Otherwise redirect as planned
				await applyAction(result);
			}
		};
	}}
>
	<AuthInput id="email" name="email" placeholder="Email" type="email" />
	<AuthInput id="password" name="password" placeholder="Password" type="password" />
	<Button text="Login" type="submit" wide={true} />
</form>
