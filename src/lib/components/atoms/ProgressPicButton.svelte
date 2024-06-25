<script lang="ts">
	import { page } from '$app/stores';
	import { visibleOverlay } from '$lib/stores';
</script>

<button
	class="mx-4 h-14 w-14 rounded border border-gray-400/10 bg-gray-300 text-[20px] font-bold text-neutral-600 shadow disabled:bg-gray-200 disabled:text-neutral-400"
	on:click={() => visibleOverlay.set('weeklyPic')}
	disabled={$page.data.dailyProgress.weeklyPic}
>
	P
</button>
