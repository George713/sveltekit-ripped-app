<script lang="ts">
	interface Props {
		rank: 'tbd' | 'wood' | 'bronze' | 'silver' | 'gold' | 'platinum';
	}

	let { rank }: Props = $props();
</script>

<div class="flex w-full justify-center">
	<img
		class={{
			'w-[320px]': true,
			'opacity-50 blur-[2px]': rank === 'tbd'
		}}
		src="/sigils/{rank}.webp"
		alt="Sigil Crest"
	/>
</div>
