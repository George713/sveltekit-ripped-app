<script lang="ts">
	interface Props {
		size: 'small' | 'big';
	}
	let { size }: Props = $props();
</script>

{#if size === 'small'}
	<svg width="19" height="23" viewBox="0 0 19 23" fill="none" xmlns="http://www.w3.org/2000/svg">
		<g filter="url(#filter0_d_1619_3924)">
			<path
				d="M10.1937 9.42386H14.6363L5.58658 18.5588L7.23199 11.9152H3.94116L6.40928 4.44116H12.1682L11.181 6.93251"
				stroke="#FBBF24"
				stroke-width="1.2"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
		</g>
		<defs>
			<filter
				id="filter0_d_1619_3924"
				x="0.341064"
				y="0.841064"
				width="17.8953"
				height="21.3179"
				filterUnits="userSpaceOnUse"
				color-interpolation-filters="sRGB"
			>
				<feFlood flood-opacity="0" result="BackgroundImageFix" />
				<feColorMatrix
					in="SourceAlpha"
					type="matrix"
					values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
					result="hardAlpha"
				/>
				<feOffset />
				<feGaussianBlur stdDeviation="1.5" />
				<feColorMatrix
					type="matrix"
					values="0 0 0 0 0.984314 0 0 0 0 0.74902 0 0 0 0 0.141176 0 0 0 1 0"
				/>
				<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1619_3924" />
				<feBlend
					mode="normal"
					in="SourceGraphic"
					in2="effect1_dropShadow_1619_3924"
					result="shape"
				/>
			</filter>
		</defs>
	</svg>
{:else}
	<svg width="29" height="35" viewBox="0 0 29 35" fill="none" xmlns="http://www.w3.org/2000/svg">
		<g filter="url(#filter0_d_1389_1826)">
			<path
				d="M15.958 13.5294H24.4545L7.14685 31L10.2937 18.2941H4L8.72028 4H19.7343L17.8462 8.76471"
				stroke="#FBBF24"
				stroke-width="1.68"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
		</g>
		<defs>
			<filter
				id="filter0_d_1389_1826"
				x="0.159912"
				y="0.159912"
				width="28.1348"
				height="34.6802"
				filterUnits="userSpaceOnUse"
				color-interpolation-filters="sRGB"
			>
				<feFlood flood-opacity="0" result="BackgroundImageFix" />
				<feColorMatrix
					in="SourceAlpha"
					type="matrix"
					values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
					result="hardAlpha"
				/>
				<feOffset />
				<feGaussianBlur stdDeviation="1.5" />
				<feColorMatrix
					type="matrix"
					values="0 0 0 0 0.984314 0 0 0 0 0.74902 0 0 0 0 0.141176 0 0 0 1 0"
				/>
				<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1389_1826" />
				<feBlend
					mode="normal"
					in="SourceGraphic"
					in2="effect1_dropShadow_1389_1826"
					result="shape"
				/>
			</filter>
		</defs>
	</svg>
{/if}
