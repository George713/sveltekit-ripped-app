<script lang="ts">
	interface Props {
		size: 'small' | 'big';
	}

	let { size }: Props = $props();
</script>

<svg
	class={{
		'fill-none stroke-stone-400': true,
		'size-6': size === 'small',
		'size-8': size === 'big'
	}}
	viewBox="0 0 24 24"
>
	<path
		stroke-linecap="round"
		stroke-linejoin="round"
		stroke-width="1"
		d="M12 7v10m0-5h5M7 12h2.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
	/>
</svg>
