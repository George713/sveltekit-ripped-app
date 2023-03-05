<script lang="ts">
	import { enhance } from '$app/forms';

	import ModalSkeleton from './ModalSkeleton.svelte';

	const init = (el: HTMLElement) => {
		el.focus();
	};
</script>

<ModalSkeleton on:close>
	<form action="?/logWeight" method="post" use:enhance>
		<label for="weight">Current Weight</label>

		<input id="weight" name="weight" type="float" required use:init />
		<button type="submit">Log Weight</button>
	</form>
</ModalSkeleton>
