<script lang="ts">
	import { visibleView } from '$lib/stores';

	export let viewTarget: string;
</script>

<button on:click={() => visibleView.update(viewTarget)} class="relative mt-auto p-2">
	<svg width="31" height="18" class=" fill-none stroke-gray-400"
		><path
			stroke-linecap="round"
			stroke-width="3"
			d="m2 2 13.066 6.291a1 1 0 0 0 .868 0L29 2M2 9.5l13.066 6.291a1 1 0 0 0 .868 0L29 9.5"
		/>
	</svg>
</button>
