<script lang="ts">
	import { enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import { visibleView } from '$lib/stores';

	import ModalSkeleton from '$molecules/ModalSkeleton.svelte';

	// For putting the focus automatically on input field
	const init = (el: HTMLElement) => {
		el.focus();
	};
</script>

<ModalSkeleton>
	<form
		action="?/logCalories"
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
		<label for="calories">Target Calories</label>

		<input id="calories" name="calories" type="float" required use:init />
		<button type="submit">Confirm Calories</button>
	</form>
</ModalSkeleton>
