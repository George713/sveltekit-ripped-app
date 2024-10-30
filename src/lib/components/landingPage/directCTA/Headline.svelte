<script lang="ts">
	let { classAddons = '' }: { classAddons?: string } = $props();
</script>

<h1
	class="hidden text-center text-3xl font-black capitalize !leading-[1.15] text-stone-200 lg:block lg:text-4xl {classAddons}"
>
	<span class="relative">
		<span class="relative z-10 text-stone-900">Shape</span>
		<span
			class="absolute left-0 z-0 h-full w-[calc(100%-2px)] -translate-x-0.5 -rotate-1 bg-orange-500"
		>
		</span>
	</span>
	<span class="relative z-10">The Development of<br /></span>
	<span class="relative">
		<span class="relative z-10 text-stone-900">This</span>
		<span
			class="absolute left-0 z-0 h-[calc(100%-3px)] w-[calc(100%-2px)] -translate-x-0.5 -rotate-1 bg-orange-500"
		>
		</span>
	</span>
	<span class="relative z-10">Rising Nutrition </span>
	<span class="relative">
		<span class="relative z-10 text-stone-900">App</span>
		<span
			class="absolute left-0 z-0 h-full w-[calc(100%+5px)] -translate-x-0.5 -rotate-1 bg-orange-500"
		>
		</span>
	</span>
</h1>

<h1
	class="text-center text-3xl font-black capitalize !leading-[1.15] text-stone-200 lg:hidden lg:text-4xl {classAddons}"
>
	<span class="relative">
		<span class="relative z-10 text-stone-900">Shape</span>
		<span
			class="absolute left-0 z-0 h-full w-[calc(100%-2px)] -translate-x-0.5 -rotate-1 bg-orange-500"
		>
		</span>
	</span>
	<span class="relative z-10">The Development <br />of</span>
	<span class="relative">
		<span class="relative z-10 text-stone-900">This</span>
		<span
			class="absolute left-0 z-0 h-[calc(100%-5px)] w-[calc(100%-2px)] -translate-x-0.5 translate-y-[2px] -rotate-1 bg-orange-500"
		>
		</span>
	</span>
	<span class="relative z-10">Rising <br />Nutrition </span>
	<span class="relative">
		<span class="relative z-10 text-stone-900">App</span>
		<span
			class="absolute left-0 z-0 h-full w-[calc(100%+5px)] -translate-x-0.5 translate-y-0.5 -rotate-1 bg-orange-500"
		>
		</span>
	</span>
</h1>
