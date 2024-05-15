<script lang="ts">
	import { page } from '$app/stores';

	import { visibleView } from '$lib/stores';
</script>

<button
	class={$page.data.user.reviewToday && !$page.data.locals?.weeklyReview
		? 'animate-pulse absolute'
		: 'absolute'}
	on:click={() => visibleView.update('review')}
>
	<slot />
</button>
