<script lang="ts">
	import type { ActionData } from './$types';

	export let form: ActionData;
</script>

<h1 class="flex justify-center py-3 text-2xl font-black">/register</h1>

<form action="?/register" method="POST" class="m-5 rounded-lg border border-gray-300 p-5 shadow-lg">
	<div>
		<label class="block text-sm font-medium text-gray-700" for="username">Username</label>
		<input
			class="w-full rounded-lg border border-gray-300 px-3 py-1 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
			id="username"
			name="username"
			type="text"
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

	<button class="mt-3 w-full rounded-xl bg-green-300 px-5 py-2" type="submit">Register</button>

	<div class="flex justify-end">
		<a href="/login" class="-mb-3 mt-1 px-2 text-sm text-gray-700 underline">Login -></a>
	</div>
</form>

{#if form?.user}
	<p class="flex justify-center text-sm text-red-700">Username is taken. Sorry!</p>
{/if}
