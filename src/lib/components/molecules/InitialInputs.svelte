<script lang="ts">
	import { page } from '$app/stores';
	import { visibleOverlay, visibleView } from '$lib/stores';

	export let uploadToS3: (e: any, isInitPic: Boolean) => void;
	export let fileinput: any;
</script>

<div class="flex justify-center">
	<!-- Target calorie input -->
	<button
		on:click={() => {
			visibleView.update('calories');
		}}
		disabled={$page.data.user.initCalories}
		class="m-1 bg-gray-300 px-2 py-1 disabled:bg-slate-600">Calories</button
	>
	<!-- Photo input -->
	<input
		type="file"
		bind:this={fileinput}
		style="display:none"
		accept=".jpg, .jpeg, .png"
		on:change={(e) => uploadToS3(e, true)}
	/>
	<button
		on:click={() => fileinput.click()}
		disabled={$page.data.user.initPhoto}
		class="m-1 bg-gray-300 px-2 py-1 disabled:bg-slate-600">Photo</button
	>
	<!-- BodyFat input -->
	<button
		on:click={() => visibleOverlay.set('bodyFat')}
		disabled={$page.data.user.initBF}
		class="m-1 bg-gray-300 px-2 py-1 disabled:bg-slate-600">BF%</button
	>
</div>
