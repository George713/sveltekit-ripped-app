<!-- Calendar.svelte -->
<script lang="ts">
	import type { ScheduledEvent } from '$lib/types';

	export let schedule;

	// Convert the schedule object values to an array and sort by remaining days in ascending order
	$: sortedEvents = Object.values(schedule as ScheduledEvent).sort(
		(a: ScheduledEvent, b: ScheduledEvent) => a.remainingDays - b.remainingDays
	);
</script>

<!-- Modal -->
<div
	class="absolute top-1/4 right-0 left-0 mx-5 rounded-lg bg-slate-200/70 pt-2 text-center text-stone-800 shadow-sm"
>
	<!-- Heading -->
	<p class="text-lg font-semibold">Upcoming Events</p>
	<!-- Entries -->
	<div class="mx-5 flex flex-col py-4">
		{#each sortedEvents as event}
			<div class="flex justify-between">
				<p class="text-stone-600">
					{event.date.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit' })}
				</p>
				<p>{event.name}</p>
				<p class="text-stone-600">{event.remainingDays} days</p>
			</div>
		{/each}
	</div>
</div>
