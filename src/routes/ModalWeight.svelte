<script lang="ts">
	import { enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import { modalWeight } from '$lib/stores';
	import { createEventDispatcher } from 'svelte';

	import ModalSkeleton from './ModalSkeleton.svelte';

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
		use:enhance={() => {
			return async ({ result }) => {
				if (result.type === 'success') {
					playSound();
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
