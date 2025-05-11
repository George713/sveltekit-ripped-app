<script lang="ts">
	interface Props {
		text: string;
		smallText?: boolean;
		onclick?: () => void;
		isRotated?: boolean;
		isHighlighted?: boolean;
	}

	const {
		text,
		smallText = false,
		onclick,
		isRotated = false,
		isHighlighted = false
	}: Props = $props();
</script>

<button class="flex flex-col items-center" {onclick}>
	<p
		class={{
			'flex w-full justify-center font-medium text-stone-200/60': true,
			'text-xl': !smallText,
			'text-sm': smallText
		}}
	>
		{text}
	</p>
	<svg
		width="70"
		height="70"
		viewBox="-3 -3 76 76"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		class="opacity-80 transition-transform duration-2500 ease-in-out"
		class:rotate-90={isRotated}
	>
		<defs>
			<linearGradient id="shineGradient" x1="-100%" y1="-100%" x2="100%" y2="100%">
				<stop offset="-50%" stop-color="rgba(238, 238, 238, 0.01)" />
				<stop offset="0%" stop-color="rgba(238, 238, 238, 0.01)" />
				<stop offset="50%" stop-color="rgba(245, 245, 245, 0.2)" />
				<stop offset="100%" stop-color="rgba(238, 238, 238, 0.01)" />
				<stop offset="150%" stop-color="rgba(238, 238, 238, 0.01)" />
				<animate
					attributeName="x1"
					values="-100%;100%"
					dur="3.0s"
					begin="0s"
					repeatCount="indefinite"
					keyTimes="0;1"
					keySplines="0.1 0.8 0.9 1"
					calcMode="spline"
				/>
				<animate
					attributeName="y1"
					values="-100%;100%"
					dur="3.0s"
					begin="0s"
					repeatCount="indefinite"
					keyTimes="0;1"
					keySplines="0.1 0.8 0.9 1"
					calcMode="spline"
				/>
				<animate
					attributeName="x2"
					values="0%;200%"
					dur="3.0s"
					begin="0s"
					repeatCount="indefinite"
					keyTimes="0;1"
					keySplines="0.1 0.8 0.9 1"
					calcMode="spline"
				/>
				<animate
					attributeName="y2"
					values="0%;200%"
					dur="3.0s"
					begin="0s"
					repeatCount="indefinite"
					keyTimes="0;1"
					keySplines="0.1 0.8 0.9 1"
					calcMode="spline"
				/>
			</linearGradient>
		</defs>
		<g style="mix-blend-mode:color-dodge" filter="url(#filter0_ii_1486_1790)">
			<circle cx="35" cy="35" r="34.5" class="fill-stone-700 stroke-stone-600" />
			<circle
				cx="35"
				cy="35"
				r="34.5"
				fill="url(#shineGradient)"
				opacity="0.5"
				class={{ hidden: !isHighlighted }}
			/>
			<circle cx="35" cy="35" r="31.5" class="stroke-stone-600" />
			<circle cx="35" cy="35" r="28.5" class="stroke-stone-600" />
			<circle cx="35" cy="35" r="25.5" class="stroke-stone-600" />
			<circle cx="35" cy="35" r="25.5" class="stroke-stone-600" />
			<circle cx="35" cy="35" r="22.5" class="stroke-stone-600" />
		</g>
		<g style="mix-blend-mode:color-dodge" filter="url(#filter1_ii_1486_1790)">
			<circle cx="35" cy="35" r="22" class="fill-stone-700" />
			<circle
				cx="35"
				cy="35"
				r="22"
				fill="url(#shineGradient)"
				opacity="0.5"
				class={{ hidden: !isHighlighted }}
			/>
			<circle cx="35" cy="35" r="18.5" class="stroke-stone-600" />
			<circle cx="35" cy="35" r="15.5" class="stroke-stone-600" />
			<circle cx="35" cy="35" r="12.5" class="stroke-stone-600" />
			<circle cx="35" cy="35" r="9.5" class="stroke-stone-600" />
			<circle cx="35" cy="35" r="6.5" class="stroke-stone-600" />
		</g>
		<path
			fill-rule="evenodd"
			clip-rule="evenodd"
			d="M33.9464 18C32.3192 18 31 19.3058 31 20.9167V37.0417C31 37.2996 31.1035 37.5469 31.2877 37.7292L34.2341 40.6459C34.6176 41.0255 34.6176 41.6411 34.2341 42.0208L31.2877 44.9375C31.1035 45.1197 31 45.3671 31 45.6249V50.0833C31 51.6942 32.3192 53 33.9464 53H35.9107C37.538 53 38.8571 51.6942 38.8571 50.0833V33.9583C38.8571 33.7004 38.7537 33.4531 38.5695 33.2708L35.6231 30.3541C35.2395 29.9745 35.2395 29.3589 35.6231 28.9792L38.5695 26.0625C38.7537 25.8802 38.8571 25.6329 38.8571 25.3751V20.9167C38.8571 19.3058 37.538 18 35.9107 18H33.9464Z"
			fill="black"
			fill-opacity="0.6"
		/>
		<defs>
			<filter
				id="filter0_ii_1486_1790"
				x="0"
				y="-2"
				width="70"
				height="74"
				filterUnits="userSpaceOnUse"
				color-interpolation-filters="sRGB"
			>
				<feFlood flood-opacity="0" result="BackgroundImageFix" />
				<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
				<feColorMatrix
					in="SourceAlpha"
					type="matrix"
					values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
					result="hardAlpha"
				/>
				<feOffset dy="2" />
				<feGaussianBlur stdDeviation="2" />
				<feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
				<feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.1 0" />
				<feBlend mode="normal" in2="shape" result="effect1_innerShadow_1486_1790" />
				<feColorMatrix
					in="SourceAlpha"
					type="matrix"
					values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
					result="hardAlpha"
				/>
				<feOffset dy="-2" />
				<feGaussianBlur stdDeviation="2" />
				<feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
				<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.3 0" />
				<feBlend
					mode="normal"
					in2="effect1_innerShadow_1486_1790"
					result="effect2_innerShadow_1486_1790"
				/>
			</filter>
			<filter
				id="filter1_ii_1486_1790"
				x="12"
				y="11"
				width="45"
				height="48"
				filterUnits="userSpaceOnUse"
				color-interpolation-filters="sRGB"
			>
				<feFlood flood-opacity="0" result="BackgroundImageFix" />
				<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
				<feColorMatrix
					in="SourceAlpha"
					type="matrix"
					values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
					result="hardAlpha"
				/>
				<feOffset dx="-1" dy="-2" />
				<feGaussianBlur stdDeviation="1.25" />
				<feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
				<feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.1 0" />
				<feBlend mode="normal" in2="shape" result="effect1_innerShadow_1486_1790" />
				<feColorMatrix
					in="SourceAlpha"
					type="matrix"
					values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
					result="hardAlpha"
				/>
				<feOffset dy="2" />
				<feGaussianBlur stdDeviation="3.5" />
				<feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
				<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.66 0" />
				<feBlend
					mode="normal"
					in2="effect1_innerShadow_1486_1790"
					result="effect2_innerShadow_1486_1790"
				/>
			</filter>
		</defs>
	</svg>
</button>
