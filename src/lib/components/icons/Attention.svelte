<script lang="ts">
	interface Props {
		color: 'amber' | 'rose';
		classAddons?: string;
	}

	let { color, classAddons = '' }: Props = $props();
</script>

<svg
	width="20"
	height="20"
	viewBox="0 0 20 20"
	fill="none"
	class={classAddons}
	xmlns="http://www.w3.org/2000/svg"
>
	<path
		fill-rule="evenodd"
		clip-rule="evenodd"
		d="M11.0695 2.4295C10.6288 1.54786 9.37119 1.54786 8.93049 2.4295L1.89765 16.5006C1.50013 17.2959 2.07826 18.2317 2.96714 18.2317H17.0329C17.9217 18.2317 18.4999 17.2959 18.1024 16.5006L11.0695 2.4295ZM7.34953 1.6387C8.44159 -0.54624 11.5584 -0.54623 12.6505 1.63871L19.6833 15.7098C20.6685 17.6809 19.2357 20 17.0329 20H2.96714C0.764261 20 -0.668489 17.6809 0.316671 15.7098L7.34953 1.6387Z"
		class={{ 'fill-amber-500': color == 'amber', 'fill-rose-700': color == 'rose' }}
	/>
	<path
		d="M10.0078 6V11"
		class={{ 'stroke-amber-500': color == 'amber', 'stroke-rose-700': color == 'rose' }}
		stroke-width="1.7"
		stroke-linecap="round"
	/>
	<path
		d="M10.0078 14V14.5"
		class={{ 'stroke-amber-500': color == 'amber', 'stroke-rose-700': color == 'rose' }}
		stroke-width="1.7"
		stroke-linecap="round"
	/>
</svg>
