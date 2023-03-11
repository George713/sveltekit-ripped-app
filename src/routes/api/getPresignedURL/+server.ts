import { json } from '@sveltejs/kit'
import { AWS_BUCKET_REGION, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_BUCKET_NAME } from '$env/static/private'

import { db } from '$lib/database.server';
import S3 from "aws-sdk/clients/s3"

import type { RequestHandler } from './$types';

const s3 = new S3({
    region: AWS_BUCKET_REGION,
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
    signatureVersion: "v4",
});


export const POST: RequestHandler = async ({ locals }) => {
    // Create picture reference
    const user = await db.user.update({
        where: {
            username: locals.user.name
        },
        data: {
            progressPictures: {
                create: [{}]
            }
        }
    });
    // Get id of reference (for usage in filename)
    // @ts-ignore
    const { id } = await db.progressPicture.findFirst({
        where: { user },
        orderBy: { createdAt: 'desc' }
    });

    // Make filename = username + datetime
    const filename = "progress_picture_" + id

    // Make presignedURL
    const presignedURL = await s3.getSignedUrl('putObject', { Bucket: AWS_BUCKET_NAME, Key: filename, Expires: 60 * 5, })

    return json({ url: presignedURL })
}
