<script lang="ts">
	import { page } from '$app/stores';

	import { visibleOverlay } from '$lib/stores';

	import Sigil from '$atoms/sigils/Sigil.svelte';
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
			visibleOverlay.set('calendar');
		}}
	>
		<!-- Calender Icon -->
		<svg viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path
				d="M3 9H21M7 3V5M17 3V5M6 13H8M6 17H8M11 13H13M11 17H13M16 13H18M16 17H18M6.2 21H17.8C18.9201 21 19.4802 21 19.908 20.782C20.2843 20.5903 20.5903 20.2843 20.782 19.908C21 19.4802 21 18.9201 21 17.8V8.2C21 7.07989 21 6.51984 20.782 6.09202C20.5903 5.71569 20.2843 5.40973 19.908 5.21799C19.4802 5 18.9201 5 17.8 5H6.2C5.0799 5 4.51984 5 4.09202 5.21799C3.71569 5.40973 3.40973 5.71569 3.21799 6.09202C3 6.51984 3 7.07989 3 8.2V17.8C3 18.9201 3 19.4802 3.21799 19.908C3.40973 20.2843 3.71569 20.5903 4.09202 20.782C4.51984 21 5.07989 21 6.2 21Z"
				class="stroke-gray-500"
				stroke-width="1.8"
				transform="translate(2.5, 2.5)"
			/>
		</svg>
	</button>
	<!-- Points -->
	<div class="absolute left-[83%] top-[50%]">
		<span class="text-xs text-gray-500">$</span>
		<span class="text-lg font-medium text-gray-500">{$page.data.user.pointBalance}</span>
	</div>
	<!-- Sigil -->
	<Sigil />
</div>
