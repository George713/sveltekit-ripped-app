<script lang="ts">
	// Svelte & SvelteKit
	import { onMount } from 'svelte';
	// Logic
	import { isMobile } from '$lib/utils.svelte.js';
	// Atoms
	import Logo from '$atoms/BGLogoBig.svelte';
	import LogoFooter from '$atoms/LogoFooter.svelte';
	import MobilePrompt from '$atoms/MobilePrompt.svelte';
	import SubtleLink from '$atoms/SubtleLink.svelte';
	// Molecules
	import RegisterForm from '$molecules/RegisterForm.svelte';

	let { form } = $props();

	let userIsOnMobile = $state(false);

	onMount(() => {
		userIsOnMobile = isMobile();
	});
</script>

<div class="flex h-full w-full items-center justify-center overflow-y-auto">
	<div class="flex h-full max-h-[932px] flex-col justify-between">
		{#if userIsOnMobile}
			{#if !form?.success}
				<SubtleLink href="/login" text="Login" />
			{/if}
			<Logo />
			<RegisterForm {form} />
			<LogoFooter />
		{:else}
			<Logo />
			<MobilePrompt />
			<LogoFooter />
		{/if}
	</div>
</div>
