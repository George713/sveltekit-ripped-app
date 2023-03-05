<script lang="ts">
	import type { ActionData } from './$types';

	export let form: ActionData;
</script>

<h1 class="flex py-3 justify-center text-2xl font-black">/register</h1>

<form action="?/register" method="POST" class="m-5 p-5 border border-gray-300 shadow-lg rounded-lg">
	<div>
		<label class="block text-sm font-medium text-gray-700" for="username">Username</label>
		<input
			class="border border-gray-300 w-full px-3 py-1 rounded-lg shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
			id="username"
			name="username"
			type="text"
			required
		/>
	</div>

	<div>
		<label class="block text-sm font-medium text-gray-700" for="password">Password</label>
		<input
			class="border border-gray-300 w-full px-3 py-1 rounded-lg shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
			id="password"
			name="password"
			type="password"
			required
		/>
	</div>

	<button class="w-full bg-green-300 rounded-xl mt-3 px-5 py-2" type="submit">Register</button>

	<div class="flex justify-end">
		<a href="/login" class="px-2 mt-1 -mb-3 text-sm  text-gray-700 underline">Login -></a>
	</div>
</form>

{#if form?.user}
	<p class="flex justify-center text-sm text-red-700">Username is taken. Sorry!</p>
{/if}
