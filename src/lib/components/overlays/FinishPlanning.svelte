<script lang="ts">
	import { page } from '$app/stores';
	import { invalidateAll } from '$app/navigation';

	export let toggleOverlay: () => void;
	export let finishPlanning: () => void;
	export let msg: string;
</script>

<div
	class="absolute top-0 left-0 w-screen h-screen bg-black/30 backdrop-blur-[2px] flex justify-center"
	role="button"
	tabindex={0}
	on:click={() => toggleOverlay()}
	on:keydown={() => toggleOverlay()}
>
	<div
		class="relative top-[calc(56vh)] w-80 h-48 bg-white/60 backdrop-blur-lg shadow-lg rounded-lg flex flex-col items-center"
	>
		<span class="pt-2 my-4 mx-2 font-sans font-semibold text-center">{msg}</span>
		<div class="flex">
			<button
				class="px-2 py-1 mx-2 w-[calc(50%)] border-2 border-green-400 rounded text-gray-700 font-bold text-lg"
				on:click={finishPlanning}>End planning anyway</button
			>
			<button
				class="px-2 py-1 mx-2 w-[calc(50%)] bg-green-400 rounded text-gray-700 font-bold text-lg"
				on:click={toggleOverlay}>Continue Planning</button
			>
		</div>
	</div>
</div>
