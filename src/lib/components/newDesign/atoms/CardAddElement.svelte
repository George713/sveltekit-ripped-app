<script lang="ts">
	import Plus from '../icons/Plus.svelte';

	interface Props {
		text: string;
		onclick?: () => void;
	}
	let { text, onclick }: Props = $props();
</script>

<!-- Outer Card Frame -->
<button
	class="flex h-[105px] w-[90px] flex-col overflow-visible rounded bg-stone-400 p-[1px] drop-shadow-[2px_2px_2px_rgba(0,0,0,0.3)]"
	{onclick}
>
	<!-- Image Placeholder with plus symbol -->
	<div class="flex h-[62px] w-[88px] rounded bg-stone-500">
		<Plus />
	</div>
	<!-- Label -->
	<p class="m-auto flex items-center justify-center text-[10px] text-stone-700">{text}</p>
</button>
