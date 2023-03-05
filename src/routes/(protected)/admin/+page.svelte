<script lang="ts">
	import { page } from '$app/stores';
</script>

<h1 class="flex py-3 justify-center text-2xl font-black">/admin</h1>

{#if $page.data.user}
	<div class="ml-10 bg-neutral-400">
		<p>Welcome {$page.data.user.name}!</p>
		<p>Your role is {$page.data.user.role}</p>
	</div>
{/if}

{#if $page.data.user.role === 'ADMIN'}
	<div class="fixed bottom-5 min-w-full flex justify-center">
		<form action="/logout" method="POST">
			<button class="bg-green-300 rounded-xl px-5 py-2" type="submit">Log out</button>
		</form>
	</div>
{/if}
