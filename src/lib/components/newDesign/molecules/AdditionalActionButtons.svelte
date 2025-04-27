<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import { uploadProgressPic } from '$lib/imageHandler.svelte';
	import ActionButton from '../atoms/ActionButton.svelte';

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
		onclick={() => goto('/bodyfat')}
	/>
	<div class="flex flex-col space-y-4">
		<!-- Review -->
		<ActionButton
			glowStrength={page.data.dailyProgress.review ? 1 : 0}
			size="small"
			icon="chart"
			disabled={page.data.dailyProgress.review}
			hidden={!page.data.user.reviewToday}
			onclick={() => goto('/review?allowUpdate=true')}
		/>
		<!-- Photo -->
		<ActionButton
			glowStrength={page.data.dailyProgress.progressPic ? 1 : 0}
			size="small"
			icon="camera"
			disabled={page.data.dailyProgress.progressPic}
			hidden={page.data.schedule.nextProgressPic.remainingDays > 0}
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
