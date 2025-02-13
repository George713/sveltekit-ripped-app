<script lang="ts">
	interface Props {
		text: string;
	}
	let { text }: Props = $props();
</script>

<button class="mr-1 text-[10px] font-medium text-stone-500">{text}</button>
