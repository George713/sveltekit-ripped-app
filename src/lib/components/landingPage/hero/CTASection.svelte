<script lang="ts">
	let firstName = '';
	let email = '';
	let { classAddons = '' }: { classAddons?: string } = $props();
</script>

<div class="flex flex-col text-sm text-stone-200 {classAddons}  lg:w-96">
	<!-- Input fields -->
	<div class="flex space-x-2">
		<input
			class="h-9 w-40 grow rounded border border-stone-400 bg-transparent px-3 placeholder-stone-400"
			type="text"
			placeholder="First Name"
			value={firstName}
		/>
		<input
			class="h-9 w-40 grow rounded border border-stone-400 bg-transparent px-3 placeholder-stone-400"
			type="email"
			placeholder="Email"
			value={email}
		/>
	</div>
	<!-- CTA button -->
	<button class="mt-2 h-9 rounded bg-indigo-600 font-medium">Put me on Waitlist for Beta</button>
	<!-- Assurance -->
	<p class="mt-0.5 text-center text-[9px] text-stone-400">
		We’ll never share your info with anyone.
	</p>
</div>
