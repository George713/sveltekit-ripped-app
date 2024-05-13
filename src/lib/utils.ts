export const selectInput = (event: Event) => {
    const element = event.target as HTMLInputElement;
    element.select()
}