<script lang="ts">
	interface Props {
		text: string;
	}
	let { text }: Props = $props();
</script>

<p class="font-bold text-indigo-600">{text}</p>
