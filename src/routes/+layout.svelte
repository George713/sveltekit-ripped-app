<script lang="ts">
	import { onMount } from 'svelte';
	import '../app.css';

	let { children } = $props();

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
	<title>HYC - Have Your Cookie</title>
</svelte:head>

<!-- {#if !$page.data.user}
	<nav class="flex justify-center bg-slate-400 py-3">
		<a class="mr-2 bg-cyan-100 px-3" href="/">Home</a>
		<a class="mx-2 bg-cyan-300 px-3" href="/login">Login</a>
		<a class="bg-cyan-500 px-3 ml-2" href="/register">Register</a>
	</nav>
{/if} -->

{@render children()}
