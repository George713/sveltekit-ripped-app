<script lang="ts">
	let { classAddons = '' }: { classAddons?: string } = $props();
</script>

<h1
	class=" text-center text-3xl font-black capitalize leading-[1.15]! text-stone-200 lg:text-left lg:text-4xl {classAddons}"
>
	<span class="relative">
		<span class="relative z-10 text-stone-900">Having Fun</span>
		<span
			class="absolute left-0 z-0 h-full w-[calc(100%-5px)] -translate-x-0.5 -rotate-1 bg-orange-500"
		>
		</span>
	</span>
	<span class="relative z-10">while<br />Dieting is the Key to<br /> </span>
	<span class="relative">
		<span class="relative z-10 text-stone-900">Losing Body Fat</span>
		<span
			class="absolute left-0 z-0 h-[calc(100%-2px)] w-[calc(100%+5px)] -translate-x-0.5 translate-y-0.5 -rotate-1 bg-orange-500"
		>
		</span>
	</span>
</h1>
