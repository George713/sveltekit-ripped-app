<script lang="ts">
	import { page } from '$app/stores';
	import ActionButton from '$atoms/ActionButton.svelte';
	import { visibleOverlay, visibleView } from '$lib/stores';

	export let reset: () => void;
</script>

<div class="relative flex h-[calc(25vh)] w-full items-center justify-center bg-slate-100">
	<!-- Weigh-in -->
	<ActionButton
		text="W"
		onclick={() => {
			visibleOverlay.set('weight');
		}}
		disabled={$page.data.dailyProgress.weighIn || $page.data.dailyProgress.harvest}
	/>
	<!-- Plan -> Add Food -->
	<ActionButton
		text={!$page.data.dailyProgress.planned ? 'P' : '+'}
		onclick={() => {
			if (!$page.data.dailyProgress.planned) visibleView.update('planner');
			else if ($page.data.dailyProgress.planned && !$page.data.dailyProgress.eaten)
				visibleView.update('eat');
		}}
		disabled={$page.data.dailyProgress.eaten}
	/>
	<!-- Finish Eating -->
	<ActionButton
		text="F"
		onclick={() => visibleView.update('finishEating')}
		disabled={$page.data.dailyProgress.eaten}
	/>
	<!-- Reset -->
	<button
		class="absolute bottom-0 left-0 h-7 w-14 rounded border border-gray-400/10 bg-gray-200 text-[14px] text-neutral-400 shadow"
		on:click={reset}
	>
		Reset
	</button>
</div>
