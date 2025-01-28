<script lang="ts">
	import { page } from '$app/stores';
	import { visibleView } from '$lib/stores';
</script>

<button
	class="h-20 w-20 rounded-sm border border-gray-400/10 bg-gray-300 text-[40px] font-bold text-neutral-600 shadow-sm disabled:bg-gray-200 disabled:text-neutral-400"
	on:click={() => visibleView.update('harvest')}
	disabled={!$page.data.dailyProgress.eaten || $page.data.dailyProgress.harvest}
>
	H
</button>
