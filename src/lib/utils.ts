export const selectInput = (event: Event) => {
    const element = event.target as HTMLInputElement;
    element.focus()
    element.select()
}

// For putting the focus automatically on input field
export const focusElement = (el: HTMLElement) => {
    Promise.resolve().then(() => {
        el.focus();
    })
};