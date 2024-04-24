<script lang="ts">
	import { page } from '$app/stores';

	export let toggleModal: (modal: string) => void;
</script>

<button
	class="h-20 w-20 rounded border border-gray-400/10 bg-gray-300 text-[40px] font-bold text-neutral-600 shadow disabled:bg-gray-200 disabled:text-neutral-400"
	on:click={() => toggleModal('harvest')}
	disabled={!$page.data.dailyProgress.eaten || $page.data.dailyProgress.harvest}
>
	H
</button>
