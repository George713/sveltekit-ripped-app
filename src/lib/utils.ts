export const selectInput = (event: Event) => {
    const element = event.target as HTMLInputElement;
    element.select()
}

// For putting the focus automatically on input field
export const focusElement = (el: HTMLInputElement) => {
    el.focus();
};

// Evaluates whether it is between midnight and 3am in a given timezone.
export const isBetweenMidnightAnd3AM = (timeZoneOffset: number) => {
    const now = new Date();
    const utcHours = now.getUTCHours();
    const localTimeHours = (utcHours + timeZoneOffset) % 24;
    return localTimeHours >= 0 && localTimeHours < 3;
}

/**
 * Calculates the datetime of the logical beginning of the current day.
 * Reminder: HYC's days run from 3am to 3am in the user's local timezone.
 */
export const getDateDayBegin = (timeZoneOffset: number) => {
    const beginningHour = (3 - timeZoneOffset + 24) % 24 // Add 24 so that expression in front of modulo is always positive
    const now = new Date()
    const yesterday = new Date(now.getTime() - (24 * 60 * 60 * 1000)) // getTime() is in units of milliseconds
    let dateDayBegin: Date
    // If the utc hour is before the logical beginning hour, use yesterday's date
    if (now.getUTCHours() >= beginningHour) {
        dateDayBegin = now
    }
    else {
        dateDayBegin = yesterday
    }
    return new Date(dateDayBegin.setUTCHours(beginningHour, 0, 0, 0))
}