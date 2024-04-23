<script lang="ts">
	import { page } from '$app/stores';

	export let toggleModal: (modal: string) => void;
	export let reset: () => void;
</script>

<div class="bg-slate-100 w-full h-[calc(25vh)] flex justify-center items-center relative">
	<!-- Weigh-in -->
	<button
		class="h-14 w-14 bg-gray-300 mx-4 rounded shadow text-[20px] font-bold text-neutral-600 border border-gray-400/10 disabled:bg-gray-200 disabled:text-neutral-400"
		on:click={() => {
			toggleModal('weight');
		}}
		disabled={$page.data.dailyProgress.weighIn || $page.data.dailyProgress.harvest}
	>
		W
	</button>
	<!-- Plan -> Add Food -->
	<button
		class="h-14 w-14 bg-gray-300 mx-4 rounded shadow text-[20px] font-bold text-neutral-600 border border-gray-400/10 disabled:bg-gray-200 disabled:text-neutral-400"
		on:click={() => {
			if (!$page.data.dailyProgress.planned) toggleModal('planner');
			else if ($page.data.dailyProgress.planned && !$page.data.dailyProgress.eaten)
				toggleModal('eat');
		}}
		disabled={$page.data.dailyProgress.eaten}
	>
		{!$page.data.dailyProgress.planned ? 'P' : '+'}
	</button>
	<!-- Finish Eating -->
	<button
		class="h-14 w-14 bg-gray-300 mx-4 rounded shadow text-[20px] font-bold text-neutral-600 border border-gray-400/10 disabled:bg-gray-200 disabled:text-neutral-400"
		on:click={() => toggleModal('finishEating')}
		disabled={$page.data.dailyProgress.eaten}
	>
		F
	</button>
	<!-- Reset -->
	<button
		class="absolute h-7 w-14 bottom-0 left-0 bg-gray-200 rounded shadow text-[14px] text-neutral-400 border border-gray-400/10"
		on:click={reset}
	>
		Reset
	</button>
</div>
