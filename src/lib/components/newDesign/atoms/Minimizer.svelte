<script lang="ts">
	interface Props {
		onclick?: () => void;
		direction: 'up' | 'down' | 'left' | 'right';
	}

	let { onclick, direction }: Props = $props();
</script>

<button
	aria-label="Return to Main Screen"
	{onclick}
	class="flex size-8 items-center justify-center"
>
	<svg
		width="31"
		height="18"
		class={{
			' fill-none stroke-stone-700': true,
			'rotate-0': direction == 'down',
			'scale-x-60 rotate-90': direction == 'left',
			'rotate-180': direction == 'up',
			'scale-x-60 rotate-270 ': direction == 'right'
		}}
		><path
			stroke-linecap="round"
			stroke-width="3"
			d="m2 2 13.066 6.291a1 1 0 0 0 .868 0L29 2M2 9.5l13.066 6.291a1 1 0 0 0 .868 0L29 9.5"
		/>
	</svg>
</button>
