<script lang="ts">
	import { enhance } from '$app/forms';
	import { modalBodyFat } from './stores';

	import ModalSkeleton from './ModalSkeleton.svelte';

	const init = (el: HTMLElement) => {
		el.focus();
	};
</script>

<ModalSkeleton>
	<form
		action="?/logBodyFat"
		method="post"
		use:enhance={() => {
			return async ({ result }) => {
				if (result.type === 'success') {
					modalBodyFat.set(false);
				}
			};
		}}
	>
		<label for="bodyfat">Current Body Fat Percentage</label>

		<input id="bodyfat" name="bodyfat" type="float" required use:init />
		<button type="submit">Log BF%</button>
	</form>
</ModalSkeleton>
