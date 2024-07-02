<script lang="ts">
	import { page } from '$app/stores';

	import { visibleView } from '$lib/stores';

	$: weeklyReviewOutstanding =
		$page.data.user.reviewToday && !$page.data.dailyProgress.weeklyReview;
</script>

<button
	class={weeklyReviewOutstanding ? 'animate-pulse absolute' : 'absolute'}
	on:click={() => visibleView.update('review')}
>
	<img
		class="drop-shadow-lg blur-[0.3px] brightness-95 mt-10"
		width={$page.data.user.currentStatus === 'wood' ? 350 : 330}
		src="/sigils/{$page.data.user.currentStatus}.webp"
		alt="Sigil Crest"
	/>
</button>
