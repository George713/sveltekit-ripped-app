<script lang="ts">
	import { page } from '$app/state';
	import ActionButton from '../atoms/ActionButton.svelte';
</script>

<div class="absolute flex items-center space-x-3" style="transform: translate(115%, 134%)">
	<!-- Bodyfat -->
	<ActionButton
		glow={false}
		size="small"
		icon="insignia"
		disabled={page.data.user.enterBodyfatToday}
		hidden={!page.data.user.enterBodyfatToday}
	/>
	<div class="flex flex-col space-y-4">
		<!-- Review -->
		<ActionButton
			glow={false}
			size="small"
			icon="chart"
			disabled={page.data.dailyProgress.weeklyReview}
			hidden={!page.data.user.reviewToday}
		/>
		<!-- Photo -->
		<ActionButton
			glow={false}
			size="small"
			icon="camera"
			disabled={page.data.dailyProgress.weeklyPic}
			hidden={!page.data.user.progressPicToday}
		/>
	</div>
</div>
