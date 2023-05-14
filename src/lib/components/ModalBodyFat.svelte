<script lang="ts">
	import { enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import { modalBodyFat } from '$lib/stores';

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
					invalidateAll();
				}
			};
		}}
	>
		<label for="bodyfat">Current Body Fat Percentage</label>

		<input id="bodyfat" name="bodyfat" type="float" required use:init />
		<button type="submit">Log BF%</button>
	</form>
</ModalSkeleton>
