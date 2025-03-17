<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/state';

	import NumberFlow, { continuous } from '@number-flow/svelte';
	import { Fireworks } from '@fireworks-js/svelte';

	import Minimizer from '$lib/components/newDesign/atoms/Minimizer.svelte';
	import Sigil from '$lib/components/newDesign/atoms/Sigil.svelte';
	import Envelope from '$lib/components/newDesign/icons/Envelope.svelte';
	import { toastManager } from '$lib/stateManagers.svelte';

	type RankType = 'tbd' | 'wood' | 'bronze' | 'silver' | 'gold' | 'platinum';

	const isValidRank = (rank: string): rank is RankType => {
		return ['tbd', 'wood', 'bronze', 'silver', 'gold', 'platinum'].includes(rank);
	};
	const rawPreviousRank = page.url.searchParams.get('previousRank') || 'wood';
	const previousRank: RankType = isValidRank(rawPreviousRank) ? rawPreviousRank : 'wood';
	const newRank = page.data.user.currentStatus;
	const rankChanged = previousRank !== newRank;
	const rankImproved =
		['wood', 'bronze', 'silver', 'gold', 'platinum'].indexOf(newRank) >
		['wood', 'bronze', 'silver', 'gold', 'platinum'].indexOf(previousRank);

	let showPreviousRank = $state(true);
	const oldBodyfat = parseFloat(page.url.searchParams.get('oldBodyfat') || '0');
	const newBodyfat = page.data.user.currentBF;
	let bodyfat = $state(oldBodyfat);
	let change = $state(0);

	let showFireworks = $state(false);
	let showEnvelope = $state(false);

	const initialUnlock = previousRank === 'tbd';

	const message = $derived(
		initialUnlock
			? `I started off well in the wood percentages, but I am on my way to Bronze right now. Meet you in ${newRank === 'Platinum' ? 'Platinum' : 'Gold'}? ;-)`
			: `I see you just left the ${previousRank} percentages! Take it from someone who is also fighting the battle against fat: Congratulations! This is truly amazing. Job well done! :-)`
	);

	onMount(() => {
		setTimeout(() => {
			change = newBodyfat - oldBodyfat;
			setTimeout(
				() => {
					bodyfat = newBodyfat;
					if (rankChanged) {
						setTimeout(() => {
							showPreviousRank = false;
							if (rankImproved) {
								setTimeout(() => {
									// Show fireworks not during initial unlock process
									if (!initialUnlock) {
										showFireworks = true;
									}
									showEnvelope = true;
								}, 4000);
							}
						}, 2500);
					} else if (change < 0) {
						showFireworks = true;
					}
				},
				initialUnlock ? 0 : 2500
			); // Roll percentages immediately after initial unlock
		}, 500);
	});

	onDestroy(() => {
		toastManager.deleteAll();
	});

	// Fireworks options
	const fireworksOptions = {
		acceleration: 1.01,
		brightness: {
			min: 50,
			max: 80
		},
		decay: {
			min: 0.015,
			max: 0.03
		},
		delay: {
			min: 30,
			max: 60
		},
		explosion: rankImproved ? 7 : 2,
		flickering: 50,
		gravity: 1.5,
		hue: {
			min: 0,
			max: 360
		},
		intensity: rankImproved ? 18 : 6,
		friction: 0.95,
		opacity: 0.5,
		particles: 90,
		traceLength: 3,
		traceSpeed: rankImproved ? 10 : 5,
		rocketsPoint: {
			min: 50,
			max: 50
		},
		lineWidth: {
			explosion: {
				min: 1,
				max: 3
			},
			trace: {
				min: 1,
				max: 2
			}
		},
		lineStyle: 'round' as const,
		mouse: {
			click: false,
			move: false,
			max: 1
		}
	};
</script>

{#if showFireworks}
	<div class="pointer-events-none fixed inset-0 z-50">
		<Fireworks options={fireworksOptions} style="width: 100%; height: 100%;" />
	</div>
{/if}

{#snippet rankInfo(rank: RankType, range: string)}
	<div class="flex w-full items-center justify-center px-8">
		<div class="flex w-1/3 justify-center">
			<Sigil {rank} size="small" />
		</div>
		<p class="w-1/3 text-center">{rank.charAt(0).toUpperCase() + rank.slice(1)}</p>
		<p class="w-1/4 text-right">{range}</p>
	</div>
{/snippet}

<div class="relative mt-10 mb-5 flex h-[213px] w-full items-center justify-center">
	<div
		class="absolute inset-0 flex items-center justify-center transition-opacity delay-500 duration-3000"
		class:opacity-100={showPreviousRank}
		class:opacity-0={!showPreviousRank}
	>
		<Sigil rank={previousRank} />
	</div>

	<div
		class="absolute inset-0 flex items-center justify-center transition-opacity delay-3500 duration-6000"
		class:opacity-0={showPreviousRank}
		class:opacity-100={!showPreviousRank}
	>
		<Sigil rank={newRank} />
	</div>
</div>

<div class="mb-8 flex flex-col justify-center space-y-2 text-right">
	<div class="flex items-center">
		<p class="w-1/2 leading-5 font-medium text-stone-200">Your current body fat percentage is:</p>
		<NumberFlow
			plugins={[continuous]}
			class="font-bungee w-1/3 text-right text-2xl text-stone-200 drop-shadow-[0px_2px_0px_rgba(79,70,229,1),0px_-2px_0px_rgba(79,70,229,1),2px_0px_0px_rgba(79,70,229,1),-2px_2px_0px_rgba(79,70,229,1)]"
			value={bodyfat}
			style="percent"
			format={{ minimumFractionDigits: 1, maximumFractionDigits: 1 }}
			suffix="%"
			spinTiming={{
				// Used for the digit spin animations.
				// Will fall back to `transformTiming` if unset:
				duration: 2000,
				easing: 'ease-in-out'
			}}
			opacityTiming={{
				// Used for fading in/out characters:
				duration: 750,
				easing: 'ease-out'
			}}
		/>
	</div>
	{#if !initialUnlock}
		<div class="flex">
			<p class="w-1/2 font-medium text-stone-400">Change:</p>
			<NumberFlow
				plugins={[continuous]}
				class={{
					'w-1/3 text-right': true,
					'text-stone-400': change === 0,
					'text-emerald-500': change < 0,
					'text-rose-700': change > 0
				}}
				trend={+1}
				value={change}
				style="percent"
				prefix={change > 0 ? '+' : ''}
				format={{ minimumFractionDigits: 1, maximumFractionDigits: 1 }}
				suffix="%"
				spinTiming={{
					// Used for the digit spin animations.
					// Will fall back to `transformTiming` if unset:
					duration: 2000,
					easing: 'ease-in-out'
				}}
				opacityTiming={{
					// Used for fading in/out characters:
					duration: 750,
					easing: 'ease-out'
				}}
			/>
		</div>
	{/if}
</div>
<div
	class="flex grow -translate-x-[2%] flex-col items-center space-y-2 text-xl text-white opacity-70"
>
	{@render rankInfo('wood', '>20%')}
	{@render rankInfo('bronze', '15-20%')}
	{@render rankInfo('silver', '12-15%')}
	{@render rankInfo('gold', '10-12%')}
	{@render rankInfo('platinum', '<10%')}
</div>

<div class="mb-1.5 flex w-full justify-center">
	{#if showEnvelope}
		<button
			class=""
			type="button"
			onclick={() => {
				showEnvelope = false;
				toastManager.addToast({
					type: 'note',
					message: message,
					timeout: 60000
				});
			}}
		>
			<Envelope shake={true} />
		</button>
	{:else}
		<Minimizer
			onclick={() => {
				if (initialUnlock) {
					goto('/?unlockRank=true');
				} else {
					goto('/');
				}
			}}
			direction="down"
		/>
	{/if}
</div>
