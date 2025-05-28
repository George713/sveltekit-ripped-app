<!-- src/routes/(protected)/app/new3/+page.svelte -->
<script lang="ts">
	import { goto } from '$app/navigation';
	import Minimizer from '$atoms/Minimizer.svelte';
	// Ensure this path is correct or use a standard HTML button
	import Button from '$atoms/Button.svelte';

	let { data, form } = $props();

	let isLoading = $state(false);

	// $: filesToDisplay = data.filesInfo || []; // This was Svelte 4 style
	// $: orphanedCount = filesToDisplay.filter(f => f.isOrphan).length; // This was Svelte 4 style

	// Svelte 5 style using derived state if needed, or just directly use data.filesInfo
	const filesToDisplay = $derived(data.filesInfo || []);
	const orphanedCount = $derived(filesToDisplay.filter((f) => f.isOrphan).length);
</script>

<div class="container mx-auto p-4 text-white">
	<div class="mb-4">
		<Minimizer onclick={() => goto('/app')} direction="left" />
	</div>

	<h1 class="mb-6 text-2xl font-bold">Orphaned Progress Picture Manager</h1>
	<p class="mb-2">Bucket: <span class="font-mono">{data.bucketName}</span></p>
	<p class="mb-4">
		Found {filesToDisplay.length} files matching prefix
		<span class="font-mono">progress_picture_</span>. {orphanedCount} appear to be orphaned.
	</p>

	{#if form}
		<div class="mb-4 rounded-md p-3 {form.success ? 'bg-green-600' : 'bg-red-600'}" role="alert">
			{form.message}
			{#if form.success && form.deletedFiles && form.deletedFiles.length > 0}
				<p class="mt-2 font-semibold">Deleted files:</p>
				<ul class="mt-1 list-inside list-disc text-sm">
					{#each form.deletedFiles as deletedFile (deletedFile)}
						<li>{deletedFile}</li>
					{/each}
				</ul>
			{/if}
		</div>
	{/if}

	<form method="POST" action="?/cleanOrphanedFiles" class="mb-6">
		<Button
			text="Clean Orphaned Files"
			type="submit"
			disabled={isLoading || orphanedCount === 0}
			variant="primary"
		/>
		{#if orphanedCount === 0 && !isLoading && !form?.success}
			<!-- Avoid showing this right after successful cleanup -->
			<p class="mt-2 text-sm">No orphaned files to clean currently.</p>
		{/if}
	</form>

	<div class="overflow-x-auto">
		<table class="min-w-full rounded-md bg-slate-800 shadow">
			<thead>
				<tr class="bg-slate-700">
					<th class="px-4 py-3 text-left text-sm font-semibold">Filename</th>
					<th class="px-4 py-3 text-left text-sm font-semibold">Extracted ID</th>
					<th class="px-4 py-3 text-left text-sm font-semibold">DB Record Exists?</th>
					<th class="px-4 py-3 text-left text-sm font-semibold">Is Orphan?</th>
				</tr>
			</thead>
			<tbody>
				{#each filesToDisplay as file (file.fileName)}
					<tr
						class="border-t border-slate-700 transition-colors duration-150 hover:bg-slate-600/30"
					>
						<td class="px-4 py-2 font-mono text-sm">{file.fileName}</td>
						<td class="px-4 py-2 font-mono text-sm">{file.storageId || 'N/A'}</td>
						<td class="px-4 py-2 text-sm">{file.dbRecordExists ? '✅ Yes' : '❌ No'}</td>
						<td
							class="px-4 py-2 text-sm {file.isOrphan
								? 'font-bold text-red-400'
								: 'text-green-400'}"
						>
							{file.isOrphan ? '🚨 Yes' : '✅ No'}
						</td>
					</tr>
				{:else}
					<tr>
						<td colspan="4" class="px-4 py-3 text-center text-slate-400">
							{#if data.filesInfo === null || data.filesInfo === undefined}
								Error loading file information. Check server logs.
							{:else}
								No files found matching the prefix <span class="font-mono">progress_picture_</span> in
								the bucket.
							{/if}
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>
