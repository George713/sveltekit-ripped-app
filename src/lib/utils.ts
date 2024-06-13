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