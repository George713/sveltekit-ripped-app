import { invalidateAll } from '$app/navigation';
import { uploadToS3 } from "$lib/utils";
import { animationManager, visibilityManager } from "$lib/stateManagers.svelte";

export const uploadProgressPic = async (event: Event, type: 'initial' | 'goofy' | 'weekly') => {
    const maxWidth = 1080; // max. width of image taken
    const target = event.target as HTMLInputElement | null;
    if (target && target.files && target.files.length > 0) {
        visibilityManager.toggleSpinnerOverlay();

        // Determine initPic status
        const formData = new FormData();
        formData.append('type', type);

        // Get presigned URL
        const response = await fetch('/api/getPresignedURL', {
            method: 'POST',
            body: formData
        });
        const presignedURL = (await response.json()).url;

        // Read the file into an Image object
        const file = target.files[0];
        const img = new Image();
        img.src = URL.createObjectURL(file);

        // Convert onload to a Promise so we can await it
        await new Promise<void>((resolve) => {
            img.onload = async () => {
                // Create a canvas and get its context
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');

                if (ctx) {
                    // Determine the new dimensions while maintaining aspect ratio
                    let width = img.width;
                    let height = img.height;

                    if (width > maxWidth) {
                        height *= maxWidth / width;
                        width = maxWidth;
                    }

                    // Set canvas dimensions and draw the image
                    canvas.width = width;
                    canvas.height = height;
                    ctx.drawImage(img, 0, 0, width, height);

                    // Convert the canvas content to a PNG blob
                    canvas.toBlob(
                        (blob) => {
                            if (blob) {
                                uploadToS3(blob, presignedURL);
                            }
                            resolve(); // Resolve the promise after upload is initiated
                        },
                        'image/png',
                        1.0 // quality factor
                    );
                } else {
                    resolve(); // Resolve even if there's an issue with the context
                }
            };

            // Handle loading errors
            img.onerror = () => {
                resolve();
            };
        });

        // Now that image processing is complete, invalidate to update page state
        if (type === 'goofy' || type === 'weekly') {
            await invalidateAll();
        }

        animationManager.progressPicPowerline = true;

        visibilityManager.toggleSpinnerOverlay();
    }
};
