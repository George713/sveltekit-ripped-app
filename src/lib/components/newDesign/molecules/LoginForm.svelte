<script lang="ts">
	import AuthInput from '../atoms/AuthInput.svelte';
	import Button from '../atoms/Button.svelte';
</script>

<form action="?/register" method="POST" class="flex flex-col items-center space-y-2">
	<AuthInput id="email" placeholder="Email" type="text" />
	<AuthInput id="password" placeholder="Password" type="password" />
	<Button text="Login" />
</form>
