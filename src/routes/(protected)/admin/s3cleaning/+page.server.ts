// src/routes/(protected)/app/new3/+page.server.ts
import { error, fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { supabase } from '$lib/supabaseClient.server';
import { prisma } from '$lib/prismaClient.server';

const BUCKET_NAME = 'ripped-images-bucket';
const FILE_PREFIX = 'progress_picture_';

interface OrphanFileInfo {
	fileName: string;
	storageId: string | null;
	dbRecordExists: boolean;
	isOrphan: boolean;
	fileObject?: any;
}

async function getOrphanedFilesInfo(): Promise<OrphanFileInfo[]> {
	let progressPictureIds: Set<number>;
	try {
		const progressPictureRecords = await prisma.progressPicture.findMany({
			select: { id: true }
		});
		progressPictureIds = new Set(progressPictureRecords.map(record => record.id));
		console.log(`Fetched ${progressPictureIds.size} ProgressPicture IDs from DB.`); // DEBUG
	} catch (e: any) {
		console.error('Error fetching ProgressPicture IDs from Prisma:', e.message);
		throw error(500, 'Could not fetch progress picture records from database.');
	}

	const { data: files, error: listError } = await supabase.storage
		.from(BUCKET_NAME)
		.list(undefined, {
			limit: 1000,
			offset: 0
		});

	if (listError) {
		console.error('Error listing files from Supabase Storage:', listError.message);
		throw error(500, 'Could not list storage files.');
	}

	if (!files) {
		return [];
	}

	const orphanedFilesInfo: OrphanFileInfo[] = [];

	for (const file of files) {
		if (file.name.startsWith(FILE_PREFIX)) {
			const nameWithoutPrefix = file.name.substring(FILE_PREFIX.length);
			const idMatch = nameWithoutPrefix.match(/^(\d+)/);
			const storageId = idMatch ? idMatch[1] : null;
			let dbRecordExists = false;

			if (storageId) {
				const numericId = parseInt(storageId, 10);
				if (!isNaN(numericId)) {
					dbRecordExists = progressPictureIds.has(numericId);
				}
			}

			orphanedFilesInfo.push({
				fileName: file.name,
				storageId,
				dbRecordExists,
				isOrphan: !!storageId && !dbRecordExists,
				fileObject: file
			});
		}
	}
	return orphanedFilesInfo;
}

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.user.role === 'admin') {
		throw redirect(302, '/app')
	}


	try {
		const filesInfo = await getOrphanedFilesInfo();
		return {
			filesInfo,
			bucketName: BUCKET_NAME
		};
	} catch (e: any) {
		console.error('Load function error:', e);
		if (e.status && e.body) throw e;
		throw error(500, e.message || 'Failed to load orphaned files information.');
	}
};

export const actions: Actions = {
	cleanOrphanedFiles: async (event) => {
		try {
			const filesInfo = await getOrphanedFilesInfo();
			const filesToDelete = filesInfo
				.filter((file) => file.isOrphan)
				.map((file) => file.fileName);

			if (filesToDelete.length === 0) {
				return { success: true, message: 'No orphaned files found to delete.' };
			}

			const { data, error: deleteError } = await supabase.storage
				.from(BUCKET_NAME)
				.remove(filesToDelete);

			if (deleteError) {
				console.error('Error deleting files:', deleteError);
				return fail(500, { success: false, message: `Failed to delete files: ${deleteError.message}` });
			}

			return { success: true, message: `Successfully deleted ${filesToDelete.length} orphaned files.`, deletedFiles: filesToDelete };
		} catch (e: any) {
			console.error('Clean action error:', e);
			const errorMessage = (e.body as { message: string })?.message || (e as Error).message || 'An unexpected error occurred during cleanup.';
			return fail(500, { success: false, message: errorMessage });
		}
	}
};
