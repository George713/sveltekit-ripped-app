<script lang="ts">
	export let text: string;
</script>

<button
	type="submit"
	class="absolute right-0 flex items-center rounded-[4px] bg-green-700/80 shadow-[inset_2px_2px_3px_rgba(161,161,161,0.05),inset_-2px_-2px_3px_rgba(0,0,0,0.05)]"
>
	<svg class="ml-1 h-[18px] fill-none stroke-zinc-300 px-1" viewBox="0 0 24 24"
		><path
			stroke-linecap="round"
			stroke-linejoin="round"
			stroke-width="1.5"
			d="M12 7v10m0-5h5M7 12h2.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
		/></svg
	>
	<div
		class="flex flex-col py-[6px] pr-2 text-[8px] font-medium leading-none tracking-tight text-zinc-300"
	>
		<p>
			{@html text}
		</p>
	</div>
</button>
