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
	let audioWeighIn: any;

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

	// EventHandler for playing sounds
	// @ts-ignore
	const handlePlaySound = (event) => {
		switch (event.detail.text) {
			case 'weighIn':
				audioWeighIn.play();
		}
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
			<!-- Badge Symbol -->
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
			<!-- Point Display -->
			<p class="flex justify-end mr-4">
				Points: {$page.data.user.pointBalance}
			</p>
			<!-- PowerUp Section -->
			<svg width="90" height="32" viewBox="0 0 90 32" xmlns="http://www.w3.org/2000/svg">
				<!-- Caption -->
				<path
					d="M2.64 8.47L2.04 8.46H1.58V11H0.91V4.52H2.81C3.16333 4.52 3.46 4.54333 3.7 4.59C3.94667 4.63 4.18333 4.71333 4.41 4.84C4.86333 5.10667 5.09 5.65 5.09 6.47C5.09 7.15667 4.92667 7.66 4.6 7.98C4.46 8.11333 4.27333 8.22 4.04 8.3C3.80667 8.37333 3.59 8.42 3.39 8.44C3.19 8.46 2.94 8.47 2.64 8.47ZM2.24 7.89L3 7.9C3.54 7.9 3.90667 7.81667 4.1 7.65C4.29333 7.47667 4.39 7.09667 4.39 6.51C4.39 5.92333 4.26667 5.54667 4.02 5.38C3.78 5.21333 3.33667 5.13 2.69 5.13H1.58V7.89H2.24ZM8.92945 6.73C8.82945 6.68333 8.70612 6.64333 8.55945 6.61C8.41945 6.57667 8.22279 6.56 7.96945 6.56C7.71612 6.56 7.49279 6.60333 7.29945 6.69C7.11279 6.77 6.97279 6.91 6.87945 7.11C6.79279 7.30333 6.73612 7.50333 6.70945 7.71C6.68279 7.91 6.66945 8.18667 6.66945 8.54C6.66945 9.29333 6.75279 9.81333 6.91945 10.1C7.09279 10.3867 7.46945 10.53 8.04945 10.53C8.36279 10.53 8.61612 10.49 8.80945 10.41C9.00279 10.33 9.14612 10.1967 9.23945 10.01C9.33279 9.81667 9.39279 9.61667 9.41945 9.41C9.44612 9.19667 9.45945 8.94667 9.45945 8.66C9.45945 8.36667 9.45612 8.16 9.44945 8.04C9.44945 7.91333 9.43945 7.77 9.41945 7.61C9.39945 7.44333 9.36945 7.31667 9.32945 7.23C9.29612 7.14333 9.24612 7.05 9.17945 6.95C9.11279 6.85 9.02945 6.77667 8.92945 6.73ZM8.07945 6C8.59945 6 9.00279 6.07 9.28945 6.21C9.57612 6.34333 9.78945 6.59333 9.92945 6.96C10.0695 7.32667 10.1395 7.8 10.1395 8.38C10.1395 8.96 10.0761 9.42333 9.94945 9.77C9.82945 10.1167 9.66612 10.3833 9.45945 10.57C9.05945 10.93 8.59279 11.11 8.05945 11.11C7.27945 11.11 6.73945 10.9267 6.43945 10.56C6.13945 10.1933 5.98945 9.52333 5.98945 8.55C5.98945 8.08333 6.05279 7.67667 6.17945 7.33C6.30612 6.98333 6.47612 6.72 6.68945 6.54C7.10279 6.18 7.56612 6 8.07945 6ZM14.0545 6.08H14.7645L15.8745 9.96L15.9445 10.35H15.9645L16.0345 9.96L17.1645 6.08H17.8645L16.3045 11H15.6145L14.5145 7.26L14.4245 6.78H14.3945L14.3045 7.26L13.1945 11H12.5045L10.9645 6.08H11.6645L12.7745 9.96L12.8345 10.35H12.8645L12.9245 9.96L14.0545 6.08ZM22.4859 7.79C22.4859 8.03 22.4659 8.28 22.4259 8.54H19.2859C19.3126 9.27333 19.4359 9.78 19.6559 10.06C19.8759 10.3333 20.2659 10.47 20.8259 10.47C21.2459 10.47 21.7359 10.38 22.2959 10.2L22.3559 10.7C22.2026 10.76 22.0826 10.8033 21.9959 10.83C21.9159 10.85 21.8293 10.8767 21.7359 10.91C21.6426 10.9367 21.5726 10.9567 21.5259 10.97C21.4793 10.9833 21.4126 11 21.3259 11.02C21.2393 11.04 21.1659 11.0533 21.1059 11.06C20.9259 11.08 20.7726 11.09 20.6459 11.09C20.0193 11.09 19.5259 10.87 19.1659 10.43C18.8059 9.99 18.6259 9.37667 18.6259 8.59C18.6259 8.15667 18.6793 7.77667 18.7859 7.45C18.8926 7.11667 19.0193 6.86333 19.1659 6.69C19.3126 6.51 19.4893 6.36667 19.6959 6.26C20.0026 6.09333 20.3359 6.00333 20.6959 5.99C21.8893 5.99667 22.4859 6.59667 22.4859 7.79ZM21.8559 7.63C21.8559 7.23 21.7559 6.95 21.5559 6.79C21.3559 6.63 21.0593 6.55 20.6659 6.55C20.2726 6.55 19.9493 6.65667 19.6959 6.87C19.4426 7.07667 19.3126 7.46333 19.3059 8.03H21.8259C21.8459 7.87667 21.8559 7.74333 21.8559 7.63ZM25.8378 6C25.9711 6 26.1178 6.02 26.2778 6.06L26.0378 6.65C25.9311 6.63 25.8245 6.62 25.7178 6.62C25.2978 6.62 24.8711 6.85333 24.4378 7.32V11H23.8178V7.36L23.6478 6.14H24.0278L24.0578 6.16L24.2478 6.87C24.5411 6.58333 24.8078 6.36667 25.0478 6.22C25.2878 6.07333 25.5511 6 25.8378 6ZM29.516 11.1C29.5027 11.1 29.456 11.1 29.376 11.1C29.296 11.1 29.216 11.0967 29.136 11.09C29.056 11.09 28.9327 11.0767 28.766 11.05C28.5993 11.03 28.4593 10.9967 28.346 10.95C28.2327 10.8967 28.1027 10.8167 27.956 10.71C27.816 10.6033 27.7027 10.4767 27.616 10.33C27.396 9.97667 27.286 9.52 27.286 8.96V4.52H27.956V8.96C27.976 10.0067 28.496 10.53 29.516 10.53C29.9493 10.53 30.3093 10.4033 30.596 10.15C30.8827 9.89667 31.026 9.51333 31.026 9V4.52H31.676L31.666 8.98C31.666 10.3933 30.9493 11.1 29.516 11.1ZM35.2391 5.99C36.0124 5.99 36.5291 6.23333 36.7891 6.72C36.9157 6.96 37.0024 7.21667 37.0491 7.49C37.0957 7.75667 37.1191 8.10333 37.1191 8.53C37.1191 8.95 37.0624 9.33333 36.9491 9.68C36.8357 10.02 36.7024 10.2767 36.5491 10.45C36.3957 10.6233 36.2191 10.7633 36.0191 10.87C35.7324 11.0233 35.4557 11.1 35.1891 11.1C34.9291 11.1 34.5224 10.9833 33.9691 10.75V13.01H33.3491V7.35L33.1791 6.14H33.5891L33.6191 6.17L33.7991 6.68C34.2324 6.22 34.7124 5.99 35.2391 5.99ZM33.9691 10.32C34.3291 10.4467 34.6791 10.51 35.0191 10.51C35.3657 10.51 35.6224 10.47 35.7891 10.39C35.9624 10.3033 36.0891 10.21 36.1691 10.11C36.2557 10.0033 36.3191 9.84667 36.3591 9.64C36.4057 9.43333 36.4291 9.27 36.4291 9.15C36.4357 9.03 36.4391 8.82667 36.4391 8.54C36.4391 8.24667 36.4324 8.01333 36.4191 7.84C36.4124 7.66 36.3891 7.47667 36.3491 7.29C36.3157 7.09667 36.2591 6.96 36.1791 6.88C35.9791 6.68 35.6824 6.58 35.2891 6.58C34.7291 6.58 34.2891 6.76333 33.9691 7.13V10.32ZM38.256 10.32C38.6693 10.48 39.056 10.56 39.416 10.56C39.776 10.56 40.0827 10.4867 40.336 10.34C40.596 10.1867 40.726 9.98667 40.726 9.74C40.726 9.49333 40.6393 9.29667 40.466 9.15C40.2927 8.99667 40.0827 8.87333 39.836 8.78C39.5893 8.68667 39.3427 8.59 39.096 8.49C38.856 8.38333 38.6493 8.23667 38.476 8.05C38.3027 7.85667 38.216 7.62 38.216 7.34C38.216 6.9 38.3693 6.56333 38.676 6.33C38.9827 6.09 39.366 5.97 39.826 5.97C40.2927 5.97 40.7393 6.04667 41.166 6.2L41.036 6.66C40.7027 6.54667 40.326 6.49 39.906 6.49C39.2127 6.49 38.866 6.76 38.866 7.3C38.866 7.64667 39.166 7.93333 39.766 8.16C40.0193 8.25333 40.2693 8.35667 40.516 8.47C40.7693 8.57667 40.9827 8.73333 41.156 8.94C41.336 9.14667 41.426 9.39667 41.426 9.69C41.426 10.1367 41.2327 10.48 40.846 10.72C40.4593 10.96 40.0127 11.08 39.506 11.08C38.9993 11.08 38.5327 10.99 38.106 10.81L38.256 10.32Z"
					fill="black"
					fill-opacity="0.8"
				/>
				<!-- Symbols -->
				<path
					d="M55.1104 0L48.0132 4.0924L48 12.3014L55.1235 16.3938L62.2207 12.3014L62.2339 4.0924L55.1104 0ZM55.0609 2.00609L56.9033 3.06956V5.19652L55.0609 6.25999L53.2185 5.19652V3.06956L55.0609 2.00609ZM51.3574 4.13198L53.1999 5.19546V7.32241L51.3574 8.38589L53.1998 9.44937V11.5774L51.3574 12.6409L49.515 11.5774V9.44937L51.3574 8.38589L49.515 7.32241V5.19546L51.3574 4.13198H51.3574ZM58.7512 4.13198L60.5936 5.19546V7.32241L58.7513 8.38589L60.5937 9.44937V11.5774L58.7513 12.6409L56.9089 11.5774V9.44937L58.7513 8.38589L56.9089 7.32241V5.19546L58.7512 4.13198ZM55.0609 6.2633L56.9033 7.32677V9.45373L55.0654 10.515L56.9033 11.5752V13.7032L55.0609 14.7667L53.2185 13.7032V11.5752L55.0565 10.515L53.2185 9.45373V7.32677L55.0609 6.2633H55.0609Z"
					fill={$page.data.user.streakMeter >= 1 ? '#0254c7' : '#bdbdbd'}
				/>
				<path
					d="M73.1104 0L66.0132 4.0924L66 12.3014L73.1235 16.3938L80.2207 12.3014L80.2339 4.0924L73.1104 0ZM73.0609 2.00609L74.9033 3.06956V5.19652L73.0609 6.25999L71.2185 5.19652V3.06956L73.0609 2.00609ZM69.3574 4.13198L71.1999 5.19546V7.32241L69.3574 8.38589L71.1998 9.44937V11.5774L69.3574 12.6409L67.515 11.5774V9.44937L69.3574 8.38589L67.515 7.32241V5.19546L69.3574 4.13198H69.3574ZM76.7512 4.13198L78.5936 5.19546V7.32241L76.7513 8.38589L78.5937 9.44937V11.5774L76.7513 12.6409L74.9089 11.5774V9.44937L76.7513 8.38589L74.9089 7.32241V5.19546L76.7512 4.13198ZM73.0609 6.2633L74.9033 7.32677V9.45373L73.0654 10.515L74.9033 11.5752V13.7032L73.0609 14.7667L71.2185 13.7032V11.5752L73.0565 10.515L71.2185 9.45373V7.32677L73.0609 6.2633H73.0609Z"
					fill={$page.data.user.streakMeter >= 2 ? '#0254c7' : '#bdbdbd'}
				/>
				<path
					d="M46.1104 15L39.0132 19.0924L39 27.3014L46.1235 31.3938L53.2207 27.3014L53.2339 19.0924L46.1104 15ZM46.0609 17.0061L47.9033 18.0696V20.1965L46.0609 21.26L44.2185 20.1965V18.0696L46.0609 17.0061ZM42.3574 19.132L44.1999 20.1955V22.3224L42.3574 23.3859L44.1998 24.4494V26.5774L42.3574 27.6409L40.515 26.5774V24.4494L42.3574 23.3859L40.515 22.3224V20.1955L42.3574 19.132H42.3574ZM49.7512 19.132L51.5936 20.1955V22.3224L49.7513 23.3859L51.5937 24.4494V26.5774L49.7513 27.6409L47.9089 26.5774V24.4494L49.7513 23.3859L47.9089 22.3224V20.1955L49.7512 19.132ZM46.0609 21.2633L47.9033 22.3268V24.4537L46.0654 25.515L47.9033 26.5752V28.7032L46.0609 29.7667L44.2185 28.7032V26.5752L46.0565 25.515L44.2185 24.4537V22.3268L46.0609 21.2633H46.0609Z"
					fill={$page.data.user.streakMeter >= 3 ? '#0254c7' : '#bdbdbd'}
				/>
				<path
					d="M64.1104 15L57.0132 19.0924L57 27.3014L64.1235 31.3938L71.2207 27.3014L71.2339 19.0924L64.1104 15ZM64.0609 17.0061L65.9033 18.0696V20.1965L64.0609 21.26L62.2185 20.1965V18.0696L64.0609 17.0061ZM60.3574 19.132L62.1999 20.1955V22.3224L60.3574 23.3859L62.1998 24.4494V26.5774L60.3574 27.6409L58.515 26.5774V24.4494L60.3574 23.3859L58.515 22.3224V20.1955L60.3574 19.132H60.3574ZM67.7512 19.132L69.5936 20.1955V22.3224L67.7513 23.3859L69.5937 24.4494V26.5774L67.7513 27.6409L65.9089 26.5774V24.4494L67.7513 23.3859L65.9089 22.3224V20.1955L67.7512 19.132ZM64.0609 21.2633L65.9033 22.3268V24.4537L64.0654 25.515L65.9033 26.5752V28.7032L64.0609 29.7667L62.2185 28.7032V26.5752L64.0565 25.515L62.2185 24.4537V22.3268L64.0609 21.2633H64.0609Z"
					fill={$page.data.user.streakMeter >= 4 ? '#0254c7' : '#bdbdbd'}
				/>
				<path
					d="M82.1104 15L75.0132 19.0924L75 27.3014L82.1235 31.3938L89.2207 27.3014L89.2339 19.0924L82.1104 15ZM82.0609 17.0061L83.9033 18.0696V20.1965L82.0609 21.26L80.2185 20.1965V18.0696L82.0609 17.0061ZM78.3574 19.132L80.1999 20.1955V22.3224L78.3574 23.3859L80.1998 24.4494V26.5774L78.3574 27.6409L76.515 26.5774V24.4494L78.3574 23.3859L76.515 22.3224V20.1955L78.3574 19.132H78.3574ZM85.7512 19.132L87.5936 20.1955V22.3224L85.7513 23.3859L87.5937 24.4494V26.5774L85.7513 27.6409L83.9089 26.5774V24.4494L85.7513 23.3859L83.9089 22.3224V20.1955L85.7512 19.132ZM82.0609 21.2633L83.9033 22.3268V24.4537L82.0654 25.515L83.9033 26.5752V28.7032L82.0609 29.7667L80.2185 28.7032V26.5752L82.0565 25.515L80.2185 24.4537V22.3268L82.0609 21.2633H82.0609Z"
					fill={$page.data.user.streakMeter >= 5 ? '#0254c7' : '#bdbdbd'}
				/>
			</svg>

			<!-- Desired Action Buttons -->
			<div class="flex justify-center">
				<!-- Weight input -->
				<button
					on:click={() => {
						modalWeight.set(true);
					}}
					class="px-2 py-1 bg-gray-300 m-1 disabled:bg-slate-600"
					disabled={$page.data.dailyProgress.weighIn}
				>
					Weight
				</button>
			</div>
		{/if}
	</div>

	{#if showModalWeight}
		<ModalWeight on:playSound={handlePlaySound} />
	{:else if showModalBodyFat}
		<ModalBodyFat />
	{/if}
{:else}
	<p class="m-3 px-5 flex justify-center">No one here yet...</p>
{/if}

<!-- AUDIO -->
<audio src="/audio/successBell.mp3" bind:this={audioWeighIn} />
