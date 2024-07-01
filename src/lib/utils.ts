export const selectInput = (event: Event) => {
    const element = event.target as HTMLInputElement;
    element.select()
}

// For putting the focus automatically on input field
export const focusElement = (el: HTMLInputElement) => {
    el.focus();
};

/**
 * Calculates the datetime of the logical beginning of the current day.
 * Reminder: HYC's days run from 3am to 3am in the user's local timezone.
 */
export const getDateDayBegin = (timeZoneOffset: number) => {
    const beginningHour = (3 - timeZoneOffset + 24) % 24 // Add 24 so that expression in front of modulo is always positive
    const now = new Date()
    const yesterday = new Date(now.getTime() - (24 * 60 * 60 * 1000)) // getTime() is in units of milliseconds
    // If the utc hour is before the logical beginning hour, use yesterday's date
    if (now.getUTCHours() >= beginningHour) {
        return new Date(now.setUTCHours(beginningHour, 0, 0, 0))
    }
    else {
        return new Date(yesterday.setUTCHours(beginningHour, 0, 0, 0))
    }

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
}