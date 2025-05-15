<script lang="ts">
	import Arrow from '$icons/Arrow.svelte';
	import { langDict, type LanguageCode } from '$lib/lang';

	interface Props {
		language: LanguageCode;
	}

	let { language = $bindable() }: Props = $props();

	let isOpen = $state(false);
	let componentRootElement: HTMLDivElement | undefined = $state(undefined); // For click-outside detection

	const toggleDropdown = () => {
		isOpen = !isOpen;
	};

	const closeDropdown = () => {
		isOpen = false;
	};

	const selectLanguage = (lang: LanguageCode) => {
		language = lang;
		closeDropdown();
	};
</script>

{#snippet langOption(lang: LanguageCode)}
	<button
		class="flex h-10 items-center justify-between border-t border-stone-700 text-stone-200 last:border-t-0"
		onclick={() => selectLanguage(lang)}
		type="button"
	>
		{langDict[lang]}
	</button>
{/snippet}

<!-- Component Root: Ensure this is a relatively positioned container for the dropdown -->
<div class="relative inline-block text-left" bind:this={componentRootElement}>
	<button
		class="flex h-10 w-40 items-center justify-between rounded border border-stone-200 px-4 text-stone-200"
		onclick={toggleDropdown}
		type="button"
	>
		{langDict[language]}
		<div class="flex flex-col -space-y-[6px]">
			<Arrow direction="up" scale={0.75} onclick={() => {}} />
			<Arrow direction="down" scale={0.75} onclick={() => {}} />
		</div>
	</button>

	<!-- Dropdown Panel -->
	{#if isOpen}
		<div
			class="absolute right-0 bottom-full z-10 mb-2 flex w-40 origin-bottom-left flex-col-reverse rounded border border-stone-200 bg-stone-900/80 px-4 shadow-lg backdrop-blur-xs"
		>
			{#each Object.entries(langDict) as [key, _] (key)}
				{@render langOption(key as LanguageCode)}
			{/each}
		</div>
	{/if}
</div>

<!-- Click outside handler -->
<svelte:window
	onclick={(event) => {
		// Check if the click is outside the picker button and the dropdown itself
		// This assumes your dropdown panel will also be a child of the main div or have a specific ID/class to check against
		if (isOpen && componentRootElement && !componentRootElement.contains(event.target as Node)) {
			// A more robust check would also ensure the click is not within the dropdown panel itself
			// For example, by giving the dropdown panel an ID and checking event.target against it.
			// For now, this closes if click is outside the button.
			closeDropdown();
		}
	}}
/>
