<script lang="ts">
	import ActionButton from '../atoms/ActionButton.svelte';
</script>

<div class="absolute flex items-center space-x-3" style="transform: translate(115%, 134%)">
	<ActionButton glow={true} size="small" icon="insignia" />
	<div class="flex flex-col space-y-4">
		<ActionButton glow={true} size="small" icon="chart" />
		<ActionButton glow={true} size="small" icon="camera" />
	</div>
</div>
