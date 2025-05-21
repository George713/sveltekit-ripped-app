// Base XP for eating target kcal of one day
export const BASE_XP = 250;
// XP levels configuration - define your table here (easy to update)
export const XP_TABLE = [
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
export const MAX_XP = XP_TABLE[XP_TABLE.length - 2].totalXP;