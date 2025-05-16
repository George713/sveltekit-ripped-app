// Unit Conversion Constants
const KG_TO_LBS_FACTOR = 2.20462;
const LBS_TO_KG_FACTOR = 1 / KG_TO_LBS_FACTOR;

// Unit Conversion Functions (embedded for now)
const kgToLbs = (kg: number): number => {
    return kg * KG_TO_LBS_FACTOR;
}

const lbsToKg = (lbs: number): number => {
    return lbs * LBS_TO_KG_FACTOR;
}

export const getDisplayWeight = (weightInKg: number, useMetric: boolean): number => {
    return useMetric ? weightInKg : parseFloat(kgToLbs(weightInKg).toFixed(2));
}

export const convertInputToKg = (inputValue: number, useMetric: boolean): number => {
    return useMetric ? inputValue : lbsToKg(inputValue);
}

export const getWeightUnit = (useMetric: boolean): 'kg' | 'lbs' => {
    return useMetric ? 'kg' : 'lbs';
}