<script lang="ts">
	import Banner from './Banner.png';

	let { classAddons = '' }: { classAddons?: string } = $props();
</script>

<div class="flex justify-center text-xs text-stone-200 lg:justify-start lg:text-sm {classAddons}">
	<span class="mr-1 font-medium">Community Favourite</span>
	<svg class="mx-1 h-4 lg:h-[18px] lg:translate-y-[1px]" viewBox="0 0 20 21" fill="none">
		<path
			d="M19.3362 9.59905L11.0706 0.588995C10.9602 0.466184 10.8251 0.367951 10.6743 0.300663C10.5234 0.233376 10.3601 0.198533 10.1949 0.198395C10.0303 0.198473 9.86748 0.232876 9.71688 0.299406C9.56628 0.365937 9.43121 0.463134 9.32028 0.584795L1.04943 9.60324C0.887122 9.79617 0.783864 10.0318 0.75202 10.2819C0.720176 10.532 0.761096 10.786 0.86988 11.0134C0.954876 11.2259 1.10036 11.4088 1.28831 11.5395C1.47625 11.6701 1.6984 11.7428 1.92723 11.7484H5.99493V18.9692C5.99548 19.2818 6.11989 19.5814 6.34091 19.8024C6.56192 20.0234 6.86152 20.1478 7.17408 20.1484H13.2158C13.5283 20.1478 13.8279 20.0234 14.049 19.8024C14.27 19.5814 14.3944 19.2818 14.3949 18.9692V11.7484H18.4658C18.6942 11.7424 18.9159 11.6695 19.1035 11.5389C19.291 11.4083 19.4362 11.2256 19.521 11.0134C19.6297 10.7849 19.6701 10.5299 19.6373 10.279C19.6045 10.028 19.5 9.79195 19.3362 9.59905Z"
			fill="#FF4500"
		/>
	</svg>
	<span>42</span>
	<span class="mr-1 ml-6 flex -translate-y-0.5 items-center text-[9px] lg:translate-y-0"
		>Featured on</span
	>
	<img class="h-5 -translate-y-0.5 lg:translate-y-0" src={Banner} alt="Reddit Banner" />
</div>
