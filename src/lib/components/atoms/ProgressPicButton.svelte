<script lang="ts">
	import { page } from '$app/stores';

	export let uploadToS3: (e: any) => void;
	export let fileinput: any;
</script>

<input
	type="file"
	bind:this={fileinput}
	style="display:none"
	accept=".jpg, .jpeg, .png"
	on:change={(e) => uploadToS3(e)}
/>
<button
	class="h-14 w-14 bg-gray-300 mx-4 rounded shadow text-[20px] font-bold text-neutral-600 border border-gray-400/10 disabled:bg-gray-200 disabled:text-neutral-400"
	on:click={() => fileinput.click()}
	disabled={$page.data.dailyProgress.weeklyPic}
>
	P
</button>
