<script lang="ts">
	export let toggleModal: (modal: string) => void;
</script>

<div
	class="fixed top-0 w-full h-full bg-black bg-opacity-70"
	role="button"
	tabindex={0}
	on:click|self={() => toggleModal('none')}
	on:keydown|self={() => toggleModal('none')}
>
	<div
		class="absolute bottom-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-5 py-2 rounded-md bg-slate-200"
	>
		<slot />
	</div>
</div>
