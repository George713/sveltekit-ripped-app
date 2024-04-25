<script lang="ts">
	import { enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import { createEventDispatcher } from 'svelte';
	import { visibleView } from '$lib/stores';

	import ModalSkeleton from '$molecules/ModalSkeleton.svelte';

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

<ModalSkeleton>
	<form
		action="?/logWeight"
		method="post"
		autocomplete="off"
		use:enhance={() => {
			return async ({ result }) => {
				if (result.type === 'success') {
					playSound();
					visibleView.update('none');
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
