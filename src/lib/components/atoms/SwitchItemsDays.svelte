<script lang="ts">
	export let isChecked: boolean;
</script>

<label
	for="check"
	class="relative mr-1 mt-0.5 h-5 w-[78px] cursor-pointer rounded-full bg-neutral-500/40 shadow-sm"
>
	<input type="checkbox" id="check" bind:checked={isChecked} class="peer sr-only" />
	<span
		class="absolute left-0.5 top-0.5 h-4 w-[74px] rounded-full bg-neutral-200/90 shadow-[inset_2px_2px_4px_rgba(255,255,255,0.25),inset_-2px_-2px_4px_rgba(0,0,0,0.15)]"
	/>
	<span
		class="absolute left-0.5 top-0.5 h-4 w-[37px] rounded-l-full bg-neutral-500 shadow-[1px_1px_2px_rgba(0,0,0,.1),inset_2px_2px_2px_rgba(255,255,255,0.05),inset_-2px_-2px_2px_rgba(0,0,0,0.1)] outline outline-[1px] outline-neutral-600/80 transition-all duration-300 peer-checked:left-[39px] peer-checked:rounded-l-none peer-checked:rounded-r-full"
	/>
	<p
		class="absolute left-2.5 grid h-full place-items-center pt-0.5 text-[9px] font-medium text-neutral-300 peer-checked:text-neutral-500/40"
	>
		Items
	</p>
	<p
		class="absolute right-[13px] grid h-full place-items-center pt-0.5 text-[9px] font-medium text-neutral-500/40 peer-checked:text-neutral-300"
	>
		Sets
	</p>
</label>
