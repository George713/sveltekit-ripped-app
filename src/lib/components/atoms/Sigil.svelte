<script lang="ts">
	interface Props {
		rank: 'tbd' | 'wood' | 'bronze' | 'silver' | 'gold' | 'platinum';
		size?: 'small' | 'large';
	}

	let { rank, size = 'large' }: Props = $props();
</script>

<div class={{ 'flex w-full justify-center': size === 'large' }}>
	<img
		class={{
			'w-[320px]': size == 'large',
			'opacity-50 blur-[2px]': rank === 'tbd' && size === 'large',
			'h-[51px] w-[82px] opacity-50 blur-[1.5px]': rank === 'tbd' && size === 'small',
			'h-[51px] w-[82px]': size === 'small'
		}}
		src="/sigils/{rank}.webp"
		alt="Sigil Crest"
	/>
</div>
