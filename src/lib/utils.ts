export const selectInput = (event: Event) => {
    const element = event.target as HTMLInputElement;
    element.select()
}

// For putting the focus automatically on input field
export const focusElement = (el: HTMLInputElement) => {
    el.focus();
};

// Evaluates whether it is between midnight and 3am in a given timezone.
export const isBetweenMidnightAnd3AM = (timeZone: string) => {
    const date = new Date();
    const options = { timeZone };
    const hours = parseInt(date.toLocaleString('en-GB', { hour: 'numeric', ...options }))

    return hours >= 0 && hours < 3;
}