function updateSlickDots() {
    console.log('Updating slick dotss');
    const leftSideMargin = document.querySelector('.slide-heading .top');
    const leftOffset = leftSideMargin
        ? leftSideMargin.getBoundingClientRect().left + window.scrollX
        : 0;
    console.log('2Left offset:', window.innerWidth);
    if (window.innerWidth > 600) {
        const leftSides = document.querySelectorAll('.slick-dots');
        console.log("leftSides", leftSides)
        let firstVisibleElement = null;

        // Find the first visible element
        for (let i = 0; i < leftSides.length; i++) {
            const element = leftSides[i];
            if (element.offsetParent !== null) { // offsetParent is null if the element is hidden
                firstVisibleElement = element;
                break; // Exit the loop once the first visible element is found
            }
        }

        // Apply the margin to the first visible element, if found
        if (firstVisibleElement) {
            firstVisibleElement.style.marginLeft = `${leftOffset}px`;
        }
    }
}
updateSlickDots();
// Call updateSlickDots after the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function () {
    updateSlickDots();
    // Recalculate on resize
    window.addEventListener('resize', updateSlickDots);
});