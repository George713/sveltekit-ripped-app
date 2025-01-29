<script lang="ts">
	import Logo from '$lib/components/newDesign/atoms/BGLogoBig.svelte';
	import LogoFooter from '$lib/components/newDesign/atoms/LogoFooter.svelte';
	import SubtleLink from '$lib/components/newDesign/atoms/SubtleLink.svelte';
	import RegisterForm from '$lib/components/newDesign/molecules/RegisterForm.svelte';

	let { form } = $props();
</script>

{#if !form?.success}
	<SubtleLink href="/login" text="Login" />
{/if}
<Logo />
<div class="mb-1 flex grow flex-col justify-end space-y-20">
	<RegisterForm {form} />
	<LogoFooter />
</div>
