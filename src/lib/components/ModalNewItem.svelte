<script lang="ts">
	import { page } from '$app/stores';
	import { deserialize } from '$app/forms';
	import { foodLibrary, plannedItems, showSpinner } from '$lib/stores';
	import type { FoodItem, PlannedItem } from '$lib/types';

	export let toggleModal: (modal: string) => void;
	export let originModal: string; // options: ModalPlanner or ModalEatingLog

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

	const addToPlanning = async (newItem: FoodItem) => {
		const newPlannedItem: PlannedItem = {
			id: plannedItems.maxId + 1,
			eaten: false,
			createdAt: new Date(),
			foodId: newItem.id
		};

		// Submit planned items to server
		const formData = new FormData();
		formData.append('plannedItems', JSON.stringify([newPlannedItem]));
		formData.append('username', JSON.stringify($page.data.user.name));
		const response = await fetch('?/finishPlanning', {
			method: 'POST',
			body: formData
		});

		const result = deserialize(await response.text());

		if (result.type === 'success' && result.data) {
			plannedItems.set(result.data.createdPlannedItems as PlannedItem[]);
		}
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

			// If origin is eatingLog, add item to planned items
			if (originModal == 'eat') {
				addToPlanning(newItem);
			}

			// Update foodLibrary
			foodLibrary.update((items) => {
				// @ts-ignore
				return [...items, newItem];
			});
		}

		// Return to previous modal
		toggleModal(originModal);

		// Hide spinner
		$showSpinner = false;
	};
</script>

<div class="absolute inset-0 w-full h-full bg-black/70">
	<div
		class="absolute bottom-1 left-0.5 w-[calc(100%-4px)] h-[calc(96%)] rounded-lg bg-neutral-600 border-[1px] border-neutral-500 flex flex-col items-center"
	>
		<!-- Title: Planner -->
		<p class="relative top-2 text-2xl font-semibold text-gray-200">New Item</p>

		<!-- Card -->
		<form method="POST" autocomplete="off" on:submit|preventDefault={handleSubmit}>
			<div
				class="relative top-12 w-[234px] h-[260px] border border-neutral-500
		shadow-[0.5px_0.5px_1.5px_rgba(0,0,0,0.1)] rounded-md overflow-hidden"
			>
				<!-- Image Overlay -->
				{#if image}
					<div class="absolute w-full h-[156px] bg-black/70 rounded-b">
						<img
							class="absolute object-cover w-full h-[156px] rounded-b"
							src={image}
							alt="uploadedImage"
						/>
					</div>
				{:else}
					<button
						class="absolute w-full h-[156px] bg-black opacity-30 rounded-b"
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
				<div class="w-full h-[calc(60%)] rounded-b" />
				{#if !image}
					<!-- Image Icon: Plus -->
					<button
						class="absolute top-16 left-[105px]"
						on:click={() => {
							fileinput.click();
						}}
					>
						<svg class="h-7 w-7 stroke-neutral-200/80 fill-none" viewBox="0 0 24 24">
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
						<svg class=" h-7 w-7 stroke-neutral-200/70 fill-none" viewBox="0 0 24 24">
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
					class="text-[18px] font-medium mx-3 w-[calc(90%)] mt-2 text-neutral-200 bg-transparent focus:outline-none"
					name="itemName"
					type="text"
					placeholder="Item Name..."
					required
				/>
				<div class="flex mt-3 px-1 text-neutral-200">
					<!-- Portion -->
					<label class="flex flex-auto items-center">
						<input
							class="ml-2 pr-1 text-right font-light w-[30px] bg-transparent focus:outline-none"
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
								class="flex flex-col pr-[1px] text-right font-light w-[50px] bg-transparent focus:outline-none"
								name="kcal"
								placeholder="...  "
								type="text"
								required
							/>
						</label>
						<label class="flex">
							protein:
							<input
								class="flex flex-col pr-1 text-right font-light w-10 bg-transparent focus:outline-none"
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
				class="relative top-14 bg-neutral-700 rounded-[4px] mx-auto flex items-center shadow-[inset_2px_2px_3px_rgba(161,161,161,0.05),inset_-2px_-2px_3px_rgba(0,0,0,0.05)]"
				type="submit"
			>
				<svg class="h-[18px] ml-1 px-1 stroke-zinc-300 fill-none" viewBox="0 0 24 24">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="1.5"
						d="M12 7v10m0-5h5M7 12h2.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
					/>
				</svg>
				<p
					class="flex flex-col text-[8px] font-medium text-zinc-300 leading-none tracking-tight py-[6px] pr-2"
				>
					Add Item
				</p>
			</button>
		</form>

		<!-- Minimize Symbol -->
		<button
			on:click={() => {
				toggleModal('planner');
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
