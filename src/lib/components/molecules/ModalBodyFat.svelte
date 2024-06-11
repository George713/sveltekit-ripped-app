<script lang="ts">
	import { enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import { visibleView } from '$lib/stores';
	import { focusElement } from '$lib/utils';

	import ModalSkeleton from '$molecules/ModalSkeleton.svelte';
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
		<input id="bodyfat" name="bodyfat" type="number" step="0.1" use:focusElement required />
		<button type="submit">Log BF%</button>
	</form>
</ModalSkeleton>
