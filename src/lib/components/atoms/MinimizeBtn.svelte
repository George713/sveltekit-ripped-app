<script lang="ts">
	import { visibleOverlay, visibleView } from '$lib/stores';

	export let viewTarget: string;
	export let stroke = 'stroke-gray-400';
</script>

<button
	on:click={() => {
		visibleView.update(viewTarget);
		visibleOverlay.set('none');
	}}
	class="relative mx-auto mt-auto flex items-center self-end p-2 pb-4"
>
	<svg width="31" height="18" class=" fill-none {stroke}"
		><path
			stroke-linecap="round"
			stroke-width="3"
			d="m2 2 13.066 6.291a1 1 0 0 0 .868 0L29 2M2 9.5l13.066 6.291a1 1 0 0 0 .868 0L29 9.5"
		/>
	</svg>
</button>
