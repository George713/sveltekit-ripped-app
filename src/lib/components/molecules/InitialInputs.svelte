<script lang="ts">
	import { page } from '$app/stores';
	import { visibleView } from '$lib/stores';

	import ActionButton from '$atoms/ActionButton.svelte';
	import BodyfatButton from '$atoms/BodyfatButton.svelte';
	import ProgressPicButton from '$atoms/ProgressPicButton.svelte';
</script>

<div class="flex justify-center">
	<!-- Target calorie input -->
	<ActionButton
		text="Calories"
		onclick={() => {
			visibleView.update('calories');
		}}
		disabled={$page.data.user.initCalories}
		width={24}
	/>
	<!-- Photo input -->
	<ProgressPicButton
		text="Photo"
		disabled={$page.data.user.initPhoto}
		width={20}
		isInitPic="true"
	/>
	<!-- BodyFat input -->
	<BodyfatButton disabled={$page.data.user.initBF} />
</div>
