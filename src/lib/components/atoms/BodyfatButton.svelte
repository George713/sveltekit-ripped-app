<script lang="ts">
	import { visibleOverlay } from '$lib/stores';
	import ActionButton from './ActionButton.svelte';

	export let disabled = false;
</script>

<ActionButton text="BF%" onclick={() => visibleOverlay.set('bodyFat')} {disabled} />
