<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/state';

	interface Props {
		scrollToQuestionId: (id: number) => void;
		classAddons?: string;
	}

	let { scrollToQuestionId, classAddons = '' }: Props = $props();

	let successModalOpen = $state(false);
</script>

<form
	action="?/joinWaitlist"
	method="POST"
	class="flex flex-col text-sm text-stone-200 {classAddons} lg:w-96"
	use:enhance={() => {
		return async ({ result }) => {
			if (result.type === 'success') {
				successModalOpen = true;
			}
		};
	}}
>
	<!-- Input fields -->
	<div class="flex space-x-2">
		<input
			class="h-9 w-40 grow rounded-sm border border-stone-400 bg-transparent px-3 placeholder-stone-400"
			name="firstName"
			type="text"
			placeholder="First Name"
			autocomplete="off"
			required
		/>
		<input
			class="h-9 w-40 grow rounded-sm border border-stone-400 bg-transparent px-3 placeholder-stone-400"
			name="email"
			type="email"
			placeholder="Email"
			autocomplete="off"
			required
		/>
	</div>
	<!-- CTA button -->
	<button class="mt-2 h-9 cursor-pointer rounded-sm bg-indigo-600 font-medium">
		Put me on Waitlist for Beta
	</button>
	<!-- Assurance -->
	<div class="relative mt-1 flex w-full items-center justify-center text-[9px] text-stone-400">
		<p class="">We’ll never share your info with anyone.</p>
		<!-- Input for Beta Testers+ -->
		<div class="absolute right-0 flex space-x-1">
			<input type="checkbox" name="betaPlus" class="size-3 accent-orange-500" />
			<button type="button" class="cursor-pointer" onclick={() => scrollToQuestionId(4)}>
				Beta Tester+
			</button>
		</div>
	</div>
	<!-- Hidden Input for origin -->
	<input type="hidden" name="origin" value={page.url.searchParams.get('origin')} />
</form>

{#if successModalOpen}
	<div
		class="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
		role="dialog"
		aria-modal="true"
		aria-labelledby="success-modal-title"
	>
		<div class="m-4 w-full max-w-md rounded-lg bg-stone-800 p-6 shadow-xl">
			<h2 id="success-modal-title" class="mb-4 text-center text-2xl font-semibold text-emerald-400">
				🎉 Success! 🎉
			</h2>
			<p class="mb-6 text-center text-stone-300">
				You've been successfully added to the waitlist. We'll keep you updated!
			</p>
			<button
				onclick={() => (successModalOpen = false)}
				class="w-full rounded-md bg-indigo-600 px-4 py-2.5 font-medium text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-stone-800 focus:outline-none"
			>
				Okay
			</button>
		</div>
	</div>
{/if}
