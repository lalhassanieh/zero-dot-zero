function updateSlickDots() {
  console.log('Updating slick dots::');
  const leftSideMargin = document.querySelector('.slide-heading .top');
  const leftOffset = leftSideMargin
    ? leftSideMargin.getBoundingClientRect().left + window.scrollX
    : 0;
  console.log('Left offset:', window.innerWidth);
  if (window.innerWidth > 600) {
    const leftSides = document.querySelectorAll('.slideshow-wrapper .slick-dots');
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
  } else {
        const leftSides = document.querySelectorAll('.slideshow-wrapper .slick-dots');
        leftSides.forEach(el => {
             el.style.marginLeft = `0px`;
        });
  }
}

function checkAndUpdate() {
    const slickDots = document.querySelectorAll('.slideshow-wrapper .slick-dots');
    if (slickDots.length > 0) {
        updateSlickDots();
    } else {
        setTimeout(checkAndUpdate, 50); // Check again after a short delay
    }
}

// Call updateSlickDots after the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
  checkAndUpdate(); // Start checking for .slick-dots
  // Recalculate on resize
  window.addEventListener('resize', updateSlickDots);
});
