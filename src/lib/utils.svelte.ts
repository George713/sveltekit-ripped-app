import type { ScheduledEvent } from "./types";

// For automatically selecting the entire content of an input field
// For usage, add `on:focous={selectInput}` to input field
export const selectInput = (event: Event) => {
    const element = event.target as HTMLInputElement;
    element.select()
}

// Similar to `selectInput`, but for other elements
// For usage, add `on:focous={selectInput}` to input field
export const selectContent = (event: Event) => {
    window.getSelection()?.selectAllChildren(event.target as HTMLElement);
};

// For putting the focus automatically on HTMLElement
// Usage for input fields: add `on:use={focusElement}` to input field
// Usage for paragraph fields: add `use=focusElement` to paragraph field
export const focusElement = (el: HTMLInputElement | HTMLParagraphElement) => {
    el.focus()
};

/**
 * Calculates the datetime of the logical beginning of the current day or from x days ago.
 * Reminder: HYC's days run from 3am to 3am in the user's local timezone.
 * Example 1: User in UTC+0 (London)
 *      3am local time = 3am UTC
 *      The user's "day" starts at 3am UTC
 *      At 2:30am UTC, it's still "yesterday" for the user
 *      At 3:30am UTC, it's now "today" for the user
 * Example 2: User in UTC-5 (Eastern US)
 *      3am local time = 8am UTC
 *      The user's "day" starts at 8am UTC
 *      At 7:30am UTC, it's still "yesterday" for the user
 *      At 8:30am UTC, it's now "today" for the user
 * Example 3: User in UTC+9 (Japan)
 *      3am local time = 6pm (18:00) UTC
 *      The user's "day" starts at 18:00 UTC
 *      At 17:30 UTC, it's still "yesterday" for the user
 *      At 18:30 UTC, it's now "today" for the user
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
    // This if clause triggers when no measurement has been taken yet
    if (bodyfatPercentage === 999) {
        return "tbd";
    }
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
    // Default return to ensure the function always returns a string
    return "tbd";
}

export const getScheduledEvent = (
    type: string,
    name: string,
    timeZoneOffset: number,
    lastDate: Date | undefined,
    fixedWeekDay: string | undefined = undefined
): ScheduledEvent => {

    const today = getDateDayBegin(timeZoneOffset)
    let nextDate: Date

    if (!lastDate || lastDate.getTime() === new Date('1970-01-01').getTime()) {
        nextDate = today
    } else {
        // Initialize loop with last date
        nextDate = getDateBeginning(timeZoneOffset, lastDate)

        // Add periods until new date is in the future
        while (nextDate < today) {
            if (type === 'weekly') {
                nextDate.setDate(nextDate.getDate() + 7);
            } else if (type === 'fourWeekly') {
                nextDate.setDate(nextDate.getDate() + 28);
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

/**
 * Class for detecting horizontal swipe gestures
 * Usage:
 * 1. Create an instance with callbacks: const swipeDetector = new SwipeDetector({ 
 *    threshold: 50,
 *    onSwipeLeft: () => handleLeftSwipe(),
 *    onSwipeRight: () => handleRightSwipe()
 * })
 * 2. Attach event handlers directly to DOM elements:
 *    <div 
 *      ontouchstart={swipeDetector.handleTouchStart}
 *      ontouchmove={swipeDetector.handleTouchMove}
 *    >
 *    </div>
 * 3. When a swipe gesture is detected, the appropriate callback will be executed
 */
export class SwipeDetector {
    private touchStartX = $state(0);
    private threshold = $state(0);
    private onSwipeLeft: () => void;
    private onSwipeRight: () => void;

    constructor(
        { threshold = 50, onSwipeLeft = () => { }, onSwipeRight = () => { } }:
            { threshold?: number, onSwipeLeft?: () => void, onSwipeRight?: () => void }
    ) {
        this.threshold = threshold;
        this.onSwipeLeft = onSwipeLeft;
        this.onSwipeRight = onSwipeRight;
    }

    /**
     * Event handler for touchstart events
     * Attach to elements using ontouchstart={swipeDetector.handleTouchStart}
     * @param e - The TouchEvent from the browser
     */
    handleTouchStart = (e: TouchEvent) => {
        this.touchStartX = e.touches[0].clientX;
    };

    /**
     * Event handler for touchmove events
     * Attach to elements using ontouchmove={swipeDetector.handleTouchMove}
     * Detects horizontal swipes and calls the appropriate callback
     * @param e - The TouchEvent from the browser
     */
    handleTouchMove = (e: TouchEvent) => {
        const touchEndX = e.touches[0].clientX;
        const diffX = touchEndX - this.touchStartX;

        // If swiping left, trigger the left swipe callback
        if (diffX < -this.threshold && this.onSwipeLeft) {
            this.onSwipeLeft();
            this.touchStartX = touchEndX; // Reset to prevent multiple triggers
        }

        // If swiping right, trigger the right swipe callback
        if (diffX > this.threshold && this.onSwipeRight) {
            this.onSwipeRight();
            this.touchStartX = touchEndX; // Reset to prevent multiple triggers
        }
    };
}

/**
 * Handles touch interactions to detect long press events on elements
 * Use this to implement long-press functionality in touch interfaces
 */
export class PressHandler {
    longPress: (id: string | number) => void;
    pressDuration: number;
    private pressTimer: number | null = null;

    constructor({ longPress, pressDuration = 2000 }: { longPress: (elementId: string | number) => void; pressDuration?: number }) {
        this.longPress = longPress;
        this.pressDuration = pressDuration;
    }

    handleTouchDown = (elementId: string | number) => {
        this.pressTimer = window.setTimeout(() => {
            this.longPress(elementId);
            this.pressTimer = null;
        }, this.pressDuration);
    };

    handleTouchUp = () => {
        if (this.pressTimer) {
            clearTimeout(this.pressTimer);
            this.pressTimer = null;
        }
    };
}