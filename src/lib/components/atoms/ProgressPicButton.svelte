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
	class="mx-4 h-14 w-14 rounded border border-gray-400/10 bg-gray-300 text-[20px] font-bold text-neutral-600 shadow disabled:bg-gray-200 disabled:text-neutral-400"
	on:click={() => fileinput.click()}
	disabled={$page.data.dailyProgress.weeklyPic}
>
	P
</button>
