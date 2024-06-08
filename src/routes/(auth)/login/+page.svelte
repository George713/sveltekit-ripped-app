<script lang="ts">
	import type { ActionData } from './$types';

	export let form: ActionData;
</script>

<h1 class="flex justify-center py-3 text-2xl font-black">/login</h1>

<form action="?/login" method="POST" class="m-5 rounded-lg border border-gray-300 p-5 shadow-lg">
	<div>
		<label class="block text-sm font-medium text-gray-700" for="username">Email</label>
		<input
			class="w-full rounded-lg border border-gray-300 px-3 py-1 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
			id="email"
			name="email"
			type="email"
			required
		/>
	</div>

	<div>
		<label class="block text-sm font-medium text-gray-700" for="password">Password</label>
		<input
			class="w-full rounded-lg border border-gray-300 px-3 py-1 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
			id="password"
			name="password"
			type="password"
			required
		/>
	</div>

	{#if form?.message}
		<p class="error">{form.message}</p>
	{/if}

	{#if form?.error}
		<p class="error">{form.error}</p>
	{/if}

	<button class="mt-3 w-full rounded-xl bg-green-300 px-5 py-2" type="submit">Login</button>
	<!-- <div class="flex justify-end">
		<a href="/register" class="px-2 mt-1 -mb-3 text-sm  text-gray-700 underline">Register -></a>
	</div> -->
</form>
