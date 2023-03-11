<script lang="ts">
	import { page } from '$app/stores';
	import { modalWeight, modalBodyFat } from './stores';
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
	};
</script>

<h1 class="flex py-3 justify-center text-2xl font-black">/home</h1>

{#if $page.data.user}
	<div class="border border-gray-500 shadow-md">
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
			<button on:click={() => modalWeight.set(true)} class="px-2 py-1 bg-gray-300 m-1"
				>Weight</button
			>
			<!-- Photo input -->
			<input
				type="file"
				bind:this={fileinput}
				style="display:none"
				accept=".jpg, .jpeg, .png"
				on:change={(e) => uploadToS3(e)}
			/>
			<button on:click={() => fileinput.click()} class="px-2 py-1 bg-gray-300 m-1">Photo</button>
			<!-- BodyFat input -->
			<button on:click={() => modalBodyFat.set(true)} class="px-2 py-1 bg-gray-300 m-1">BF%</button>
		</div>
	</div>

	{#if showModalWeight}
		<ModalWeight />
	{:else if showModalBodyFat}
		<ModalBodyFat />
	{/if}
{:else}
	<p class="m-3 px-5 flex justify-center">No one here yet...</p>
{/if}
