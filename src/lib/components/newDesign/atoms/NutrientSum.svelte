<script lang="ts">
	interface Props {
		kcal: number;
		protein: number;
	}

	let { kcal, protein }: Props = $props();
</script>

<p class="flex w-full justify-end text-sm font-medium text-stone-400">
	{kcal === 0 ? 0 : kcal < 10 ? kcal.toFixed(1) : Math.round(kcal)} kcal &nbsp;|&nbsp;
	{protein === 0 ? 0 : protein < 10 ? protein.toFixed(1) : Math.round(protein)} g protein
</p>
