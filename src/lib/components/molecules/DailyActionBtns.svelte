<script lang="ts">
	import { page } from '$app/stores';
	import { visibleOverlay, visibleView } from '$lib/stores';

	export let reset: () => void;
</script>

<div class="relative flex h-[calc(25vh)] w-full items-center justify-center bg-slate-100">
	<!-- Weigh-in -->
	<button
		class="mx-4 h-14 w-14 rounded border border-gray-400/10 bg-gray-300 text-[20px] font-bold text-neutral-600 shadow disabled:bg-gray-200 disabled:text-neutral-400"
		on:click={() => {
			visibleOverlay.set('weight');
		}}
		disabled={$page.data.dailyProgress.weighIn || $page.data.dailyProgress.harvest}
	>
		W
	</button>
	<!-- Plan -> Add Food -->
	<button
		class="mx-4 h-14 w-14 rounded border border-gray-400/10 bg-gray-300 text-[20px] font-bold text-neutral-600 shadow disabled:bg-gray-200 disabled:text-neutral-400"
		on:click={() => {
			if (!$page.data.dailyProgress.planned) visibleView.update('planner');
			else if ($page.data.dailyProgress.planned && !$page.data.dailyProgress.eaten)
				visibleView.update('eat');
		}}
		disabled={$page.data.dailyProgress.eaten}
	>
		{!$page.data.dailyProgress.planned ? 'P' : '+'}
	</button>
	<!-- Finish Eating -->
	<button
		class="mx-4 h-14 w-14 rounded border border-gray-400/10 bg-gray-300 text-[20px] font-bold text-neutral-600 shadow disabled:bg-gray-200 disabled:text-neutral-400"
		on:click={() => visibleView.update('finishEating')}
		disabled={$page.data.dailyProgress.eaten}
	>
		F
	</button>
	<!-- Reset -->
	<button
		class="absolute bottom-0 left-0 h-7 w-14 rounded border border-gray-400/10 bg-gray-200 text-[14px] text-neutral-400 shadow"
		on:click={reset}
	>
		Reset
	</button>
</div>
