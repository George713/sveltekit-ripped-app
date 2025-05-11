<script lang="ts">
	// Atoms
	import Camera from '$atoms/inputs/Camera.svelte';

	interface Props {
		foodId: number | null;
		imageBlob: Blob | null;
	}

	let { foodId, imageBlob = $bindable() }: Props = $props();

	let image = $state('');
	let showCamera = $state(false);
</script>

<button
	onclick={() => (showCamera = true)}
	type="button"
	class="flex h-[200px] w-[280px] flex-col items-center justify-center space-y-2 rounded-[10px] bg-stone-800 shadow-[inset_2px_2px_4px_0px_rgba(0,0,0,0.1)]"
>
	{#if showCamera}
		<Camera bind:image bind:imageBlob bind:showCamera />
	{:else}
		<!-- Case: Completely new Item, no photo taken yet -->
		{#if !foodId && !image}
			<!-- Plus symbol -->
			<svg
				width="67"
				height="68"
				viewBox="0 0 67 68"
				class="mt-4"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M66.9583 9.55359C66.9583 4.514 62.8731 0.428589 57.8333 0.428589H45.6667C43.9868 0.428589 42.625 1.7904 42.625 3.47026C42.625 5.15011 43.9868 6.51192 45.6667 6.51192H57.8333C59.5132 6.51192 60.875 7.87374 60.875 9.55359V21.7203C60.875 23.4001 62.2368 24.7619 63.9167 24.7619C65.5966 24.7619 66.9583 23.4001 66.9583 21.7203V9.55359Z"
					class="fill-stone-400"
				/>
				<path
					d="M66.9583 46.0536C66.9583 44.3737 65.5966 43.012 63.9167 43.012C62.2368 43.012 60.875 44.3737 60.875 46.0536V58.2203C60.875 59.9002 59.5132 61.262 57.8333 61.262H45.6667C43.9868 61.262 42.625 62.6237 42.625 64.3036C42.625 65.9835 43.9868 67.3453 45.6667 67.3453H57.8333C62.8731 67.3453 66.9583 63.26 66.9583 58.2203V46.0536Z"
					class="fill-stone-400"
				/>
				<path
					d="M21.3332 61.262H9.1665C7.48665 61.262 6.12484 59.9002 6.12484 58.2203V46.0536C6.12484 44.3737 4.76302 43.012 3.08317 43.012C1.40332 43.012 0.0415039 44.3737 0.0415039 46.0536V58.2203C0.0415039 63.26 4.12692 67.3453 9.1665 67.3453H21.3332C23.013 67.3453 24.3748 65.9835 24.3748 64.3036C24.3748 62.6237 23.013 61.262 21.3332 61.262Z"
					class="fill-stone-400"
				/>
				<path
					d="M0.0415039 21.7203C0.0415039 23.4001 1.40332 24.7619 3.08317 24.7619C4.76302 24.7619 6.12484 23.4001 6.12484 21.7203V9.55359C6.12484 7.87374 7.48665 6.51192 9.1665 6.51192H21.3332C23.013 6.51192 24.3748 5.15011 24.3748 3.47026C24.3748 1.7904 23.013 0.428589 21.3332 0.428589H9.1665C4.12692 0.428589 0.0415039 4.514 0.0415039 9.55359V21.7203Z"
					class="fill-stone-400"
				/>
				<path
					d="M30.458 24.7619C30.458 23.082 31.8198 21.7202 33.4997 21.7202C35.1796 21.7202 36.5413 23.082 36.5413 24.7619V30.8452H42.6247C44.3046 30.8452 45.6663 32.207 45.6663 33.8869C45.6663 35.5668 44.3046 36.9285 42.6247 36.9285H36.5413V43.0119C36.5413 44.6918 35.1796 46.0535 33.4997 46.0535C31.8198 46.0535 30.458 44.6918 30.458 43.0119V36.9285H24.3747C22.6948 36.9285 21.333 35.5668 21.333 33.8869C21.333 32.207 22.6948 30.8452 24.3747 30.8452H30.458V24.7619Z"
					class="fill-stone-400"
				/>
			</svg>
			<!-- Text -->
			<p class="text-stone-500">Take Photo</p>
		{:else if image}
			<img class="h-full w-full rounded-[10px]" src={image} alt="uploadedImage" />
		{:else if foodId}
			<img
				src={`https://cdswqmabrloxyfswpggl.supabase.co/storage/v1/object/public/foodItems/foodItem_${foodId}`}
				alt="imgUrl"
				style="width:100%;height:100%;"
				class="rounded-[10px] object-cover"
			/>
		{/if}
	{/if}
</button>
