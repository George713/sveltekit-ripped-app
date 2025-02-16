<script lang="ts">
	import { goto } from '$app/navigation';
	import Minimizer from '$lib/components/newDesign/atoms/Minimizer.svelte';
</script>

<!-- Minimizer horizontal -->
<div class="flex h-screen w-screen flex-col">
	<Minimizer onclick={() => goto('/planner')} direction="left" />
</div>
<!-- Photo Frame -->
<!-- Item Name -->
<!-- Add & Record Button (grow) -->
<!-- kcal | protein sums -->
<!-- Create Item -->
