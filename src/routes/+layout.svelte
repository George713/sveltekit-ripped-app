<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import '../app.css';

	const detectSWUpdate = async () => {
		const registration = await navigator.serviceWorker.ready;

		registration.addEventListener('updatefound', () => {
			const newSW = registration.installing;
			newSW?.addEventListener('statechange', () => {
				if (newSW.state === 'installed') {
					if (confirm('New update available! Reload to update?')) {
						newSW.postMessage({ type: 'SKIP_WAITING' });
						window.location.reload();
					}
				}
			});
		});
	};

	onMount(() => {
		detectSWUpdate();
	});
</script>

<svelte:head>
	<title>SvelteKit Auth</title>
</svelte:head>

{#if !$page.data.user}
	<nav class="flex justify-center bg-slate-400 py-3">
		<a class="bg-cyan-100 px-3 mr-2" href="/">Home</a>
		<a class="bg-cyan-300 px-3 mx-2" href="/login">Login</a>
		<!-- <a class="bg-cyan-500 px-3 ml-2" href="/register">Register</a> -->
	</nav>
{/if}

<main>
	<slot />
</main>
