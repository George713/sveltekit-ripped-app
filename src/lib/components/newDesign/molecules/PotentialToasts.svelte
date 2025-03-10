<script lang="ts">
	import { toastManager } from '$lib/stateManagers.svelte';

	import Toast from '../atoms/Toast.svelte';
</script>

<div class="absolute z-60 mt-5 flex w-full flex-col justify-center space-y-2 px-5">
	{#each toastManager.toasts as toast}
		<Toast {toast} />
	{/each}
</div>
