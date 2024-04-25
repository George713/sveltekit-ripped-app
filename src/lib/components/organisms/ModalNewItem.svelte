<script lang="ts">
	import { deserialize } from '$app/forms';
	import { foodLibrary, showSpinner, visibleView } from '$lib/stores';
	import type { FoodItem } from '$lib/types';

	let image = '';
	let imageString: any;
	let fileinput: HTMLInputElement;

	const onFileSelected = (e: any) => {
		imageString = e.target.files[0];
		let reader = new FileReader();
		reader.readAsDataURL(imageString);
		reader.onload = (e: any) => {
			image = e.target.result;
		};
	};

	const handleSubmit = async (event: Event) => {
		// Show spinner
		$showSpinner = true;

		const response = await fetch('?/newItem', {
			method: 'POST',
			body: new FormData(event.target as HTMLFormElement)
		});

		const result = deserialize(await response.text());

		if (result.type === 'success' && result.data) {
			// Upload image to s3 using presignURL
			// @ts-ignore
			await fetch(result.data.presignedURL, {
				method: 'PUT',
				body: imageString
			});
			const newItem = result.data.newItem as FoodItem;

			// Update foodLibrary
			foodLibrary.update((items) => {
				// @ts-ignore
				return [...items, newItem];
			});
		}

		// Return to previous modal
		visibleView.update($visibleView.previous);

		// Hide spinner
		$showSpinner = false;
	};
</script>

<div class="absolute inset-0 h-full w-full bg-black/70">
	<div
		class="absolute bottom-1 left-0.5 flex h-[calc(96%)] w-[calc(100%-4px)] flex-col items-center rounded-lg border-[1px] border-neutral-500 bg-neutral-600"
	>
		<!-- Title: Planner -->
		<p class="relative top-2 text-2xl font-semibold text-gray-200">New Item</p>

		<!-- Card -->
		<form method="POST" autocomplete="off" on:submit|preventDefault={handleSubmit}>
			<div
				class="relative top-12 h-[260px] w-[234px] overflow-hidden rounded-md
		border border-neutral-500 shadow-[0.5px_0.5px_1.5px_rgba(0,0,0,0.1)]"
			>
				<!-- Image Overlay -->
				{#if image}
					<div class="absolute h-[156px] w-full rounded-b bg-black/70">
						<img
							class="absolute h-[156px] w-full rounded-b object-cover"
							src={image}
							alt="uploadedImage"
						/>
					</div>
				{:else}
					<button
						class="absolute h-[156px] w-full rounded-b bg-black opacity-30"
						on:click={() => {
							fileinput.click();
						}}
					/>
				{/if}
				<input
					style="display:none"
					type="file"
					accept=".jpg, .jpeg, .png"
					on:change={(e) => onFileSelected(e)}
					bind:this={fileinput}
					required
				/>
				<!-- Image -->
				<div class="h-[calc(60%)] w-full rounded-b" />
				{#if !image}
					<!-- Image Icon: Plus -->
					<button
						class="absolute left-[105px] top-16"
						on:click={() => {
							fileinput.click();
						}}
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
				<!-- Item Name -->
				<input
					class="mx-3 mt-2 w-[calc(90%)] bg-transparent text-[18px] font-medium text-neutral-200 focus:outline-none"
					name="itemName"
					type="text"
					placeholder="Item Name..."
					required
				/>
				<div class="mt-3 flex px-1 text-neutral-200">
					<!-- Portion -->
					<label class="flex flex-auto items-center">
						<input
							class="ml-2 w-[30px] bg-transparent pr-1 text-right font-light focus:outline-none"
							name="portionSize"
							value="1"
							type="text"
						/>
						ptn
					</label>

					<!-- Calories & Protein-->
					<div class="flex flex-col pr-1 text-right font-light">
						<label class="flex justify-end">
							kcal:
							<input
								class="flex w-[50px] flex-col bg-transparent pr-[1px] text-right font-light focus:outline-none"
								name="kcal"
								placeholder="...  "
								type="text"
								required
							/>
						</label>
						<label class="flex">
							protein:
							<input
								class="flex w-10 flex-col bg-transparent pr-1 text-right font-light focus:outline-none"
								name="protein"
								placeholder="... "
								type="text"
								required
							/>
							g
						</label>
					</div>
				</div>
			</div>
			<button
				class="relative top-14 mx-auto flex items-center rounded-[4px] bg-neutral-700 shadow-[inset_2px_2px_3px_rgba(161,161,161,0.05),inset_-2px_-2px_3px_rgba(0,0,0,0.05)]"
				type="submit"
			>
				<svg class="ml-1 h-[18px] fill-none stroke-zinc-300 px-1" viewBox="0 0 24 24">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="1.5"
						d="M12 7v10m0-5h5M7 12h2.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
					/>
				</svg>
				<p
					class="flex flex-col py-[6px] pr-2 text-[8px] font-medium leading-none tracking-tight text-zinc-300"
				>
					Add Item
				</p>
			</button>
		</form>

		<!-- Minimize Symbol -->
		<button
			on:click={() => {
				visibleView.update($visibleView.previous);
			}}
			class="absolute bottom-3"
		>
			<svg width="31" height="18" class=" fill-none stroke-neutral-500"
				><path
					stroke-linecap="round"
					stroke-width="3"
					d="m2 2 13.066 6.291a1 1 0 0 0 .868 0L29 2M2 9.5l13.066 6.291a1 1 0 0 0 .868 0L29 9.5"
				/>
			</svg>
		</button>
	</div>
</div>
