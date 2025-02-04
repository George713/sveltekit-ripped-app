<script lang="ts">
	import Logo from '$lib/components/newDesign/atoms/BGLogoBig.svelte';
	import LogoFooter from '$lib/components/newDesign/atoms/LogoFooter.svelte';
	import SubtleLink from '$lib/components/newDesign/atoms/SubtleLink.svelte';
	import LoginForm from '$lib/components/newDesign/molecules/LoginForm.svelte';
</script>

<SubtleLink href="/register" text="Register" />
<Logo />
<div class="mb-1 flex grow flex-col justify-end space-y-20">
	<LoginForm />
	<LogoFooter />
</div>
