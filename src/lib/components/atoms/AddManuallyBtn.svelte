<script lang="ts">
	export let makeManualEntry: () => void;
</script>

<button
	on:click={makeManualEntry}
	class="flex h-9 w-[72px] items-center justify-center space-x-1 rounded-[4px] border border-white/15 px-1"
>
	<svg class="h-5 fill-none stroke-white/30" viewBox="0 0 24 24"
		><path
			stroke-linecap="round"
			stroke-linejoin="round"
			stroke-width="1.5"
			d="M12 7v10m0-5h5M7 12h2.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
		/></svg
	>
	<p class="flex flex-col text-[9px] font-light leading-none tracking-tight text-white/50">
		Enter<br />manually
	</p>
</button>
