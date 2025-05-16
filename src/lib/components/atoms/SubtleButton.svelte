<script lang="ts">
	interface Props {
		text: string;
		onclick?: () => void;
	}
	let { text, onclick }: Props = $props();
</script>

<button class="mr-1 text-[10px] font-medium text-stone-500" {onclick}>{text}</button>
