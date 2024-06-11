export const selectInput = (event: Event) => {
    const element = event.target as HTMLInputElement;
    element.select()
}

// For putting the focus automatically on input field
export const focusElement = (el: HTMLInputElement) => {
    el.focus();
};