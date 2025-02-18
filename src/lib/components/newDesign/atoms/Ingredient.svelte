<script lang="ts">
	interface Props {
		icon: string;
		name: string;
		kcal: number;
		protein: number;
	}

	let { icon, name, kcal, protein }: Props = $props();
</script>

<div
	class="flex h-9 w-full items-center space-x-2 rounded-[6px] border border-stone-700 pr-[14px] pl-2 text-sm font-thin text-stone-400"
>
	{icon}
	<p class="grow pl-2">{name}</p>
	<p class="w-14 text-right">{kcal} kcal</p>
	<p class="w-9 text-right">{protein} g</p>
</div>
