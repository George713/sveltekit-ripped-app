<script lang="ts">
	import { goto } from '$app/navigation';

	const newDay = () => {
		const formData = new FormData();
		fetch('?/newDay', {
			method: 'POST',
			body: formData
		});
		goto('/');
	};
</script>

<div class="fixed top-0 w-full h-full bg-black bg-opacity-70">
	<button
		on:click={newDay}
		class="absolute bottom-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mx-auto w-36 px-6 py-2 bg-green-400 rounded text-gray-700 font-bold text-xl"
		>Start New Day</button
	>
</div>
