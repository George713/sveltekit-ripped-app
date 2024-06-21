<!-- ItemImage.svelte -->
<script lang="ts">
	import BtnFileInput from '$atoms/inputs/BtnFileInput.svelte';

	export let imageString: any;
	export let fileInput: HTMLInputElement;
	export let foodId: number | null;
	let image = '';

	const onFileSelected = (e: any) => {
		imageString = e.target.files[0];
		if (imageString) {
			let reader = new FileReader();
			reader.readAsDataURL(imageString);
			reader.onload = (e: any) => {
				image = e.target.result;
			};
			foodId = null;
		}
	};
</script>

<!-- Outer Shape -->
<div class="relative h-[calc(60%)] w-full">
	<!-- Overlay -->
	<div class="absolute h-full w-full rounded-b-lg bg-black/50" />
	<!-- Image from storage/upload/no image-->
	{#if foodId}
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
		<!-- <BtnFileInput {fileInput} icon="edit" /> -->
	{:else}
		<BtnFileInput {fileInput} icon="plus" />
	{/if}
</div>
<!-- Invisible input element -->
<input
	style="display:none"
	type="file"
	accept=".jpg, .jpeg, .png"
	on:change={(e) => onFileSelected(e)}
	bind:this={fileInput}
/>
