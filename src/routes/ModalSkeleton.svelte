<script lang="ts">
	import { modalWeight, modalBodyFat } from '$lib/stores';

	const close = () => {
		modalWeight.set(false);
		modalBodyFat.set(false);
	};
</script>

<div
	class="fixed top-0 w-full h-full bg-black bg-opacity-70"
	on:click|self={close}
	on:keydown|self={close}
>
	<div
		class="absolute bottom-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-5 py-2 rounded-md bg-slate-200"
	>
		<slot />
	</div>
</div>
