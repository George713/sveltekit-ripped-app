<script lang="ts">
	import { goto } from '$app/navigation';
	import ItemName from '$lib/components/newDesign/atoms/inputs/ItemName.svelte';
	import Minimizer from '$lib/components/newDesign/atoms/Minimizer.svelte';
	import PhotoFrame from '$lib/components/newDesign/atoms/PhotoFrame.svelte';
</script>

<!-- Minimizer horizontal -->
<div class="flex h-screen w-screen flex-col items-center">
	<div class="justify-left flex w-full">
		<Minimizer onclick={() => goto('/planner')} direction="left" />
	</div>
	<PhotoFrame />
	<ItemName />
	<!-- Add & Record Button (grow) -->
	<!-- kcal | protein sums -->
	<!-- Create Item -->
</div>
