<script lang="ts">
	import { slide } from 'svelte/transition';

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
	import { DirectCTA } from '$lib/components/landingPage/directCTA';

	let openQestionId = $state(0);

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

	// FAQ
	interface Question {
		question: string;
		answer: string;
		id: number;
	}

	let questions = [
		{
			question: 'How is <i>Have Your Cookie</i> different from other nutrition apps?',
			answer:
				'While other dieting apps are composed of features, <i>Have Your Cookie</i>’s primary objective is to change the user’s behavior. This way long-term fat loss is easily achieved and sustained.',
			id: 1
		},
		{
			question: 'Why is this not just another gimmick?',
			answer:
				'Dieting is tough, both physically and mentally, and tracking what you eat is stressful as well, but most dieting apps still only focus on that. Therefore, a method that makes dieting easier will yield the best results.',
			id: 2
		},
		{
			question: 'How does it work, exactly?',
			answer:
				'<i>Have Your Cookie</i> incorporates design elements typically found in the gaming industry. Special focus was put into assembling a `diet experience` that addresses as many different human motivational pathways as possible. Currently the following pathways are covered: <i>our desire for accomplishment, ownership over the journey, creative expression</i> and <i>a hang for novelty</i>.',
			id: 3
		},
		{
			question: 'What is planned for the beta test phase?',
			answer:
				'During the beta our testers (I hope you become one, if you haven’t already) experience the app at its current stage. We constantly gather your feedback and update the app accordingly. Every tester is welcome to send feedback via Discord, email or reddit, but that’s ultimately up to you. <br><br>If you are a <b>Beta Tester+</b> (you can tick a box during sign-up to become one), we would love to have a 15min zoom call with you after you got a chance to test the app (this form of feedback is especially valuable to us and will be honored accordingly when the app goes live).',
			id: 4
		},
		{
			question: 'What happens after the beta phase?',
			answer:
				'Once the major feedback from you has found its way into the app, the public launch will be prepared. Everything you have accomplished within the app during the beta will remain with you - you do <b>not</b> have to start over!',
			id: 5
		},
		{
			question: 'Is <i>Have Your Cookie</i>’s Beta for free? (Yes!)',
			answer:
				'Yes! The beta is completely free. Once <i>Have Your Cookie</i> launches to the public, a subscription will be needed to continue using the app. The price has not been decided upon yet, but it will be in the range of other existing nutrition apps.',
			id: 6
		}
	];
</script>

<!-- Hero -->
<div class="flex h-screen w-full flex-col justify-center bg-stone-900 lg:flex-row">
	<!-- Mockup for Mobile/Tablet -->
	<div class="mt-2 mb-5 flex h-[calc(50%)] justify-center lg:hidden">
		<img class="" src={Mockup} alt="Mockup Mobile" style="transform: scale(1.2);" />
	</div>
	<!-- Hero content without Mockup -->
	<div class="mx-[calc(10%)] flex items-center justify-center lg:justify-start">
		<div class="flex flex-col">
			<Headline classAddons="lg:mb-7 mb-4" />
			<SubHeadline classAddons=" lg:mb-20 mb-4" />
			<CTASection classAddons="lg:mb-5 mb-3 w-full" />
			<SocialProof />
		</div>
	</div>
	<!-- Mockup Hand for Desktop -->
	<div class="hidden h-full flex-col-reverse lg:flex">
		<img
			class="mr-auto hidden h-[calc(80%)] object-contain lg:block"
			src={MockupHand}
			alt="Mockup Desktop"
		/>
	</div>
</div>

<!-- Benefits -->
{#snippet benefit(benefit: Benefit)}
	<div class="relative flex w-96 max-w-full flex-col items-center">
		<img class="absolute mb-3 h-48 object-contain" src={benefit.img} alt="Benefit" />
		<div class="mt-40 w-64 text-center">
			<p class="mb-2 text-xl font-medium">{benefit.title}</p>
			<p class="text-sm leading-tight">{benefit.text}</p>
		</div>
	</div>
{/snippet}

<div class="flex w-full flex-col items-center bg-stone-700 py-7 text-stone-200">
	<!-- Section Title -->
	<h2 class="text-xl font-medium">Benefits & Features</h2>
	<!-- Benefits -->
	<div class="flex w-full flex-col items-center lg:flex-row lg:justify-evenly">
		{@render benefit(benefit1)}
		<div class="mx-auto my-8 h-0.5 w-10 rounded-full bg-stone-600 lg:hidden"></div>
		{@render benefit(benefit2)}
		<div class="mx-auto mt-8 -mb-3 h-0.5 w-10 rounded-full bg-stone-600 lg:hidden"></div>
		{@render benefit(benefit3)}
	</div>
</div>

<!-- Reviews / Social Proof -->
{#snippet review(review: Review)}
	<div class="flex w-52 flex-col-reverse justify-evenly lg:flex-col lg:items-center">
		<p class="mt-2 content-center text-sm leading-tight italic lg:mt-0 lg:h-20 lg:text-center">
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

<!-- FAQ -->
{#snippet quest(question: Question)}
	<button
		onclick={() => {
			openQestionId = openQestionId == question.id ? 0 : question.id;
		}}
		class="my-1"
	>
		<div
			class="flex items-center space-x-4 text-sm font-semibold {openQestionId == question.id
				? `text-orange-500`
				: ``}"
		>
			<svg
				class="h-4 shrink-0 {openQestionId == question.id ? `fill-orange-500` : `fill-stone-200`}"
				viewBox="0 0 16 16"
				fill="none"
			>
				<path
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M9 9H7V8.852C7 7.976 7.306 7.353 8 7C8.385 6.805 9 6.432 9 6C8.98848 5.74252 8.87809 5.49941 8.69182 5.32128C8.50554 5.14315 8.25774 5.04373 8 5.04373C7.74226 5.04373 7.49446 5.14315 7.30818 5.32128C7.12191 5.49941 7.01152 5.74252 7 6H5C5 4.346 6.346 3 8 3C9.654 3 11 4 11 6C11 8 9 8.165 9 9ZM7 13H9V11H7V13ZM8 0C5.87827 0 3.84344 0.842855 2.34315 2.34315C0.842855 3.84344 0 5.87827 0 8C0 10.1217 0.842855 12.1566 2.34315 13.6569C3.84344 15.1571 5.87827 16 8 16C10.1217 16 12.1566 15.1571 13.6569 13.6569C15.1571 12.1566 16 10.1217 16 8C16 5.87827 15.1571 3.84344 13.6569 2.34315C12.1566 0.842855 10.1217 0 8 0Z"
				/>
			</svg>
			<span class="text-left">{@html question.question}</span>
		</div>
		{#if openQestionId == question.id}
			<p transition:slide class="mt-1 ml-8 text-left text-sm leading-tight">
				{@html question.answer}
			</p>
		{/if}
		<div class="mt-1 h-0.5 w-full -translate-x-2 rounded-full bg-stone-800/30"></div>
	</button>
{/snippet}

<div class="flex w-full flex-col items-center bg-stone-700 py-10 text-stone-200">
	<!-- Section Title -->
	<h2 class="text-xl font-medium">Frequently Asked Questions</h2>
	<!-- Questions -->
	<div class="mt-10 flex w-5/6 flex-col space-y-2.5 bg-red-500/0 lg:w-2/5">
		{#each questions as question}
			{@render quest(question)}
		{/each}
	</div>
</div>

<!-- Direct CTA -->
<div class="flex w-full flex-col justify-center bg-stone-900 lg:flex-row">
	<div class="mx-[calc(10%)] flex items-center justify-center lg:justify-start">
		<div class="flex flex-col">
			<DirectCTA classAddons="lg:mb-5 mb-7 mt-10" />
			<CTASection classAddons="mb-10 mx-auto" />
		</div>
	</div>
</div>
