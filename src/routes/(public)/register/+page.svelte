<script lang="ts">
	import Logo from '$lib/components/newDesign/atoms/BGLogoBig.svelte';
	import LogoFooter from '$lib/components/newDesign/atoms/LogoFooter.svelte';
	import MobilePrompt from '$lib/components/newDesign/atoms/MobilePrompt.svelte';
	import SubtleLink from '$lib/components/newDesign/atoms/SubtleLink.svelte';
	import RegisterForm from '$lib/components/newDesign/molecules/RegisterForm.svelte';
	import { isMobile } from '$lib/utils.svelte.js';

	let { form } = $props();
</script>

<div class="flex h-full w-full items-center justify-center">
	<div class="flex h-full max-h-[932px] flex-col justify-between">
		{#if isMobile()}
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
