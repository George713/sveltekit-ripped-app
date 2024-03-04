<script lang="ts">
	import { page } from '$app/stores';
	import { invalidateAll } from '$app/navigation';

	export let toggleModal: (modal: string) => void;
</script>

<div
	class="absolute top-0 left-0 w-screen h-screen bg-gray-300"
	on:click={() => toggleModal('none')}
	on:keydown={() => toggleModal('none')}
>
	<div
		class="relative m-1 w-[calc(100%-8px)] h-[calc(100%-8px)] bg-slate-100 shadow-xl flex flex-col"
	>
		<!-- Base Points: Heading -->
		<div class="mt-5 ml-8">
			<span class="text-lg font-bold text-slate-400 [text-shadow:_1px_1px_2px_rgb(0_0_0_/_20%)]">
				Base Points
			</span>
		</div>
		<!-- Base Points: List -->
		<div class="ml-14 flex flex-col">
			<div class="relative my-2 flex">
				<span class="w-40">Weight Measured</span>
				<span class="text-right w-6 mr-1">6</span>
				<img src="/gcoins.svg" alt="gcoins" />
				<img class="ml-10" src="/star.svg" alt="star" />
			</div>
			<div class="my-2">
				<span class="w-44">Weight Measured</span>
			</div>
			<div class="my-2">
				<span class="w-44">Weight Measured</span>
			</div>
		</div>
	</div>
</div>
