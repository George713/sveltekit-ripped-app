<script lang="ts">
	import AuthInput from '../atoms/AuthInput.svelte';
	import Button from '../atoms/Button.svelte';
</script>

<AuthInput id="email" placeholder="Email" type="text" />
<!-- <AuthInput id="password" placeholder="Password" type="password" /> -->
<input
	type="password"
	id="password"
	class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
	placeholder="•••••••••"
	required
/>
<Button />
