<script lang="ts">
	interface Props {
		disabled?: boolean;
		onclick?: () => void;
		direction?: 'up' | 'down' | 'left' | 'right';
		scale?: number;
	}

	let { disabled = false, onclick, direction = 'right', scale = 1 }: Props = $props();
</script>

<button {onclick} aria-label="Arrow" {disabled} type="button">
	<svg
		width="10"
		height="19"
		viewBox="0 0 10 19"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		class={{
			'transition-transform duration-200': true,
			'rotate-0': direction == 'right',
			'scale-x-55 rotate-90': direction == 'down',
			'rotate-180': direction == 'left',
			'scale-x-55 rotate-270': direction == 'up',
			'scale-[0.75]': scale == 0.75,
			'scale-[1]': scale == 1
		}}
	>
		<path
			d="M1.75 17L7.70707 9.93007C8.02077 9.55777 8.02077 9.01366 7.70707 8.64136L1.75 1.57143"
			class={{
				'transition-colors duration-1000': true,
				'stroke-stone-400': !disabled,
				'stroke-stone-700': disabled
			}}
			stroke-width="3"
			stroke-linecap="round"
		/>
	</svg>
</button>
