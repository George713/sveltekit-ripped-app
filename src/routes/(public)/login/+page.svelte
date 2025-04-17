<script lang="ts">
	import Logo from '$lib/components/newDesign/atoms/BGLogoBig.svelte';
	import LogoFooter from '$lib/components/newDesign/atoms/LogoFooter.svelte';
	import MobilePrompt from '$lib/components/newDesign/atoms/MobilePrompt.svelte';
	import SubtleLink from '$lib/components/newDesign/atoms/SubtleLink.svelte';
	import LoginForm from '$lib/components/newDesign/molecules/LoginForm.svelte';
	import { isMobile } from '$lib/utils.svelte';
</script>

<div class="flex h-full w-full items-center justify-center">
	<div class="flex h-full max-h-[932px] flex-col justify-between">
		{#if true}
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
