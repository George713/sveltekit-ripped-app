<script lang="ts">
	import { enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';

	import ModalSkeleton from './ModalSkeleton.svelte';

	export let toggleModal: (modal: string) => void;

	const init = (el: HTMLElement) => {
		el.focus();
	};
</script>

<ModalSkeleton {toggleModal}>
	<form
		action="?/logBodyFat"
		method="post"
		autocomplete="off"
		use:enhance={() => {
			return async ({ result }) => {
				if (result.type === 'success') {
					toggleModal('none');
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
