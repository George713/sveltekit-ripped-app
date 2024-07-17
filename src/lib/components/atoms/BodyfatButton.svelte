<script lang="ts">
	import { visibleOverlay } from '$lib/stores';
	import ActionButton from './ActionButton.svelte';
</script>

<ActionButton text="BF%" onclick={() => visibleOverlay.set('bodyFat')} />
