<script lang="ts">
	interface Props {
		href: string;
		text: string;
	}

	const { href, text }: Props = $props();
</script>

<a class="absolute right-1 p-2 text-stone-600" {href}>{text}</a>
