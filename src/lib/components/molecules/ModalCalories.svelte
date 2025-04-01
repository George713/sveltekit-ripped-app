<script lang="ts">
	import { enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import { visibleView } from '$lib/stores';
	import { selectInput, focusElement } from '$lib/utils.svelte';

	import ModalSkeleton from '$molecules/ModalSkeleton.svelte';
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

		<input
			id="calories"
			name="calories"
			type="number"
			on:focus={selectInput}
			use:focusElement
			required
		/>
		<button type="submit">Confirm Calories</button>
	</form>
</ModalSkeleton>
