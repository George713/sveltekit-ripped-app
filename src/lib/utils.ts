import type { ScheduledEvent } from "./types";

export const selectInput = (event: Event) => {
    const element = event.target as HTMLInputElement;
    element.select()
}

// For putting the focus automatically on input field
export const focusElement = (el: HTMLInputElement) => {
    el.focus();
};

/**
 * Calculates the datetime of the logical beginning of the current day or from x days ago.
 * Reminder: HYC's days run from 3am to 3am in the user's local timezone.
 */
export const getDateDayBegin = (timeZoneOffset: number, xDays: number = 0) => {
    const beginningHour = (3 - timeZoneOffset + 24) % 24 // Add 24 so that expression in front of modulo is always positive
    const now = new Date()
    const yesterday = new Date(now.getTime() - (24 * 60 * 60 * 1000)) // getTime() is in units of milliseconds
    // If the utc hour is before the logical beginning hour, use yesterday's date
    if (now.getUTCHours() >= beginningHour) {
        return new Date(now.setUTCHours(beginningHour, 0, 0, 0) - (xDays * 24 * 60 * 60 * 1000))
    }
    else {
        return new Date(yesterday.setUTCHours(beginningHour, 0, 0, 0) - (xDays * 24 * 60 * 60 * 1000))
    }
}

export const getDateBeginning = (timeZoneOffset: number, date: Date): Date => {
    const beginningHour = (3 - timeZoneOffset + 24) % 24 // Add 24 so that expression in front of modulo is always positive
    const now = new Date()
    if (now.getUTCHours() >= beginningHour) {
        return new Date(date.setUTCHours(beginningHour, 0, 0, 0))
    }
    else {
        return new Date(date.setUTCHours(beginningHour, 0, 0, 0) - (24 * 60 * 60 * 1000))
    }
}

/**
 * Determines whether the date of a given action is older than x days
 * while considering the day begin of the date the action was performed.
 */
export const actionIsOlderThanXdays = (timeZoneOffset: number, date: Date, xDays: number) => {
    const beginningHour = (3 - timeZoneOffset + 24) % 24 // Add 24 so that expression in front of modulo is always positive
    const now = new Date()
    const priorDay = new Date(date.getTime() - (24 * 60 * 60 * 1000))
    let actionDateDayBeginning
    if (now.getUTCHours() >= beginningHour) {
        actionDateDayBeginning = new Date(date.setUTCHours(beginningHour, 0, 0, 0))
    }
    else {
        actionDateDayBeginning = new Date(priorDay.setUTCHours(beginningHour, 0, 0, 0))
    }
    return actionDateDayBeginning <= new Date(now.setUTCHours(beginningHour, 0, 0, 0) - (xDays * 24 * 60 * 60 * 1000))
}

export const isMobile = () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
    );
};

export const uploadToS3 = async (fileBlob: Blob, presignedURL: string) => {
    // Upload image to s3 using presignedURL
    await fetch(presignedURL, {
        method: 'PUT',
        body: fileBlob
    });
}

export const getCurrentCrestLevel = (bodyfatPercentage: number, isMale: boolean) => {
    if (isMale) {
        if (bodyfatPercentage >= 20) {
            return "wood";
        } else if (bodyfatPercentage >= 15 && bodyfatPercentage < 20) {
            return "bronze";
        } else if (bodyfatPercentage >= 12 && bodyfatPercentage < 15) {
            return "silver";
        } else if (bodyfatPercentage >= 10 && bodyfatPercentage < 12) {
            return "gold";
        } else if (bodyfatPercentage < 10) {
            return "platinum";
        }
    } else {
        if (bodyfatPercentage >= 27) {
            return "wood";
        } else if (bodyfatPercentage >= 21 && bodyfatPercentage < 27) {
            return "bronze";
        } else if (bodyfatPercentage >= 17 && bodyfatPercentage < 21) {
            return "silver";
        } else if (bodyfatPercentage >= 14 && bodyfatPercentage < 17) {
            return "gold";
        } else if (bodyfatPercentage < 14) {
            return "platinum";
        }
    }
    return "notEvaluatedYet"
}

export const calculateBasePoints = (currentStatus: string) => {
    if (currentStatus === 'wood') {
        return 20;
    } else if (currentStatus === 'bronze') {
        return 35;
    } else if (currentStatus === 'silver') {
        return 60;
    } else if (currentStatus === 'gold') {
        return 100;
    } else if (currentStatus === 'platinum') {
        return 200;
    } else {
        return 0;
    }
};

export const getScheduledEvent = (
    type: string,
    name: string,
    timeZoneOffset: number,
    lastDate: Date | undefined,
    fixedWeekDay: string | undefined = undefined
): ScheduledEvent => {

    const today = getDateDayBegin(timeZoneOffset)
    let nextDate: Date

    if (!lastDate) {
        nextDate = today
    } else {
        // Initialize loop with last date
        nextDate = getDateBeginning(timeZoneOffset, lastDate)

        // Add periods until new date is in the future
        while (nextDate < today) {
            if (type === 'weekly') {
                nextDate.setDate(lastDate.getDate() + 7);
            } else if (type === 'fourWeekly') {
                nextDate.setDate(lastDate.getDate() + 28);
            }
        }

        // Adjust by weekday
        if (fixedWeekDay) {
            while (nextDate.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase() !== fixedWeekDay) {
                nextDate.setDate(nextDate.getDate() + 1);
            }
        }
    }

    const remainingDays = Math.ceil((nextDate.getTime() - today.getTime()) / (24 * 60 * 60 * 1000));

    return {
        date: nextDate,
        name: name,
        remainingDays: remainingDays
    };
}