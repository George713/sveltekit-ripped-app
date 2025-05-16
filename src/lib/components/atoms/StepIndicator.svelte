<script lang="ts">
	interface Props {
		totalSteps: number;
		currentStep: number;
	}

	let { totalSteps, currentStep }: Props = $props();
</script>

{#snippet circle(active: boolean)}
	<div
		class={{
			'size-2 rounded-full': true,
			'bg-stone-700': !active,
			'bg-stone-400': active
		}}
	></div>
{/snippet}

<div class="flex items-center justify-center space-x-2">
	{#each Array.from({ length: totalSteps }) as _, index}
		{@render circle(index === currentStep)}
	{/each}
</div>
