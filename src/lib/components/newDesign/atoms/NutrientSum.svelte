<script lang="ts">
	interface Props {
		kcal: number;
		protein: number;
	}

	let { kcal, protein }: Props = $props();
</script>

<p class="flex w-full justify-end text-sm font-medium text-stone-400">
	{kcal} kcal &nbsp;|&nbsp; {protein}g protein
</p>
