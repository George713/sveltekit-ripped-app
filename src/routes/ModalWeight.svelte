<script lang="ts">
	import { enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import { modalWeight } from '$lib/stores';

	import ModalSkeleton from './ModalSkeleton.svelte';

	const init = (el: HTMLElement) => {
		el.focus();
	};
</script>

<ModalSkeleton>
	<form
		action="?/logWeight"
		method="post"
		use:enhance={() => {
			return async ({ result }) => {
				if (result.type === 'success') {
					modalWeight.set(false);
					invalidateAll();
				}
			};
		}}
	>
		<label for="weight">Current Weight</label>

		<input id="weight" name="weight" type="float" required use:init />
		<button type="submit">Log Weight</button>
	</form>
</ModalSkeleton>
