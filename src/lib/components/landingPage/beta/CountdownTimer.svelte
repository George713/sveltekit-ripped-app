<script lang="ts">
	import { onMount, onDestroy } from 'svelte';

	let { classAddons = '' }: { classAddons?: string } = $props();

	// Target date: June 2nd, 2025, 18:00:00 UTC
	const targetDate = new Date(Date.UTC(2025, 5, 2, 18, 0, 0));

	let days = $state(0);
	let hours = $state(0);
	let minutes = $state(0);
	let seconds = $state(0);
	let countdownEnded = $state(false);

	let intervalId: ReturnType<typeof setInterval> | undefined = undefined;

	function updateCountdown() {
		const now = new Date().getTime();
		const difference = targetDate.getTime() - now;

		if (difference <= 0) {
			days = 0;
			hours = 0;
			minutes = 0;
			seconds = 0;
			countdownEnded = true;
			if (intervalId) {
				clearInterval(intervalId);
				intervalId = undefined;
			}
			return;
		}

		days = Math.floor(difference / (1000 * 60 * 60 * 24));
		hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
		minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
		seconds = Math.floor((difference % (1000 * 60)) / 1000);
	}

	onMount(() => {
		updateCountdown();
		if (!countdownEnded) {
			intervalId = setInterval(updateCountdown, 1000);
		}
	});

	onDestroy(() => {
		if (intervalId) {
			clearInterval(intervalId);
		}
	});

	const pad = (num: number) => num.toString().padStart(2, '0');
</script>

<div class="flex flex-col {classAddons}">
	<div
		class="lg:space-x- flex items-center justify-center space-x-2 md:space-x-3"
		role="timer"
		aria-live="polite"
	>
		<!-- Days -->
		<div
			class="flex min-w-[55px] flex-col items-center justify-center rounded-lg bg-stone-800 p-2.5 shadow-md sm:min-w-[65px] md:min-w-[75px] lg:p-3"
		>
			<span class="text-xl font-semibold text-orange-500 tabular-nums sm:text-2xl md:text-3xl"
				>{days}</span
			>
			<span class="text-[0.6rem] font-medium tracking-wider text-stone-400 uppercase sm:text-xs"
				>Days</span
			>
		</div>

		<!-- Hours -->
		<div
			class="flex min-w-[55px] flex-col items-center justify-center rounded-lg bg-stone-800 p-2.5 shadow-md sm:min-w-[65px] md:min-w-[75px] lg:p-3"
		>
			<span class="text-xl font-semibold text-orange-500 tabular-nums sm:text-2xl md:text-3xl"
				>{hours}</span
			>
			<span class="text-[0.6rem] font-medium tracking-wider text-stone-400 uppercase sm:text-xs"
				>Hours</span
			>
		</div>

		<!-- Minutes -->
		<div
			class="flex min-w-[55px] flex-col items-center justify-center rounded-lg bg-stone-800 p-2.5 shadow-md sm:min-w-[65px] md:min-w-[75px] lg:p-3"
		>
			<span class="text-xl font-semibold text-orange-500 tabular-nums sm:text-2xl md:text-3xl"
				>{pad(minutes)}</span
			>
			<span class="text-[0.6rem] font-medium tracking-wider text-stone-400 uppercase sm:text-xs"
				>Mins</span
			>
		</div>

		<!-- Seconds -->
		<div
			class="flex min-w-[55px] flex-col items-center justify-center rounded-lg bg-stone-800 p-2.5 shadow-md sm:min-w-[65px] md:min-w-[75px] lg:p-3"
		>
			<span class="text-xl font-semibold text-orange-500 tabular-nums sm:text-2xl md:text-3xl"
				>{pad(seconds)}</span
			>
			<span class="text-[0.6rem] font-medium tracking-wider text-stone-400 uppercase sm:text-xs"
				>Secs</span
			>
		</div>
	</div>

	<p class="mt-3 text-center text-xl font-semibold tracking-wider text-orange-500 uppercase">
		until launch
	</p>
</div>
