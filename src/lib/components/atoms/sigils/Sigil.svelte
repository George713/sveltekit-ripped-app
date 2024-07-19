<script lang="ts">
	import { page } from '$app/stores';

	import { visibleView } from '$lib/stores';

	$: weeklyReviewOutstanding =
		$page.data.user.reviewToday && !$page.data.dailyProgress.weeklyReview;
</script>

<button
	class={weeklyReviewOutstanding ? 'absolute animate-pulse' : 'absolute' + ' mt-10'}
	on:click={() => visibleView.update('review')}
>
	<img
		class="blur-[0.3px] brightness-95 drop-shadow-lg"
		width={$page.data.user.currentStatus === 'wood' ? 350 : 330}
		src="/sigils/{$page.data.user.currentStatus}.webp"
		alt="Sigil Crest"
	/>
</button>
