<script lang="ts">
	import { goto, invalidateAll } from '$app/navigation';
	import { page } from '$app/stores';

	import Sigil from '$atoms/sigils/Sigil.svelte';

	export let data;
</script>

<div class="relative flex h-[calc(50vh)] w-full justify-center bg-slate-100 pt-3">
	<button
		class="absolute left-3 flex h-5 w-5 items-center justify-center rounded bg-slate-300 text-[10px] font-bold text-gray-600 shadow-sm"
	>
		G
	</button>
	<button
		class="absolute right-3 flex h-5 w-5 items-center justify-center rounded bg-slate-300 text-[10px] font-bold text-gray-600 shadow-sm"
		on:click={() => {
			data.supabase.auth.signOut();
			invalidateAll();
			goto('/', { replaceState: true });
		}}
	>
		X
	</button>
	<!-- Points -->
	<div class="absolute left-[83%] top-[50%]">
		<span class="text-xs text-gray-500">$</span>
		<span class="text-lg font-medium text-gray-500">{$page.data.user.pointBalance}</span>
	</div>
	<!-- Sigil -->
	<Sigil />
</div>
