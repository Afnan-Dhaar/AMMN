const coverageCards = document.querySelectorAll('.coverage-card');
const totalCoverageCards = coverageCards.length;
let currentCardIndex = 1;
let carouselAutoPlay;

function updateInsuranceCarousel() {
    coverageCards.forEach((card, index) => {
        card.classList.remove('active-center', 'position-left', 'position-right', 'visibility-hidden');
        
        const cardPosition = (index - currentCardIndex + totalCoverageCards) % totalCoverageCards;
        
        if (cardPosition === 0) {
            card.classList.add('active-center');
        } else if (cardPosition === totalCoverageCards - 1) {
            card.classList.add('position-left');
        } else if (cardPosition === 1) {
            card.classList.add('position-right');
        } else {
            card.classList.add('visibility-hidden');
        }
    });
}

function nextInsuranceSlide() {
    currentCardIndex = (currentCardIndex + 1) % totalCoverageCards;
    updateInsuranceCarousel();
}

function prevInsuranceSlide() {
    currentCardIndex = (currentCardIndex - 1 + totalCoverageCards) % totalCoverageCards;
    updateInsuranceCarousel();
}

function goToInsuranceSlide(index) {
    currentCardIndex = index;
    updateInsuranceCarousel();
    resetCarouselAutoPlay();
}

function startCarouselAutoPlay() {
    carouselAutoPlay = setInterval(nextInsuranceSlide, 5000);
}

function resetCarouselAutoPlay() {
    clearInterval(carouselAutoPlay);
    startCarouselAutoPlay();
}

// Click on cards to navigate
coverageCards.forEach((card, index) => {
    card.addEventListener('click', () => {
        if (index !== currentCardIndex) {
            goToInsuranceSlide(index);
        }
    });
});

// Touch/Swipe support for mobile
let touchStartPosition = 0;
let touchEndPosition = 0;

const insuranceCarousel = document.getElementById('insuranceCarouselTrack');

insuranceCarousel.addEventListener('touchstart', (e) => {
    touchStartPosition = e.changedTouches[0].screenX;
}, { passive: true });

insuranceCarousel.addEventListener('touchend', (e) => {
    touchEndPosition = e.changedTouches[0].screenX;
    handleCarouselSwipe();
}, { passive: true });

function handleCarouselSwipe() {
    const swipeThreshold = 50;
    
    if (touchEndPosition < touchStartPosition - swipeThreshold) {
        nextInsuranceSlide();
        resetCarouselAutoPlay();
    }
    
    if (touchEndPosition > touchStartPosition + swipeThreshold) {
        prevInsuranceSlide();
        resetCarouselAutoPlay();
    }
}

// Initialize carousel
updateInsuranceCarousel();
startCarouselAutoPlay();

// Pause auto-play on hover
insuranceCarousel.addEventListener('mouseenter', () => {
    clearInterval(carouselAutoPlay);
});

insuranceCarousel.addEventListener('mouseleave', () => {
    startCarouselAutoPlay();
});
