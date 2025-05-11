<script lang="ts">
	// Svelte & SvelteKit
	import { onMount } from 'svelte';
	// Logic
	import { isMobile } from '$lib/utils.svelte';
	// Atoms
	import Logo from '$atoms/BGLogoBig.svelte';
	import LogoFooter from '$atoms/LogoFooter.svelte';
	import MobilePrompt from '$atoms/MobilePrompt.svelte';
	import SubtleLink from '$atoms/SubtleLink.svelte';
	// Molecules
	import LoginForm from '$molecules/LoginForm.svelte';

	let userIsOnMobile = $state(false);

	onMount(() => {
		userIsOnMobile = isMobile();
	});
</script>

<div class="flex h-full w-full items-center justify-center">
	<div class="flex h-full max-h-[932px] flex-col justify-between">
		{#if userIsOnMobile}
			<SubtleLink href="/register" text="Register" />
			<Logo />
			<LoginForm />
			<LogoFooter />
		{:else}
			<Logo />
			<MobilePrompt />
			<LogoFooter />
		{/if}
	</div>
</div>
