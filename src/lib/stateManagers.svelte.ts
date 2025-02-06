import type { Toast } from '$lib/types'

// Visibility states
class VisibilityManager {
    weightOverlay = $state(false);
    toggleWeightOverlay = () => { this.weightOverlay = !this.weightOverlay }
}
export const visibilityManager = new VisibilityManager()

// Manager for Toasts, i.e. info overlays for errors, notes and warnings.
class ToastManager {
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


// Manager for XP and level
// XP levels configuration - define your table here (easy to update)
const XP_TABLE = [
    { level: 1, requiredXP: 15, totalXP: 15 },
    { level: 2, requiredXP: 50, totalXP: 65 },
    { level: 3, requiredXP: 100, totalXP: 165 },
    { level: 4, requiredXP: 200, totalXP: 365 },
    { level: 5, requiredXP: 350, totalXP: 715 },
    { level: 6, requiredXP: 600, totalXP: 1315 },
    { level: 7, requiredXP: 950, totalXP: 2265 },
    { level: 8, requiredXP: 1400, totalXP: 3665 },
    { level: 9, requiredXP: 2000, totalXP: 5665 },
    { level: 10, requiredXP: 0, totalXP: 0 }
];

class XPManager {
    // Total XP collected
    totalXP = $state(0)

    // Current Level
    level = $derived.by(() => {
        // Find the highest level where cumulative XP <= current total XP
        const levelEntry = XP_TABLE.find(entry => entry.totalXP > this.totalXP)?.level;
        return levelEntry ? levelEntry : XP_TABLE.length;
    });

    // XP collected since last level-up
    currentXP = $derived.by(() => {
        // Get previous level's total XP (cumulative up to that level)
        const prevLevelTotalXP = XP_TABLE.find(entry => entry.level === this.level - 1)?.totalXP;
        return prevLevelTotalXP ? this.totalXP - prevLevelTotalXP : this.totalXP
    });

    // XP amount required for next level-up
    requiredXP = $derived(XP_TABLE.find(entry => entry.level === this.level)?.requiredXP || 0);

    // Percentage of XP required for next level
    progressPct = $derived(this.level < 10 ? this.currentXP / this.requiredXP * 100 : 100)

    // Adding XP
    addXP = (gainedXP: number) => {
        // Calculate newXP by adding gainedXP to current totalXP
        const newXP = this.totalXP + gainedXP;

        // Get maxXP as the totalXP of the second last entry in XP_TABLE (basically last level-up)
        const maxXP = XP_TABLE[XP_TABLE.length - 2].totalXP

        // Set totalXP to the smaller value between newXP and maxXP
        this.totalXP = Math.min(newXP, maxXP);
    }
}

// Export a singleton instance of XPManager
export const xpManager = new XPManager();


// Manager for daily consumption
class ConsumptionManager {
    target = $state(0);
    eaten = $state(0);
    eatenPct = $derived(this.eaten / this.target);
    // inRange is only relevant for calories
    inRange = $derived((this.target - 25 <= this.eaten) && (this.eaten <= this.target + 25) ? true : false)

    constructor(target: number, eaten: number) {
        this.target = target;
        this.eaten = eaten;
    }
}

// Export singleton instances for tracking calories and protein
export const calorieManager = new ConsumptionManager(2000, 1500);
export const proteinManager = new ConsumptionManager(250, 100);