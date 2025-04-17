<script lang="ts">
	import Logo from '$lib/components/newDesign/atoms/BGLogoBig.svelte';
	import LogoFooter from '$lib/components/newDesign/atoms/LogoFooter.svelte';
	import MobilePrompt from '$lib/components/newDesign/atoms/MobilePrompt.svelte';
	import SubtleLink from '$lib/components/newDesign/atoms/SubtleLink.svelte';
	import RegisterForm from '$lib/components/newDesign/molecules/RegisterForm.svelte';
	import { isMobile } from '$lib/utils.svelte.js';
	import { onMount } from 'svelte';

	let { form } = $props();

	let userIsOnMobile = $state(false);

	onMount(() => {
		userIsOnMobile = isMobile();
	});
</script>

<div class="flex min-h-full w-full items-center justify-center overflow-y-auto">
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
