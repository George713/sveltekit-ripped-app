<script lang="ts">
	// Svelte & SvelteKit
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	// Logic
	import { uploadProgressPic } from '$lib/imageHandler.svelte';
	// Atoms
	import ActionButton from '$atoms/ActionButton.svelte';

	let inputElement: HTMLInputElement;
</script>

<div class="absolute flex items-center space-x-3" style="transform: translate(115%, 134%)">
	<!-- Bodyfat -->
	<ActionButton
		glowStrength={page.data.dailyProgress.bodyfat ? 1 : 0}
		size="small"
		icon="insignia"
		disabled={page.data.dailyProgress.bodyfat}
		hidden={!page.data.user.enterBodyfatToday && !page.data.dailyProgress.bodyfat}
		onclick={() => goto('/app/bodyfat')}
	/>
	<div class="flex flex-col space-y-4">
		<!-- Review -->
		<ActionButton
			glowStrength={page.data.dailyProgress.review ? 1 : 0}
			size="small"
			icon="chart"
			disabled={page.data.dailyProgress.review}
			hidden={!page.data.user.reviewToday}
			onclick={() => goto('/app/review?allowUpdate=true')}
		/>
		<!-- Photo -->
		<!-- `hidden` state covers cases of initial photos. Becomes visible after taking initial photos. -->
		<ActionButton
			glowStrength={page.data.dailyProgress.progressPic ? 1 : 0}
			size="small"
			icon="camera"
			disabled={page.data.dailyProgress.progressPic}
			hidden={!(page.data.dailyProgress.progressPic || page.data.user.progressPicToday)}
			onclick={() => inputElement.click()}
		/>
	</div>
</div>

<input
	bind:this={inputElement}
	onchange={(event) => uploadProgressPic(event, 'weekly')}
	type="file"
	accept="image/*"
	capture="user"
	hidden
/>
