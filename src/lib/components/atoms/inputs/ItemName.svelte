<!-- ItemName.svelte -->
<script lang="ts">
	export let itemName: string | null;
</script>

<input
	class="mx-3 mt-2 w-[calc(90%)] bg-transparent text-[18px] font-medium text-neutral-200 focus:outline-hidden"
	name="itemName"
	type="text"
	value={itemName}
	placeholder="Item Name..."
	required
/>
