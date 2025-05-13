function updateSlickDots() {
    console.log('Updating slick dots');
    const leftSideMargin = document.querySelector('.slide-heading .top');
    const leftOffset = leftSideMargin
        ? leftSideMargin.getBoundingClientRect().left + window.scrollX
        : 0;
    if (window.innerWidth > 600) {
        const leftSides = document.querySelectorAll('.slideshow-wrapper .slick-dots');
        leftSides.forEach(el => {
            el.style.marginLeft = `${leftOffset}px`;
        });
    }
}
updateSlickDots();
// Recalculate on resize
window.addEventListener('resize', updateSlickDots);
