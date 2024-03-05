<script lang="ts">
	import { enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import { createEventDispatcher } from 'svelte';

	import ModalSkeleton from './ModalSkeleton.svelte';

	export let toggleModal: (modal: string) => void;

	// For putting the focus automatically on input field
	const init = (el: HTMLElement) => {
		el.focus();
	};

	const dispatch = createEventDispatcher();

	const playSound = () => {
		dispatch('playSound', {
			text: 'weighIn'
		});
	};
</script>

<ModalSkeleton {toggleModal}>
	<form
		action="?/logWeight"
		method="post"
		autocomplete="off"
		use:enhance={() => {
			return async ({ result }) => {
				if (result.type === 'success') {
					playSound();
					toggleModal('none');
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
