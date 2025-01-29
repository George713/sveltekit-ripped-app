import type { Toast } from '$lib/types'

export class ToastManager {
    // Initialize the toasts array using $state directly in the class field
    toasts = $state<Toast[]>([]);
    maxId = $state(0)

    // Add a toast
    addToast = (toast: Toast) => {
        this.maxId += 1
        const newToast: Toast = {
            id: this.maxId,
            timeout: toast.timeout ?? 3000,
            ...toast
        };
        this.toasts = [...this.toasts, newToast];

        // Automatically remove the toast after the timeout
        setTimeout(() => {
            this.removeToast(newToast);
        }, toast.timeout);
    };

    // Remove a specific toast
    removeToast = (toast: Toast) => {
        this.toasts = this.toasts.filter((t) => t.id !== toast.id);
    };
}

// Export a singleton instance of ToastManager
export const toastManager = new ToastManager();