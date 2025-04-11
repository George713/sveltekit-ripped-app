<script lang="ts">
	import Logo from '$lib/components/newDesign/atoms/BGLogoBig.svelte';
	import LogoFooter from '$lib/components/newDesign/atoms/LogoFooter.svelte';
	import SubtleLink from '$lib/components/newDesign/atoms/SubtleLink.svelte';
	import LoginForm from '$lib/components/newDesign/molecules/LoginForm.svelte';
</script>

<SubtleLink href="/register" text="Register" />
<Logo />
<div class="flex grow flex-col justify-end pb-20">
	<LoginForm />
</div>
<LogoFooter />
