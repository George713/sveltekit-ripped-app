<script lang="ts">
	export let toggleOverlay: () => void;
	export let finishPlanning: () => void;
	export let msg: string;
</script>

<div
	class="absolute left-0 top-0 z-20 flex h-screen w-screen justify-center bg-black/30 backdrop-blur-[2px]"
	role="button"
	tabindex={0}
	on:click={() => toggleOverlay()}
	on:keydown={() => toggleOverlay()}
>
	<div
		class="relative top-[calc(56dvh)] flex h-48 w-80 flex-col items-center rounded-lg bg-white/60 shadow-lg backdrop-blur-lg"
	>
		<span class="mx-2 my-4 pt-2 text-center font-sans font-semibold">{msg}</span>
		<div class="flex">
			<button
				class="mx-2 w-[calc(50%)] rounded-sm border-2 border-green-400 px-2 py-1 text-lg font-bold text-gray-700"
				on:click={finishPlanning}>End planning anyway</button
			>
			<button
				class="mx-2 w-[calc(50%)] rounded-sm bg-green-400 px-2 py-1 text-lg font-bold text-gray-700"
				on:click={toggleOverlay}>Continue Planning</button
			>
		</div>
	</div>
</div>
