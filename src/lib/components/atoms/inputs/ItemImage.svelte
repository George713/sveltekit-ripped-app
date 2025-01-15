<!-- ItemImage.svelte -->
<script lang="ts">
	import BtnFileInput from '$atoms/inputs/BtnFileInput.svelte';
	import Camera from '$atoms/inputs/Camera.svelte';

	export let imageBlob: Blob | null;
	export let foodId: number | null = null;

	let image = '';
	let showCamera = false;

	const handlePhotoTaken = (imageDataUrl: string, blob: Blob) => {
		image = imageDataUrl;
		imageBlob = blob;
	};
</script>

<!-- Outer Shape -->
<div class="relative h-[calc(60%)] w-full">
	<!-- Image from storage/upload/no image-->
	{#if foodId && !image && !showCamera}
		<img
			src={`https://cdswqmabrloxyfswpggl.supabase.co/storage/v1/object/public/foodItems/foodItem_${foodId}`}
			alt="imgUrl"
			style="width:100%;height:100%;"
			class="rounded-b-lg object-cover"
		/>
	{:else if image}
		<img class="absolute h-full w-full rounded-b-lg object-cover" src={image} alt="uploadedImage" />
	{/if}
	{#if foodId || image}
		<!-- Temporarily disable field interaction -->
		<BtnFileInput icon="edit" on:click={() => (showCamera = true)} />
	{:else}
		<BtnFileInput icon="plus" on:click={() => (showCamera = true)} />
	{/if}
	{#if showCamera}
		<Camera bind:showCamera {handlePhotoTaken} />
	{/if}
</div>
