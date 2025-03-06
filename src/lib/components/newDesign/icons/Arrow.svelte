<script lang="ts">
	interface Props {
		disabled?: boolean;
		onclick?: () => void;
	}

	let { disabled = false, onclick }: Props = $props();
</script>

<button {onclick} aria-label="Arrow" {disabled} type="button">
	<svg width="10" height="19" viewBox="0 0 10 19" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path
			d="M1.75 17L7.70707 9.93007C8.02077 9.55777 8.02077 9.01366 7.70707 8.64136L1.75 1.57143"
			class={{ 'stroke-stone-400': !disabled, 'stroke-stone-700': disabled }}
			stroke-width="3"
			stroke-linecap="round"
		/>
	</svg>
</button>
