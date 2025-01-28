<!-- Nutrients.svelte -->
<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let unitAmount: number;
	export let activeUnitIsPtn: boolean;
	export let kcal: number | string;
	export let protein: number | string;

	const dispatch = createEventDispatcher();
</script>

<div class="mt-3 flex px-1 text-neutral-200">
	<!-- Portion -->
	<div class="flex flex-auto items-center">
		<input
			class="ml-2 mr-1 w-[35px] text-center focus:outline-hidden bg-black/20 rounded-sm py-0.5"
			name="unitAmount"
			bind:value={unitAmount}
			on:input={() => dispatch('unitAmount', unitAmount)}
			type="number"
		/>
		<div class="relative bg-black/20 rounded-sm flex items-baseline py-0.5">
			<input
				class="opacity-0 absolute w-full h-full z-10"
				type="text"
				value={activeUnitIsPtn}
				name="unitIsPtn"
				on:click={() => {
					activeUnitIsPtn = !activeUnitIsPtn;
					dispatch('activeUnitIsPtn', activeUnitIsPtn);
				}}
				readonly
			/>
			<div class="flex flex-col px-2 mt-[-5px] w-16">
				<p>{activeUnitIsPtn ? 'ptn' : 'grams'}</p>
				<div class="flex">
					<p class="text-xs font-light opacity-50">/</p>
					<p class="text-xs font-semilight opacity-50">
						{activeUnitIsPtn ? 'grams' : 'ptn'}
					</p>
				</div>
			</div>
		</div>
	</div>

	<!-- Calories & Protein-->
	<div class="flex flex-col pr-1 text-right font-light">
		<label class="flex justify-end">
			kcal:
			<input
				class="flex w-[45px] flex-col bg-transparent pr-[1px] text-right font-light focus:outline-hidden"
				name="kcal"
				placeholder="...  "
				type="number"
				step="1"
				bind:value={kcal}
				on:input={() => dispatch('kcal', kcal)}
				required
			/>
		</label>
		<label class="flex">
			protein:
			<input
				class="flex w-9 flex-col bg-transparent pr-1 text-right font-light focus:outline-hidden"
				name="protein"
				placeholder="... "
				type="number"
				step="0.1"
				bind:value={protein}
				on:input={() => dispatch('protein', protein)}
				required
			/>
			g
		</label>
	</div>
</div>
