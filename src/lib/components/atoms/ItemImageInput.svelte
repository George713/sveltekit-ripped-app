<script lang="ts">
	export let imageString: any;
	export let fileinput: HTMLInputElement;
	let image = '';

	const onFileSelected = (e: any) => {
		imageString = e.target.files[0];
		if (imageString) {
			let reader = new FileReader();
			reader.readAsDataURL(imageString);
			reader.onload = (e: any) => {
				image = e.target.result;
			};
		}
	};
</script>

<!-- Image Overlay -->
{#if image}
	<div class="absolute h-[156px] w-full rounded-b bg-black/70">
		<img class="absolute h-[156px] w-full rounded-b object-cover" src={image} alt="uploadedImage" />
	</div>
{:else}
	<button
		class="absolute h-[156px] w-full rounded-b bg-black opacity-30"
		on:click={() => {
			fileinput.click();
		}}
		type="button"
	/>
{/if}
<!-- Image -->
<div class="h-[calc(60%)] w-full rounded-b">
	{#if !image}
		<!-- Image Icon: Plus -->
		<button
			class="absolute left-[105px] top-16"
			on:click={() => {
				fileinput.click();
			}}
			type="button"
		>
			<svg class="h-7 w-7 fill-none stroke-neutral-200/80" viewBox="0 0 24 24">
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="1"
					d="M12 8v8m-4-4h2m6 0h-4m-8 4a4 4 0 0 0 4 4h8a4 4 0 0 0 4-4V8a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v4"
				/>
			</svg>
		</button>
	{:else}
		<!-- Image Icon: Edit -->
		<button
			class="absolute bottom-[calc(104px)] left-[calc(4px)]"
			on:click={() => {
				fileinput.click();
			}}
		>
			<svg class=" h-7 w-7 fill-none stroke-neutral-200/70" viewBox="0 0 24 24">
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="1"
					d="M12 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-6M9 15v-2.5l8.75-8.75c.69-.69 1.81-.69 2.5 0v0c.69.69.69 1.81 0 2.5L15.5 11l-4 4H9Z"
				/>
			</svg>
		</button>
	{/if}
</div>
<!-- Invisible input element -->
<input
	style="display:none"
	type="file"
	accept=".jpg, .jpeg, .png"
	on:change={(e) => onFileSelected(e)}
	bind:this={fileinput}
/>
