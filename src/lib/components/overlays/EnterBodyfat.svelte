<!-- EnterBodyfat.svelte -->
<script lang="ts">
	import Background from '$overlays/Background.svelte';

	import { selectInput, focusElement } from '$lib/utils';

	export let askGender = true;
</script>

<Background>
	<div
		class="absolute bottom-1/4 left-1/2 flex w-[calc(70%)] -translate-x-1/2 -translate-y-1/2 transform flex-col items-center rounded-md bg-slate-200/70 backdrop-blur-xs px-5 py-2"
	>
		<span>Body fat measurement</span>
		<form method="post" action="?/logBodyFat" autocomplete="off" class="mt-3">
			<!-- Row bodyfat -->
			<div class="mb-1 flex justify-end">
				<span class="mr-1">Body fat</span>
				<input
					type="number"
					value="0"
					step="0.1"
					class="mx-1 w-10 rounded pr-1 text-right"
					name="bodyfat"
					on:focus={selectInput}
					use:focusElement
				/>
				<span class="w-7">%</span>
			</div>
			<!-- Row gender -->
			{#if askGender}
				<div class="mb-3 flex justify-end">
					<span class="mr-1">Gender</span>
					<select name="isMale" class="mx-1 w-20 rounded pr-1 text-right">
						<option value={false} selected>Female</option>
						<option value={true}>Male</option>
					</select>
				</div>
			{/if}
			<!-- Submit Button -->
			<button
				class="mx-auto flex h-8 items-center rounded-[4px] bg-green-600/80 shadow-[inset_2px_2px_3px_rgba(161,161,161,0.05),inset_-2px_-2px_3px_rgba(0,0,0,0.05)]"
			>
				<svg class="ml-1 h-[18px] fill-none stroke-zinc-100 px-1" viewBox="0 0 24 24"
					><path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="1.5"
						d="M12 7v10m0-5h5M7 12h2.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
					/></svg
				>
				<div
					class="flex flex-col py-[6px] pr-2 text-[8px] font-bold leading-none tracking-tight text-zinc-100"
				>
					<p>Submit</p>
				</div>
			</button>
		</form>
	</div>
</Background>
