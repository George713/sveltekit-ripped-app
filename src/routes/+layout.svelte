<script lang="ts">
	import { page } from '$app/stores';

	import '../app.css';
</script>

<!-- <svelte:head>
	<title>SvelteKit Auth</title>
</svelte:head>

<nav class="flex justify-center bg-slate-400 py-3">
	{#if !$page.data.user}
		<a class="bg-cyan-100 px-3 mr-2" href="/">Home</a>
		<a class="bg-cyan-300 px-3 mx-2" href="/login">Login</a>
		<a class="bg-cyan-500 px-3 ml-2" href="/register">Register</a>
	{:else}
		<a class="bg-cyan-100 px-3 mr-2" href="/">Home</a>
		<a class="bg-cyan-500 px-3 mx-2" href="/admin">Admin</a>

		<form action="/logout" class="logout" method="POST">
			<button class="bg-cyan-300 px-3 ml-2" type="submit">Log out</button>
		</form>
	{/if}
</nav> -->

<main>
	<slot />
</main>
