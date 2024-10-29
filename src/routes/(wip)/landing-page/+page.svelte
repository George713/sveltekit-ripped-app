<script lang="ts">
	import {
		CTASection,
		Headline,
		SocialProof,
		SubHeadline,
		MockupHand,
		Mockup
	} from '$lib/components/landingPage/hero';
	import { Benefit1Img, Benefit2Img, Benefit3Img } from '$lib/components/landingPage/benefits';

	interface Benefit {
		img: string;
		title: string;
		text: string;
	}

	const benefit1: Benefit = {
		img: Benefit1Img,
		title: 'Like A Game',
		text: 'Using design techniques from the gaming industry, dieting is turned into something you actually look forward to.'
	};

	const benefit2: Benefit = {
		img: Benefit2Img,
		title: 'Super Simple Tracking',
		text: 'Track your caloric intake by simply recording what you ate - using your voice.'
	};

	const benefit3: Benefit = {
		img: Benefit3Img,
		title: 'Holistic Approach',
		text: 'Through constant feedback and adaptation of your diet, successful progress is guaranteed.'
	};
</script>

<!-- Hero -->
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

<!-- Benefits -->
{#snippet benefit(benefit: Benefit)}
	<div class="relative flex w-96 flex-col items-center">
		<img class="absolute mb-3 h-48 object-contain" src={benefit.img} alt="Benefits #1" />
		<div class="mt-40 w-64 text-center">
			<p class="mb-2 text-xl font-medium">{benefit.title}</p>
			<p class="text-sm leading-tight">{benefit.text}</p>
		</div>
	</div>
{/snippet}

<div class="flex w-full flex-col items-center bg-stone-700 py-7 text-stone-200">
	<!-- Section Title -->
	<h2 class="mb-6 text-xl font-medium">Benefits & Features</h2>
	<!-- Benefits -->
	<div class="flex w-full flex-col items-center lg:flex-row lg:justify-evenly">
		{@render benefit(benefit1)}
		<div class="mx-auto my-8 h-[3px] w-10 rounded-full bg-stone-600 lg:hidden"></div>
		{@render benefit(benefit2)}
		<div class="mx-auto -mb-3 mt-8 h-[3px] w-10 rounded-full bg-stone-600 lg:hidden"></div>
		{@render benefit(benefit3)}
	</div>
</div>
