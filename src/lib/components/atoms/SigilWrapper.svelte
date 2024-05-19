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
	<slot />
</button>
