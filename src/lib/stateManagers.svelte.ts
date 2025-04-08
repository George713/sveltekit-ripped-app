import type { DailySelectionItem, EstimatedItem, FoodItem, FoodSet, PlannedItem, RecordedItem, Toast } from '$lib/types'

// Visibility states
class VisibilityManager {
    weightOverlay = $state(false);
    toggleWeightOverlay = () => { this.weightOverlay = !this.weightOverlay }

    spinnerOverlay = $state(false);
    toggleSpinnerOverlay = () => { this.spinnerOverlay = !this.spinnerOverlay }

    calorieOverlay = $state(false);
    toggleCalorieOverlay = () => { this.calorieOverlay = !this.calorieOverlay }
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

    // Delete all toasts
    deleteAll = () => {
        this.toasts = [];
    }
}

// Export a singleton instance of ToastManager
export const toastManager = new ToastManager();


// Manager for XP and level
// Base XP for eating target kcal of one day
const BASE_XP = 250;
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
const MAX_XP = XP_TABLE[XP_TABLE.length - 2].totalXP;

class XPManager {
    // XP gain explained:
    // Several actions yield XP. A small amount it awared directly, a larger amount is stored in the vault.
    // The XP in the vault can be extracted when the daily calorie target is reached.
    // For handling the XP animations, XP is first put into two caches (vault and direct).

    // The following two properties are filled during initial load within the layout
    totalXP = $state(0); // tracks user's total XP
    vaultXP = $state(0); // XP stored in the vault

    // XP cache for handling animation on main screen
    xpCacheVault = $state(0);
    xpCacheDirect = $state(0);

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

    // Private method to update XP in database
    _updateXPInDatabase = async (gainedDirectXP: number, gainedVaultXP: number, openVault: boolean) => {
        const response = await fetch('/api/updateXP', {
            method: 'POST',
            body: JSON.stringify({
                gainedDirectXP,
                gainedVaultXP,
                openVault
            }),
            headers: { 'Content-Type': 'application/json' }
        });
        return response.ok;
    }

    // Adding XP
    addXP = async (gainedXP: number) => {
        // Distribute XP between vault and direct
        const gainedVaultXP = calorieManager.underTarget ? Math.round(gainedXP * 3 / 4) : 0;
        const gainedDirectXP = Math.round(gainedXP * 1 / 4);

        // Set cache for animation
        this.xpCacheVault += gainedVaultXP;
        this.xpCacheDirect += gainedDirectXP;

        if (gainedVaultXP > 0 || gainedDirectXP > 0) {
            await this._updateXPInDatabase(gainedDirectXP, gainedVaultXP, false);
        }
    }

    extractCachedVaultXP = () => {
        const cachedVaultXP = this.xpCacheVault;
        this.xpCacheVault = 0;
        this.vaultXP += cachedVaultXP;
        return cachedVaultXP;
    }

    extractCachedDirectXP = () => {
        const cachedDirectXP = this.xpCacheDirect;
        this.xpCacheDirect = 0;
        if (this.totalXP < MAX_XP) {
            this.totalXP += cachedDirectXP;
            return cachedDirectXP;
        } else {
            return 0;
        }
    }

    openVault = async () => {
        const gainedDirectXP = this.vaultXP

        const success = await this._updateXPInDatabase(gainedDirectXP, -gainedDirectXP, true); // resets vault
        if (!success) {
            toastManager.addToast({
                type: 'error',
                message: 'Failed to open vault. Bad internet connection?',
                timeout: 6000
            });
        } else {
            this.vaultXP = 0;
            this.totalXP += gainedDirectXP;
            return gainedDirectXP;
        }
    }

}

// Export a singleton instance of XPManager
export const xpManager = new XPManager();


// CalorieManager for daily consumption
class CalorieManager {
    target = $state(0);
    eaten = $derived.by(() => {
        // Sum calories from plannedItems
        const plannedCalories = plannedItemManager.itemsEaten.reduce((sum, item) => {
            const foodItem = foodItemManager.getById(item.foodId);
            if (foodItem) {
                return sum + foodItem.kcal;
            }
            return sum;
        }, 0);

        // Sum calories from estimatedItems
        const estimatedCalories = estimatedItemManager.itemsEaten.reduce((sum, item) => {
            return sum + item.kcal;
        }, 0);

        // Return the total calories
        return plannedCalories + estimatedCalories;
    });
    eatenPct = $derived(this.target > 0 ? this.eaten / this.target : 0);
    underTarget = $derived(this.eaten <= this.target + 25);
    // inRange is only relevant for calories
    inRange = $derived(this.target > 0 && (this.target - 25 <= this.eaten) && (this.eaten <= this.target + 25))
}

// Export singleton instance for calorieManager
export const calorieManager = new CalorieManager();


// ProteinManager for daily consumption
class ProteinManager {
    target = $state(0);
    eaten = $derived.by(() => {
        // Sum protein from plannedItems
        const plannedProtein = plannedItemManager.itemsEaten.reduce((sum, item) => {
            const foodItem = foodItemManager.getById(item.foodId);
            if (foodItem) {
                return sum + foodItem.protein;
            }
            return sum;
        }, 0);

        // Sum protein from estimatedItems
        const estimatedProtein = estimatedItemManager.itemsEaten.reduce((sum, item) => {
            return sum + item.protein;
        }, 0);

        // Return the total protein
        return plannedProtein + estimatedProtein;
    });
    eatenPct = $derived(this.target > 0 ? this.eaten / this.target : 0);
}

// Export singleton instance for proteinManager
export const proteinManager = new ProteinManager();


// FoodItem Manager
export class FoodItemManager {
    // Classname required as XXX.constructor.name changes during build (see `minification`)
    classname = "FoodItemManager"
    items = $state<FoodItem[]>([]);

    // Get item by its id
    getById = (id: number) => {
        return this.items.find(item => item.id === id)
    }
}
export const foodItemManager = new FoodItemManager()

const updateConsumatedInDatabase = async ({ calories, protein }: { calories: number, protein: number }) => {
    const response = await fetch('/api/updateConsumated', {
        method: 'POST',
        body: JSON.stringify({
            calories,
            protein,
        }),
        headers: { 'Content-Type': 'application/json' }
    });
    return response.ok;
}

// PlannedItem Manager
export class PlannedItemManager {
    classname = "PlannedItemManager"
    items = $state<PlannedItem[]>([]);
    itemsEaten = $derived(this.items.filter(item => item.eaten))

    eatItem = (id: number, kcal: number) => {
        const initialCaloriesInRange = calorieManager.inRange;
        const initialProteinPct = proteinManager.eatenPct;
        let foodItem;
        this.items = this.items.map(item => {
            if (item.id === id) {
                foodItem = foodItemManager.getById(item.foodId);
                return { ...item, eaten: true };
            }
            return item;
        });
        updateConsumatedInDatabase({ calories: foodItem!.kcal, protein: foodItem!.protein });
        if (calorieManager.underTarget) {
            xpManager.addXP(BASE_XP * (kcal / calorieManager.target));
        } else {
            xpManager.addXP(BASE_XP * (kcal / calorieManager.target) / 4);
        }
        animationManager.eatPowerline = initialCaloriesInRange ? animationManager.eatPowerline : calorieManager.underTarget;
        animationManager.caloriePowerline = initialCaloriesInRange ? animationManager.caloriePowerline : calorieManager.inRange;
        animationManager.proteinPowerline = initialProteinPct < 1 ? proteinManager.eatenPct >= 1 : animationManager.proteinPowerline;
    }

    getEnrichedItems = () => {
        return this.items.map(item => {
            const foodItem = foodItemManager.getById(item.foodId);
            return {
                id: item.id,
                foodId: item.foodId,
                name: foodItem?.itemName || '',
                kcal: foodItem?.kcal || 0,
                protein: foodItem?.protein || 0,
                eaten: item.eaten,
            };
        });
    }
}
export const plannedItemManager = new PlannedItemManager()


// EstimatedItem Manager
class EstimatedItemManager {
    items = $state<EstimatedItem[]>([]);
    itemsEaten = $derived(this.items.filter(item => item.eaten))

    addItem = (item: EstimatedItem) => {
        this.items = [...this.items, item];
    }

    eatItem = (id: number, kcal: number) => {
        const initialCaloriesInRange = calorieManager.inRange;
        const initialProteinPct = proteinManager.eatenPct;
        let estimatedItem;
        this.items = this.items.map(item => {
            if (item.id === id) {
                estimatedItem = item;
                return { ...item, eaten: true };
            }
            return item;
        });
        updateConsumatedInDatabase({ calories: estimatedItem!.kcal, protein: estimatedItem!.protein });
        if (calorieManager.underTarget) {
            xpManager.addXP(BASE_XP * (kcal / calorieManager.target) / 2); // Eating estimates only yields half XP
        } else {
            xpManager.addXP(BASE_XP * (kcal / calorieManager.target) / 8);
        }
        animationManager.eatPowerline = initialCaloriesInRange ? animationManager.eatPowerline : calorieManager.underTarget;
        animationManager.caloriePowerline = initialCaloriesInRange ? animationManager.caloriePowerline : calorieManager.inRange;
        animationManager.proteinPowerline = initialProteinPct < 1 ? proteinManager.eatenPct >= 1 : animationManager.proteinPowerline;
    }
}
export const estimatedItemManager = new EstimatedItemManager()


// Daily Selection Manager
export class SelectionManager {
    classname = "SelectionManager"
    items = $state<DailySelectionItem[]>([]);
    nextId = $state(0);
    name = $state("")

    totalKcal = $derived(this.items.reduce((sum, item) => sum + item.kcal, 0))
    totalProtein = $derived(this.items.reduce((sum, item) => sum + item.protein, 0))

    // Check whether the daily selection is within the target calorie range
    inRange = $derived((calorieManager.target - 25 <= this.totalKcal) && (this.totalKcal <= calorieManager.target + 25) ? true : false)

    // Add item to daily selection
    addFoodItem = (id: number) => {
        const foodItem = foodItemManager.getById(id);
        if (foodItem) {
            const dailySelectionItem: DailySelectionItem = {
                id: this.nextId++,
                foodId: foodItem.id,
                itemName: foodItem.itemName,
                kcal: foodItem.kcal,
                protein: foodItem.protein
            };
            this.items = [...this.items, dailySelectionItem];
        }
    }

    // Add foodSet to daily selection
    addFoodSet = (foodSet: FoodSet) => {
        const dailySelectionItems: DailySelectionItem[] = foodSet.foodItemsInSet.map(item => {
            const foodItem = foodItemManager.getById(item.foodId);
            return {
                id: this.nextId++,
                foodId: item.foodId,
                itemName: foodItem?.itemName || 'Error',
                kcal: foodItem?.kcal || 0,
                protein: foodItem?.protein || 0
            };
        });
        this.items = [...this.items, ...dailySelectionItems];
    }

    // Remove item from daily selection
    remove = (id: number) => {
        this.items = this.items.filter(item => item.id !== id);
    }

    // Prepare items for submission to endpoint `finishPlanning`
    prepareForSubmission = () => {
        return this.items.map(item => ({
            foodId: item.foodId,
            unitIsPtn: true,
            unitAmount: 1
        }))
    }

    clear = () => {
        this.items = [];
        this.name = "";
    }
}
export const dailySelectionManager = new SelectionManager()
export const setSelectionManager = new SelectionManager()

// FoodSet Manager
export class FoodSetManager {
    classname = "FoodSetManager"
    items = $state<FoodSet[]>([]);

    getKcal = (foodSet: FoodSet): number => {
        return foodSet.foodItemsInSet.reduce((acc, item) => {
            const foodItem = foodItemManager.getById(item.foodId);
            return acc + (foodItem?.kcal || 0);
        }, 0);
    }

    getProtein = (foodSet: FoodSet): number => {
        return foodSet.foodItemsInSet.reduce((acc, item) => {
            const foodItem = foodItemManager.getById(item.foodId);
            return acc + (foodItem?.protein || 0);
        }, 0);
    }

    // Get images for food set
    // If there are 3 or less distinct foods, return the src of a single image
    // Otherwise, return an array of srcs for the first 4 distinct foods
    getImages = (foodSet: FoodSet): string | string[] => {
        const distinctFoodIds = Array.from(new Set(foodSet.foodItemsInSet.map(item => item.foodId)));
        if (distinctFoodIds.length <= 3) {
            return `https://cdswqmabrloxyfswpggl.supabase.co/storage/v1/object/public/foodItems/foodItem_${distinctFoodIds[0]}`
        } else {
            return distinctFoodIds.slice(0, 4).map(foodId => {
                return `https://cdswqmabrloxyfswpggl.supabase.co/storage/v1/object/public/foodItems/foodItem_${foodId}`;
            });
        }
    }

    getById = (id: number) => {
        return this.items.find(set => set.id === id);
    }
}
export const foodSetManager = new FoodSetManager()


class Ingredient {
    static nextId = 0;
    id = $state(0)
    icon = $state("")
    name = $state("")
    kcal = $state(0)
    protein = $state(0)
    shouldFocus = $state(false)

    constructor(icon: string, name: string, kcal: number, protein: number, shouldFocus?: boolean) {
        this.id = Ingredient.nextId++;
        this.icon = icon
        this.name = name
        this.kcal = kcal
        this.protein = protein
        this.shouldFocus = shouldFocus ?? false
    }
}


class IngredientManager {
    items = $state<Ingredient[]>([]);
    totalKcal = $derived(this.items.reduce((sum, item) => sum + item.kcal, 0))
    totalProtein = $derived(this.items.reduce((sum, item) => sum + item.protein, 0))

    // Add one or multiple items to the ingredient store
    add = (item: RecordedItem | RecordedItem[]) => {
        const newItems = (Array.isArray(item) ? item : [item]).map((recordedItem: RecordedItem) => new Ingredient(recordedItem.icon, recordedItem.name, recordedItem.kcal, recordedItem.protein, recordedItem?.shouldFocus));
        this.items = [...this.items, ...newItems];
    }

    remove = (id: number) => {
        this.items = this.items.filter(item => item.id !== id);
    }

    clear = () => {
        this.items = [];
    }

    // Get serializable representation of items
    toJSON = () => {
        return this.items.map(item => ({
            icon: item.icon,
            name: item.name,
            kcal: item.kcal.toFixed(0),
            protein: item.protein.toFixed(1)
        }));
    }
}
export const ingredientManager = new IngredientManager()


class AnimationManager {
    weighInPowerline = $state(false);
    planPowerline = $state(false);
    eatPowerline = $state(false);
    caloriePowerline = $state(false);
    proteinPowerline = $state(false);
    progressPicPowerline = $state(false);
    reviewPowerline = $state(false);
    bodyfatPowerline = $state(false);

    reset = () => {
        this.weighInPowerline = false;
        this.planPowerline = false;
        this.eatPowerline = false;
        this.caloriePowerline = false;
        this.proteinPowerline = false;
        this.progressPicPowerline = false;
        this.reviewPowerline = false;
        this.bodyfatPowerline = false;
    }
}
export const animationManager = new AnimationManager();