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
		glow={false}
		size="small"
		icon="insignia"
		disabled={!page.data.user.enterBodyfatToday}
		hidden={!page.data.user.enterBodyfatToday}
		onclick={() => goto('/bodyfat')}
	/>
	<div class="flex flex-col space-y-4">
		<!-- Review -->
		<ActionButton
			glow={page.data.dailyProgress.review}
			size="small"
			icon="chart"
			disabled={page.data.dailyProgress.review}
			hidden={!page.data.user.reviewToday}
			onclick={() => goto('/review')}
		/>
		<!-- Photo -->
		<ActionButton
			glow={page.data.dailyProgress.progressPic}
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
