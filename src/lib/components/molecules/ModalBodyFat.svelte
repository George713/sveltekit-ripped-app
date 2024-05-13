<script lang="ts">
	import { enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import { visibleView } from '$lib/stores';

	import ModalSkeleton from '$molecules/ModalSkeleton.svelte';

	const init = (el: HTMLElement) => {
		el.focus();
	};
</script>

<ModalSkeleton>
	<form
		action="?/logBodyFat"
		method="post"
		autocomplete="off"
		use:enhance={() => {
			return async ({ result }) => {
				if (result.type === 'success') {
					visibleView.update('none');
					invalidateAll();
				}
			};
		}}
	>
		<label for="bodyfat">Current Body Fat Percentage</label>

		<input id="bodyfat" name="bodyfat" type="number" required use:init />
		<button type="submit">Log BF%</button>
	</form>
</ModalSkeleton>
