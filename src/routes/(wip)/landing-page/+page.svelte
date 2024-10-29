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
	import { JaneDow, Stars } from '$lib/components/landingPage/reviews';

	// Benefits
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

	// Reviews
	interface Review {
		img: string;
		text: string;
		reviewerName: string;
	}

	const review1: Review = {
		img: JaneDow,
		text: '“The Duolingo equivalent of nutrition apps.”',
		reviewerName: 'Jane Dow'
	};

	const review2: Review = {
		img: JaneDow,
		text: '“This app is already great, but I know it will get even better thanks to the founder.”',
		reviewerName: 'Jane Dow'
	};

	const review3: Review = {
		img: JaneDow,
		text: '“Other dieting apps have always been a chore for me, but this one is so much fun!”',
		reviewerName: 'Jane Dow'
	};
</script>

<!-- Hero -->
<div class="flex h-screen w-full flex-col justify-center bg-stone-900 lg:flex-row">
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
		<img class="absolute mb-3 h-48 object-contain" src={benefit.img} alt="Benefit" />
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
		<div class="mx-auto my-8 h-0.5 w-10 rounded-full bg-stone-600 lg:hidden"></div>
		{@render benefit(benefit2)}
		<div class="mx-auto -mb-3 mt-8 h-0.5 w-10 rounded-full bg-stone-600 lg:hidden"></div>
		{@render benefit(benefit3)}
	</div>
</div>

<!-- Reviews / Social Proof -->
{#snippet review(review: Review)}
	<div class="flex w-52 flex-col-reverse justify-evenly lg:flex-col lg:items-center">
		<p class="mt-2 content-center text-sm italic leading-tight lg:mt-0 lg:h-20 lg:text-center">
			{review.text}
		</p>
		<div class="mt-3 flex -translate-x-10 items-center space-x-2 lg:translate-x-0">
			<img class="w-8 lg:w-10" src={review.img} alt="Review" />
			<div class="flex flex-col">
				<p class="text-xs font-medium lg:text-sm">{review.reviewerName}</p>
				<img class="h-2.5 lg:h-3" src={Stars} alt="Stars" />
			</div>
		</div>
	</div>
{/snippet}

<div class="flex w-full flex-col bg-stone-900 py-7 text-stone-200">
	<!-- Section Title -->
	<h2 class="mb-5 text-center text-xl font-medium">What Alpha Testers Say</h2>
	<!-- Reviews -->
	<div class="flex w-full flex-col items-center lg:flex-row lg:justify-evenly">
		{@render review(review1)}
		<div class="mx-auto my-8 h-0.5 w-10 rounded-full bg-stone-600 lg:hidden"></div>
		{@render review(review2)}
		<div class="mx-auto my-8 h-0.5 w-10 rounded-full bg-stone-600 lg:hidden"></div>
		{@render review(review3)}
	</div>
</div>
