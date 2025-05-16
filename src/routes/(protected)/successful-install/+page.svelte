<script lang="ts">
	import Logo from '$atoms/BGLogoBig.svelte';
	import LogoFooter from '$atoms/LogoFooter.svelte';
</script>

<Logo />
<div class="flex grow flex-col items-center justify-center space-y-10 bg-rose-700/0">
	<p class="text-center text-2xl font-bold text-stone-200">App installed.</p>
	<p class="w-64 text-center text-lg text-stone-200">
		You can now close this tab and open the app from your home screen with all its features.
	</p>
</div>
<LogoFooter />
