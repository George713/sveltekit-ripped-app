<!-- 
	=========
	Main Page
	=========

	Displays status badge and controls for daily desired actions, i.e.
		- input weight measurement,
		- plan meals for the day,
		- track meals,
		- eat target calories,
		- eat target protein or more.
	Once a week the desired action of taking a photo is possible.
	Once a month the desired action of entering a body fat measurement is possible.
	
	During onboarding the design differs and 3 desired actions are given:
		- enter current weight
		- enter current body fat percentage
		- upload progress picture

 -->
<script lang="ts">
	import { page } from '$app/stores';
	import { invalidateAll } from '$app/navigation';
	import { modalWeight, modalBodyFat } from '$lib/stores';
	import ModalWeight from './ModalWeight.svelte';
	import ModalBodyFat from './ModalBodyFat.svelte';

	let showModalWeight: boolean;
	let showModalBodyFat: boolean;
	let fileinput: any;

	modalWeight.subscribe((value) => {
		showModalWeight = value;
	});

	modalBodyFat.subscribe((value) => {
		showModalBodyFat = value;
	});

	const uploadToS3 = async (e: any) => {
		// Get picture
		const progressPicture = e.target.files[0];

		// catch if no image is in formData
		if (progressPicture.name == '') {
			return null;
		}

		// Get presigned URL
		const response = await fetch('/api/getPresignedURL', {
			method: 'POST',
			body: new FormData()
		});
		const presignedURL = (await response.json()).url;
		await fetch(presignedURL, {
			method: 'PUT',
			body: progressPicture
		});

		// Reload page data (so photo button is disabled)
		invalidateAll();
	};
</script>

<h1 class="flex py-3 justify-center text-2xl font-black">/home</h1>

{#if $page.data.user}
	<div class="border border-gray-500 shadow-md">
		<!-- ONBOARDING -->
		{#if !$page.data.user.initWeight || !$page.data.user.initBF || !$page.data.user.initPhoto}
			<!-- Badge symbol -->
			<svg
				class="block m-auto my-2 fill-stone-200"
				width="333"
				height="189"
				viewBox="0 0 333 189"
				xmlns="http://www.w3.org/2000/svg"
			>
				<g filter="url(#filter0_ii_170_147)">
					<path
						d="M165.5 0.577398C166.119 0.220132 166.881 0.220131 167.5 0.577397L247.339 46.6727C247.958 47.03 248.339 47.6902 248.339 48.4047V140.595C248.339 141.31 247.958 141.97 247.339 142.327L167.5 188.423C166.881 188.78 166.119 188.78 165.5 188.423L85.6606 142.327C85.0418 141.97 84.6606 141.31 84.6606 140.595V48.4047C84.6606 47.6902 85.0418 47.03 85.6606 46.6727L165.5 0.577398Z"
					/>
					<path
						d="M74.9997 139.731L153.033 184.768C154.806 185.791 154.08 188.5 152.034 188.5H135.431C135.147 188.5 134.866 188.439 134.607 188.322L73.1757 160.532C72.4599 160.208 72 159.495 72 158.71V141.464C72 139.924 73.6664 138.962 74.9997 139.731Z"
					/>
					<path
						d="M70.3232 161.775L121.035 184.677C122.998 185.564 122.366 188.5 120.212 188.5H115.795C115.6 188.5 115.405 188.471 115.217 188.415L68.9216 174.43C68.0775 174.175 67.5 173.397 67.5 172.515V163.598C67.5 162.145 68.9994 161.177 70.3232 161.775Z"
					/>
					<path
						d="M257.5 139.731L179.467 184.768C177.694 185.791 178.42 188.5 180.466 188.5H197.069C197.353 188.5 197.634 188.439 197.893 188.322L259.324 160.532C260.04 160.208 260.5 159.495 260.5 158.71V141.464C260.5 139.924 258.834 138.962 257.5 139.731Z"
					/>
					<path
						d="M262.177 161.775L211.465 184.677C209.502 185.564 210.134 188.5 212.288 188.5H216.705C216.9 188.5 217.095 188.471 217.283 188.415L263.578 174.43C264.422 174.175 265 173.397 265 172.515V163.598C265 162.145 263.501 161.177 262.177 161.775Z"
					/>
					<path
						d="M251.5 128.212V65.2165C251.5 63.8684 252.807 62.9064 254.094 63.3067L330.846 87.1746C332.151 87.5804 332.673 89.1462 331.874 90.2544L312.099 117.67C311.723 118.191 311.102 118.5 310.46 118.501C270.212 118.603 255.42 124.577 252.155 128.401C252.007 128.575 251.5 128.44 251.5 128.212Z"
					/>
					<path
						d="M81 128.212V65.2165C81 63.8684 79.6934 62.9064 78.4061 63.3067L1.65427 87.1746C0.349419 87.5804 -0.173294 89.1462 0.626114 90.2544L20.4013 117.67C20.7773 118.191 21.3978 118.5 22.0404 118.501C62.2881 118.603 77.0799 124.577 80.3447 128.401C80.493 128.575 81 128.44 81 128.212Z"
					/>
				</g>
				<defs>
					<filter
						id="filter0_ii_170_147"
						x="0.247096"
						y="-0.690552"
						width="332.006"
						height="191.381"
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
						<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
						<feBlend mode="normal" in2="shape" result="effect1_innerShadow_170_147" />
						<feColorMatrix
							in="SourceAlpha"
							type="matrix"
							values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
							result="hardAlpha"
						/>
						<feOffset dy="-1" />
						<feGaussianBlur stdDeviation="0.5" />
						<feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
						<feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.1 0" />
						<feBlend
							mode="normal"
							in2="effect1_innerShadow_170_147"
							result="effect2_innerShadow_170_147"
						/>
					</filter>
				</defs>modalWeight
			</svg>

			<!-- Desired Action Buttons -->
			<div class="flex justify-center">
				<!-- Weight input -->
				<button
					on:click={() => {
						modalWeight.set(true);
					}}
					disabled={$page.data.user.initWeight}
					class="px-2 py-1 bg-gray-300 m-1 disabled:bg-slate-600">Weight</button
				>
				<!-- Photo input -->
				<input
					type="file"
					bind:this={fileinput}
					style="display:none"
					accept=".jpg, .jpeg, .png"
					on:change={(e) => uploadToS3(e)}
				/>
				<button
					on:click={() => fileinput.click()}
					disabled={$page.data.user.initPhoto}
					class="px-2 py-1 bg-gray-300 m-1 disabled:bg-slate-600">Photo</button
				>
				<!-- BodyFat input -->
				<button
					on:click={() => modalBodyFat.set(true)}
					disabled={$page.data.user.initBF}
					class="px-2 py-1 bg-gray-300 m-1 disabled:bg-slate-600">BF%</button
				>
			</div>
			<!-- SCAFFOLDING -->
		{:else if 15 < $page.data.user.currentBF && $page.data.user.currentBF < 20}
			<svg
				class="block m-auto my-2 fill-stone-200"
				width="344"
				height="200"
				viewBox="0 0 344 200"
				xmlns="http://www.w3.org/2000/svg"
			>
				<g filter="url(#filter0_dddd_64_10)">
					<path
						d="M171 12.5773C171.619 12.2201 172.381 12.2201 173 12.5774L246.344 54.9226C246.963 55.2799 247.344 55.9402 247.344 56.6547V141.345C247.344 142.06 246.963 142.72 246.344 143.077L173 185.423C172.381 185.78 171.619 185.78 171 185.423L97.6558 143.077C97.037 142.72 96.6558 142.06 96.6558 141.345V56.6547C96.6558 55.9402 97.037 55.2799 97.6558 54.9226L171 12.5773Z"
						fill="url(#paint0_linear_64_10)"
					/>
					<path
						d="M171 12.5773C171.619 12.2201 172.381 12.2201 173 12.5774L246.344 54.9226C246.963 55.2799 247.344 55.9402 247.344 56.6547V141.345C247.344 142.06 246.963 142.72 246.344 143.077L173 185.423C172.381 185.78 171.619 185.78 171 185.423L97.6558 143.077C97.037 142.72 96.6558 142.06 96.6558 141.345V56.6547C96.6558 55.9402 97.037 55.2799 97.6558 54.9226L171 12.5773Z"
						fill="url(#paint1_radial_64_10)"
						fill-opacity="0.5"
					/>
					<path
						d="M79.9997 144.731L158.033 189.768C159.806 190.791 159.08 193.5 157.034 193.5H140.431C140.147 193.5 139.866 193.439 139.607 193.322L78.1757 165.532C77.4599 165.208 77 164.495 77 163.71V146.463C77 144.924 78.6664 143.962 79.9997 144.731Z"
						fill="url(#paint2_linear_64_10)"
					/>
					<path
						d="M75.3232 166.775L126.035 189.677C127.998 190.564 127.366 193.5 125.212 193.5H120.795C120.6 193.5 120.405 193.471 120.217 193.415L73.9216 179.429C73.0775 179.174 72.5 178.397 72.5 177.515V168.598C72.5 167.145 73.9994 166.177 75.3232 166.775Z"
						fill="url(#paint3_linear_64_10)"
					/>
					<path
						d="M262.5 144.731L184.467 189.768C182.694 190.791 183.42 193.5 185.466 193.5H202.069C202.353 193.5 202.634 193.439 202.893 193.322L264.324 165.532C265.04 165.208 265.5 164.495 265.5 163.71V146.463C265.5 144.924 263.834 143.962 262.5 144.731Z"
						fill="url(#paint4_linear_64_10)"
					/>
					<path
						d="M267.177 166.775L216.465 189.677C214.502 190.564 215.134 193.5 217.288 193.5H221.705C221.9 193.5 222.095 193.471 222.283 193.415L268.578 179.429C269.422 179.174 270 178.397 270 177.515V168.598C270 167.145 268.501 166.177 267.177 166.775Z"
						fill="url(#paint5_linear_64_10)"
					/>
					<path
						d="M256.5 133.212V70.2164C256.5 68.8683 257.807 67.9063 259.094 68.3066L335.846 92.1746C337.151 92.5804 337.673 94.1461 336.874 95.2544L317.099 122.67C316.723 123.191 316.102 123.5 315.46 123.501C275.212 123.603 260.42 129.577 257.155 133.401C257.007 133.575 256.5 133.44 256.5 133.212Z"
						fill="url(#paint6_linear_64_10)"
					/>
					<path
						d="M86 133.212V70.2164C86 68.8683 84.6934 67.9063 83.4061 68.3066L6.65427 92.1746C5.34942 92.5804 4.82671 94.1461 5.62611 95.2544L25.4013 122.67C25.7773 123.191 26.3978 123.5 27.0404 123.501C67.2881 123.603 82.0799 129.577 85.3447 133.401C85.493 133.575 86 133.44 86 133.212Z"
						fill="url(#paint7_linear_64_10)"
					/>
					<g filter="url(#filter1_dd_64_10)">
						<path
							d="M113.215 125.713L148.684 136.257C148.886 136.318 149.032 136.063 148.877 135.919L113.341 102.784C113.021 102.486 112.5 102.713 112.5 103.15V124.754C112.5 125.197 112.791 125.586 113.215 125.713Z"
							fill="url(#paint8_linear_64_10)"
						/>
					</g>
					<g filter="url(#filter2_dd_64_10)">
						<path
							d="M228.785 125.713L193.316 136.257C193.114 136.318 192.968 136.063 193.123 135.919L228.659 102.784C228.979 102.486 229.5 102.713 229.5 103.15V124.754C229.5 125.197 229.209 125.586 228.785 125.713Z"
							fill="url(#paint9_linear_64_10)"
						/>
					</g>
					<g filter="url(#filter3_dd_64_10)">
						<path
							d="M170.255 164.861L112.753 132.144C112.596 132.055 112.5 131.889 112.5 131.709V128.668C112.5 128.334 112.82 128.094 113.141 128.188L170.361 144.959C170.452 144.986 170.548 144.986 170.64 144.96L228.862 128.184C229.181 128.092 229.5 128.332 229.5 128.664V131.707C229.5 131.888 229.402 132.055 229.244 132.143L170.746 164.862C170.593 164.948 170.407 164.947 170.255 164.861Z"
							fill="url(#paint10_linear_64_10)"
						/>
					</g>
					<g filter="url(#filter4_ddif_64_10)">
						<path
							fill-rule="evenodd"
							clip-rule="evenodd"
							d="M209.256 82.4401L186.206 89.1939L180.935 100.44L180.767 107.351C183.303 107.828 183.938 109.964 183.795 111.648L175.696 111.554L170.476 101.313L171.099 93.6044L153.929 98.6745L148.852 107.332C153.213 108.796 151.593 112 151.593 112L141.7 111.95L138 101.269C138 101.269 142.691 85.3992 144.317 79.7637C146.84 70.9051 152.976 65.0057 163.436 65.3764C172.93 65.6968 185.153 66.746 190.797 67.1795C192.865 61.5251 197.17 63.2466 197.17 63.2466L197.743 67.9209C202.521 68.9449 205.032 71.1816 205.337 74.348L211 75.6925L209.256 82.4401ZM163.598 99.1457L163.131 106.584C165.542 106.829 167.087 109.298 167.087 111.774H156.627L153.244 105.051L155.798 101.458L163.598 99.1457ZM195.507 100.402C197.768 103.851 193.189 109.745 193.189 109.745L191.526 109.047C191.526 109.047 192.292 104.404 189.146 103.116C186 101.828 184.617 101.087 184.617 101.087L189.806 91.663C189.806 91.663 194.111 98.2975 195.507 100.427V100.402Z"
							fill="url(#paint11_radial_64_10)"
						/>
					</g>
					<g filter="url(#filter5_d_64_10)">
						<path
							fill-rule="evenodd"
							clip-rule="evenodd"
							d="M172.5 5.57735C171.881 5.22009 171.119 5.22009 170.5 5.57735L90.6606 51.6726C90.0418 52.0299 89.6606 52.6902 89.6606 53.4047V145.595C89.6606 146.31 90.0418 146.97 90.6606 147.327L170.5 193.423C171.119 193.78 171.881 193.78 172.5 193.423L252.339 147.327C252.958 146.97 253.339 146.31 253.339 145.595V53.4047C253.339 52.6902 252.958 52.0299 252.339 51.6726L172.5 5.57735ZM172 29.5774C171.381 29.2201 170.619 29.2201 170 29.5774L111.378 63.4227C110.759 63.7799 110.378 64.4402 110.378 65.1547V132.845C110.378 133.56 110.759 134.22 111.378 134.577L170 168.423C170.619 168.78 171.381 168.78 172 168.423L230.622 134.577C231.241 134.22 231.622 133.56 231.622 132.845V65.1547C231.622 64.4402 231.241 63.7799 230.622 63.4227L172 29.5774Z"
							fill="url(#paint12_linear_64_10)"
						/>
					</g>
				</g>
				<defs>
					<filter
						id="filter0_dddd_64_10"
						x="0.24707"
						y="0.309402"
						width="343.006"
						height="199.381"
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
						<feOffset dx="-1" dy="-1" />
						<feGaussianBlur stdDeviation="0.5" />
						<feComposite in2="hardAlpha" operator="out" />
						<feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.2 0" />
						<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_64_10" />
						<feColorMatrix
							in="SourceAlpha"
							type="matrix"
							values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
							result="hardAlpha"
						/>
						<feOffset dx="-1" dy="-1" />
						<feGaussianBlur stdDeviation="2" />
						<feComposite in2="hardAlpha" operator="out" />
						<feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.08 0" />
						<feBlend
							mode="normal"
							in2="effect1_dropShadow_64_10"
							result="effect2_dropShadow_64_10"
						/>
						<feColorMatrix
							in="SourceAlpha"
							type="matrix"
							values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
							result="hardAlpha"
						/>
						<feOffset dx="2" dy="2" />
						<feGaussianBlur stdDeviation="2" />
						<feComposite in2="hardAlpha" operator="out" />
						<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
						<feBlend
							mode="normal"
							in2="effect2_dropShadow_64_10"
							result="effect3_dropShadow_64_10"
						/>
						<feColorMatrix
							in="SourceAlpha"
							type="matrix"
							values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
							result="hardAlpha"
						/>
						<feOffset dx="1" dy="1" />
						<feGaussianBlur stdDeviation="0.5" />
						<feComposite in2="hardAlpha" operator="out" />
						<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.29 0" />
						<feBlend
							mode="normal"
							in2="effect3_dropShadow_64_10"
							result="effect4_dropShadow_64_10"
						/>
						<feBlend
							mode="normal"
							in="SourceGraphic"
							in2="effect4_dropShadow_64_10"
							result="shape"
						/>
					</filter>
					<filter
						id="filter1_dd_64_10"
						x="109.5"
						y="99.6489"
						width="45.442"
						height="42.6176"
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
						<feOffset dx="2" dy="2" />
						<feGaussianBlur stdDeviation="2" />
						<feComposite in2="hardAlpha" operator="out" />
						<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
						<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_64_10" />
						<feColorMatrix
							in="SourceAlpha"
							type="matrix"
							values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
							result="hardAlpha"
						/>
						<feOffset dx="-1" dy="-1" />
						<feGaussianBlur stdDeviation="1" />
						<feComposite in2="hardAlpha" operator="out" />
						<feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.06 0" />
						<feBlend
							mode="normal"
							in2="effect1_dropShadow_64_10"
							result="effect2_dropShadow_64_10"
						/>
						<feBlend
							mode="normal"
							in="SourceGraphic"
							in2="effect2_dropShadow_64_10"
							result="shape"
						/>
					</filter>
					<filter
						id="filter2_dd_64_10"
						x="190.058"
						y="99.6489"
						width="45.442"
						height="42.6176"
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
						<feOffset dx="2" dy="2" />
						<feGaussianBlur stdDeviation="2" />
						<feComposite in2="hardAlpha" operator="out" />
						<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
						<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_64_10" />
						<feColorMatrix
							in="SourceAlpha"
							type="matrix"
							values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
							result="hardAlpha"
						/>
						<feOffset dx="-1" dy="-1" />
						<feGaussianBlur stdDeviation="1" />
						<feComposite in2="hardAlpha" operator="out" />
						<feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.06 0" />
						<feBlend
							mode="normal"
							in2="effect1_dropShadow_64_10"
							result="effect2_dropShadow_64_10"
						/>
						<feBlend
							mode="normal"
							in="SourceGraphic"
							in2="effect2_dropShadow_64_10"
							result="shape"
						/>
					</filter>
					<filter
						id="filter3_dd_64_10"
						x="109.5"
						y="125.164"
						width="126"
						height="45.7618"
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
						<feOffset dx="2" dy="2" />
						<feGaussianBlur stdDeviation="2" />
						<feComposite in2="hardAlpha" operator="out" />
						<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
						<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_64_10" />
						<feColorMatrix
							in="SourceAlpha"
							type="matrix"
							values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
							result="hardAlpha"
						/>
						<feOffset dx="-1" dy="-1" />
						<feGaussianBlur stdDeviation="1" />
						<feComposite in2="hardAlpha" operator="out" />
						<feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.06 0" />
						<feBlend
							mode="normal"
							in2="effect1_dropShadow_64_10"
							result="effect2_dropShadow_64_10"
						/>
						<feBlend
							mode="normal"
							in="SourceGraphic"
							in2="effect2_dropShadow_64_10"
							result="shape"
						/>
					</filter>
					<filter
						id="filter4_ddif_64_10"
						x="134"
						y="61"
						width="81"
						height="59"
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
						<feOffset dy="4" />
						<feGaussianBlur stdDeviation="2" />
						<feComposite in2="hardAlpha" operator="out" />
						<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
						<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_64_10" />
						<feColorMatrix
							in="SourceAlpha"
							type="matrix"
							values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
							result="hardAlpha"
						/>
						<feOffset dx="-1" dy="-1" />
						<feGaussianBlur stdDeviation="0.5" />
						<feComposite in2="hardAlpha" operator="out" />
						<feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.08 0" />
						<feBlend
							mode="normal"
							in2="effect1_dropShadow_64_10"
							result="effect2_dropShadow_64_10"
						/>
						<feBlend
							mode="normal"
							in="SourceGraphic"
							in2="effect2_dropShadow_64_10"
							result="shape"
						/>
						<feColorMatrix
							in="SourceAlpha"
							type="matrix"
							values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
							result="hardAlpha"
						/>
						<feOffset dx="2" dy="2" />
						<feGaussianBlur stdDeviation="2" />
						<feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
						<feColorMatrix
							type="matrix"
							values="0 0 0 0 0.0583333 0 0 0 0 0.0583333 0 0 0 0 0.0583333 0 0 0 0.09 0"
						/>
						<feBlend mode="normal" in2="shape" result="effect3_innerShadow_64_10" />
						<feGaussianBlur stdDeviation="0.5" result="effect4_foregroundBlur_64_10" />
					</filter>
					<filter
						id="filter5_d_64_10"
						x="87.6606"
						y="5.3094"
						width="167.679"
						height="192.381"
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
						<feOffset dy="2" />
						<feGaussianBlur stdDeviation="1" />
						<feComposite in2="hardAlpha" operator="out" />
						<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.22 0" />
						<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_64_10" />
						<feBlend
							mode="normal"
							in="SourceGraphic"
							in2="effect1_dropShadow_64_10"
							result="shape"
						/>
					</filter>
					<linearGradient
						id="paint0_linear_64_10"
						x1="144.381"
						y1="51.5873"
						x2="203.113"
						y2="149.291"
						gradientUnits="userSpaceOnUse"
					>
						<stop stop-color="#C0A68F" />
						<stop offset="0.231527" stop-color="#DDC1A7" />
						<stop offset="0.526042" stop-color="#D2BCA8" />
						<stop offset="0.75" stop-color="#B99D84" />
						<stop offset="1" stop-color="#8F7D6C" />
					</linearGradient>
					<radialGradient
						id="paint1_radial_64_10"
						cx="0"
						cy="0"
						r="1"
						gradientUnits="userSpaceOnUse"
						gradientTransform="translate(151.286 79.2063) rotate(49.1446) scale(45.0359)"
					>
						<stop stop-color="white" />
						<stop offset="1" stop-color="white" stop-opacity="0" />
					</radialGradient>
					<linearGradient
						id="paint2_linear_64_10"
						x1="121.077"
						y1="144.336"
						x2="119.985"
						y2="194.835"
						gradientUnits="userSpaceOnUse"
					>
						<stop stop-color="#C6864C" />
						<stop offset="0.296875" stop-color="#BA7535" />
						<stop offset="0.526042" stop-color="#9B6E44" />
						<stop offset="0.75" stop-color="#95663A" />
						<stop offset="1" stop-color="#6C4521" />
					</linearGradient>
					<linearGradient
						id="paint3_linear_64_10"
						x1="103.732"
						y1="166.241"
						x2="103.258"
						y2="194.245"
						gradientUnits="userSpaceOnUse"
					>
						<stop stop-color="#C6864C" />
						<stop offset="0.296875" stop-color="#BA7535" />
						<stop offset="0.526042" stop-color="#9B6E44" />
						<stop offset="0.75" stop-color="#95663A" />
						<stop offset="1" stop-color="#6C4521" />
					</linearGradient>
					<linearGradient
						id="paint4_linear_64_10"
						x1="221.423"
						y1="144.336"
						x2="222.515"
						y2="194.835"
						gradientUnits="userSpaceOnUse"
					>
						<stop stop-color="#C6864C" />
						<stop offset="0.296875" stop-color="#BA7535" />
						<stop offset="0.526042" stop-color="#9B6E44" />
						<stop offset="0.75" stop-color="#95663A" />
						<stop offset="1" stop-color="#6C4521" />
					</linearGradient>
					<linearGradient
						id="paint5_linear_64_10"
						x1="238.768"
						y1="166.241"
						x2="239.242"
						y2="194.245"
						gradientUnits="userSpaceOnUse"
					>
						<stop stop-color="#C6864C" />
						<stop offset="0.296875" stop-color="#BA7535" />
						<stop offset="0.526042" stop-color="#9B6E44" />
						<stop offset="0.75" stop-color="#95663A" />
						<stop offset="1" stop-color="#6C4521" />
					</linearGradient>
					<linearGradient
						id="paint6_linear_64_10"
						x1="297.806"
						y1="69.2725"
						x2="295.757"
						y2="136.24"
						gradientUnits="userSpaceOnUse"
					>
						<stop stop-color="#C6864C" />
						<stop offset="0.296875" stop-color="#BA7535" />
						<stop offset="0.526042" stop-color="#9B6E44" />
						<stop offset="0.75" stop-color="#95663A" />
						<stop offset="1" stop-color="#6C4521" />
					</linearGradient>
					<linearGradient
						id="paint7_linear_64_10"
						x1="44.6936"
						y1="69.2725"
						x2="46.7431"
						y2="136.24"
						gradientUnits="userSpaceOnUse"
					>
						<stop stop-color="#C6864C" />
						<stop offset="0.296875" stop-color="#BA7535" />
						<stop offset="0.526042" stop-color="#9B6E44" />
						<stop offset="0.75" stop-color="#95663A" />
						<stop offset="1" stop-color="#6C4521" />
					</linearGradient>
					<linearGradient
						id="paint8_linear_64_10"
						x1="113"
						y1="108.5"
						x2="147.5"
						y2="137"
						gradientUnits="userSpaceOnUse"
					>
						<stop stop-color="#A46731" />
						<stop offset="0.53125" stop-color="#9C6533" />
						<stop offset="1" stop-color="#785332" />
					</linearGradient>
					<linearGradient
						id="paint9_linear_64_10"
						x1="229"
						y1="108.5"
						x2="194.5"
						y2="137"
						gradientUnits="userSpaceOnUse"
					>
						<stop stop-color="#A57142" />
						<stop offset="0.53125" stop-color="#955F2F" />
						<stop offset="1" stop-color="#735336" />
					</linearGradient>
					<linearGradient
						id="paint10_linear_64_10"
						x1="114"
						y1="132.5"
						x2="230"
						y2="134"
						gradientUnits="userSpaceOnUse"
					>
						<stop stop-color="#B0723A" />
						<stop offset="0.260417" stop-color="#9C612C" />
						<stop offset="0.503367" stop-color="#86572D" />
						<stop offset="0.734375" stop-color="#9F6229" />
						<stop offset="1" stop-color="#956337" />
					</linearGradient>
					<radialGradient
						id="paint11_radial_64_10"
						cx="0"
						cy="0"
						r="1"
						gradientUnits="userSpaceOnUse"
						gradientTransform="translate(167.866 83.1611) rotate(58.2121) scale(47.1391 70.5602)"
					>
						<stop stop-color="#C28750" />
						<stop offset="0.828125" stop-color="#7E542C" />
					</radialGradient>
					<linearGradient
						id="paint12_linear_64_10"
						x1="172.206"
						y1="10"
						x2="165.134"
						y2="198.82"
						gradientUnits="userSpaceOnUse"
					>
						<stop stop-color="#C6864C" />
						<stop offset="0.296875" stop-color="#BA7535" />
						<stop offset="0.526042" stop-color="#9B6E44" />
						<stop offset="0.75" stop-color="#95663A" />
						<stop offset="1" stop-color="#6C4521" />
					</linearGradient>
				</defs>
			</svg>
			<p class="flex justify-end mr-4">
				Points: {$page.data.user.pointBalance}
			</p>
		{/if}
	</div>

	{#if showModalWeight}
		<ModalWeight />
	{:else if showModalBodyFat}
		<ModalBodyFat />
	{/if}
{:else}
	<p class="m-3 px-5 flex justify-center">No one here yet...</p>
{/if}
