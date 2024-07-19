<!-- Calendar.svelte -->
<script lang="ts">
	import Background from './Background.svelte';
</script>

<Background>
	<!-- Modal -->
	<div
		class="absolute left-0 right-0 top-1/4 mx-5 rounded-lg bg-slate-200/70 pt-2 text-center text-stone-800 shadow"
	>
		<!-- Heading -->
		<p class="text-lg font-bold">Upcoming Events</p>
		<!-- Entries -->
		<div class="mx-5 flex flex-col py-4 font-semibold">
			<!-- Item #1 -->
			<div class="flex justify-between">
				<p class="text-stone-600">28/07</p>
				<p>Progress Picture</p>
				<p class="text-stone-600">5 days</p>
			</div>
			<!-- Item #2 -->
			<div class="flex justify-between">
				<p class="text-stone-600">28/07</p>
				<p>Weekly Review</p>
				<p class="text-stone-600">5 days</p>
			</div>
			<!-- Item #3 -->
			<div class="flex justify-between">
				<p class="text-stone-600">14/08</p>
				<p>Bodyfat Measurement</p>
				<p class="text-stone-600">16 days</p>
			</div>
		</div>
	</div>
</Background>
