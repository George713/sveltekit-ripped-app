<script lang="ts">
	import IconPizza from '$atoms/IconPizza.svelte';
	import IconScale from '$atoms/IconScale.svelte';

	export let mainText: string;
	export let subText: string;
	export let value: number | string;
	export let unit: string;
	export let color: string;
</script>

<div
	class="w-36 h-24 bg-slate-50 rounded-md shadow-[2px_2px_2px_0px_rgba(0,0,0,0.10)] bg-gradient-to-br from-stone-100 flex flex-col"
>
	<!-- Top Row (Icon, Main Text, Subtext) -->
	<div class="flex mt-2 mb-1 pl-1.5">
		{#if color === 'yellow-400'}
			<IconPizza {color} />
		{:else if color === 'blue-300'}
			<IconScale {color} />
		{/if}

		<div class="h-10 w-24 ml-1">
			<p class="text-[12px] font-semibold text-stone-500">{mainText}</p>
			<p class="text-[10px] font-light text-stone-500">{subText}</p>
		</div>
	</div>
	<!-- Bottom Row (value, unit) -->
	<div class="flex justify-center">
		<p class="text-2xl font-bold text-{color} flex items-end pl-2 pr-1">{value}</p>
		<p class="font-semibold text-{color} text-sm flex items-end">{unit}</p>
	</div>
</div>
