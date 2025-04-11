<script lang="ts">
	import Logo from '$lib/components/newDesign/atoms/BGLogoBig.svelte';
	import LogoFooter from '$lib/components/newDesign/atoms/LogoFooter.svelte';
	import SubtleLink from '$lib/components/newDesign/atoms/SubtleLink.svelte';
	import LoginForm from '$lib/components/newDesign/molecules/LoginForm.svelte';
	import { isMobile } from '$lib/utils.svelte';
</script>

{#if isMobile()}
	<SubtleLink href="/register" text="Register" />
	<Logo />
	<div class="flex grow flex-col justify-end pb-20">
		<LoginForm />
	</div>
	<LogoFooter />
{:else}
	<Logo />
	<div class="flex grow flex-col items-center justify-center space-y-10 bg-rose-700/0">
		<p class="text-center text-2xl font-bold text-stone-200">Switch to your mobile device.</p>
		<p class="w-64 text-center text-lg text-stone-200">
			Have Your Cookie is optimized for mobile use. Please switch to your smartphone.
		</p>
	</div>
	<LogoFooter />
{/if}
