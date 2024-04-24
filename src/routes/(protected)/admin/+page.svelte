<script lang="ts">
	import { page } from '$app/stores';
</script>

<h1 class="flex justify-center py-3 text-2xl font-black">/admin</h1>

{#if $page.data.user}
	<div class="ml-10 bg-neutral-400">
		<p>Welcome {$page.data.user.name}!</p>
		<p>Your BF is {$page.data.user.currentBF}</p>
	</div>
{/if}
