 const desktopQuery = window.matchMedia('(min-width: 769px)');

if (desktopQuery.matches) {
    // Desktop: Run scroll animation
    const motorObserverOptions = {
        root: null,
        threshold: [0.3, 0.6, 0.9],
        rootMargin: '0px'
    };

    let motorCardsRevealed = [false, false, false];

    const motorObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;

            const ratio = entry.intersectionRatio;
            const cards = document.querySelectorAll('.motor-insurance-card-container');

            if (ratio >= 0.3 && !motorCardsRevealed[0]) {
                cards[0].classList.add('motor-card-visible');
                motorCardsRevealed[0] = true;
            }

            if (ratio >= 0.6 && !motorCardsRevealed[1]) {
                cards[1].classList.add('motor-card-visible');
                motorCardsRevealed[1] = true;
            }

            if (ratio >= 0.9 && !motorCardsRevealed[2]) {
                cards[2].classList.add('motor-card-visible');
                motorCardsRevealed[2] = true;
            }
        });
    }, motorObserverOptions);

    const motorCardsWrapper = document.getElementById('motorCardsWrapper');
    motorObserver.observe(motorCardsWrapper);
} else {
    // Mobile: Make all cards visible immediately (no animation)
    const cards = document.querySelectorAll('.motor-insurance-card-container');
    cards.forEach(card => {
        card.classList.add('motor-card-visible');
    });
}