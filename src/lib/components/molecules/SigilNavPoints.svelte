<script lang="ts">
	import { page } from '$app/stores';
	import SigilBronze from '$atoms/SigilBronze.svelte';
</script>

<div class="bg-slate-100 w-full h-[calc(50vh)] flex justify-center pt-3 relative">
	<button
		class="absolute left-3 bg-slate-300 w-5 h-5 rounded flex justify-center items-center text-[10px] text-gray-600 font-bold shadow-sm"
	>
		G
	</button>
	<form action="/logout" class="logout" method="POST">
		<button
			class="absolute right-3 bg-slate-300 w-5 h-5 rounded flex justify-center items-center text-[10px] text-gray-600 font-bold shadow-sm"
			type="submit"
		>
			X
		</button>
	</form>
	<!-- Points -->
	<div class="absolute left-[83%] top-[50%]">
		<span class="text-gray-500 text-xs">$</span>
		<span class="text-gray-500 text-lg font-medium">{$page.data.user.pointBalance}</span>
	</div>
	{#if 15 < $page.data.user.currentBF && $page.data.user.currentBF < 20}
		<SigilBronze />
	{/if}
</div>
