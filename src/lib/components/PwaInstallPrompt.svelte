<script lang="ts">
	import { onMount } from 'svelte';

	// Component for PWA install prompt using Svelte 5 runes

	interface PWAInstallEvent extends Event {
		prompt: () => Promise<void>;
		userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
	}

	// Using $state for reactivity in Svelte 5
	let showInstallPrompt = $state(false);

	// Check for the deferred prompt that was captured in app.html
	const checkForInstallPrompt = () => {
		if (typeof window !== 'undefined' && window.deferredInstallPrompt) {
			showInstallPrompt = true;
		} else {
			showInstallPrompt = false;
		}
	};

	// Handle install button click
	const installApp = async () => {
		if (!window.deferredInstallPrompt) return;

		try {
			// Show the install prompt
			await window.deferredInstallPrompt.prompt();

			// Wait for the user to respond to the prompt
			const choiceResult = await window.deferredInstallPrompt.userChoice;

			// Clear the saved prompt
			window.deferredInstallPrompt = null;

			// Hide the install button regardless of outcome
			showInstallPrompt = false;
		} catch (error) {
			console.error('Error during PWA installation:', error);
		}
	};

	// Set up check when component mounts
	onMount(() => {
		checkForInstallPrompt();
	});
</script>

{#if showInstallPrompt}
	<div
		class="fixed right-2 bottom-2 left-2 z-50 flex flex-col items-center rounded-lg border border-stone-700 bg-stone-800 p-4 text-white shadow-lg"
	>
		<div class="flex w-full items-center justify-between">
			<div class="flex items-center gap-2">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="max-h-8 min-h-8 min-w-8 text-amber-400"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
					/>
				</svg>
				<div>
					<h3 class="font-semibold">Install Have Your Cookie</h3>
					<p class="max-w-[90%] text-sm text-stone-300">
						This will create a shortcut icon on your device & make app navigation faster.
					</p>
				</div>
			</div>
			<!-- <button
				onclick={() => (showInstallPrompt = false)}
				aria-label="Close installation prompt"
				class="text-stone-400 hover:text-white"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-5 w-5"
					viewBox="0 0 20 20"
					fill="currentColor"
				>
					<path
						fill-rule="evenodd"
						d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
						clip-rule="evenodd"
					/>
				</svg>
			</button> -->
		</div>
		<button
			onclick={installApp}
			class="_bg-amber-500 mt-3 w-full rounded bg-indigo-600 py-2 font-medium text-white transition-colors hover:bg-amber-600"
		>
			Install Now
		</button>
	</div>
{/if}
