<script lang="ts">
	import {
		CTASection,
		Headline,
		SocialProof,
		SubHeadline,
		MockupHand,
		Mockup
	} from '$lib/components/hero';
</script>

<div class="flex h-screen w-screen flex-col justify-center bg-stone-900 lg:flex-row">
	<!-- Mockup for Mobile/Tablet -->
	<div class="mb-5 mt-2 flex h-[calc(50%)] justify-center lg:hidden">
		<img class="" src={Mockup} alt="Mockup Mobile" />
	</div>
	<!-- Hero content without Mockup -->
	<div class="mx-[calc(10%)] flex items-center justify-center lg:justify-start">
		<div class="flex flex-col">
			<Headline classAddons="lg:mb-7 mb-4" />
			<SubHeadline classAddons=" lg:mb-20 mb-4" />
			<CTASection classAddons="lg:mb-5 mb-3" />
			<SocialProof />
		</div>
	</div>
	<!-- Mockup Hand for Desktop -->
	<div class="flex h-full flex-col-reverse">
		<img
			class="mr-auto hidden h-[calc(80%)] object-contain lg:block"
			src={MockupHand}
			alt="Mockup Desktop"
		/>
	</div>
</div>
