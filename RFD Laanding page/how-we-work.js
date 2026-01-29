// Intersection Observer for scroll animations
        const motorObserverOptions = {
            root: null,
            threshold: [0.3, 0.6, 0.9],
            rootMargin: '0px'
        };

        let motorCardsRevealed = [false, false, false];

        const motorObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const ratio = entry.intersectionRatio;
                    const cards = document.querySelectorAll('.motor-insurance-card-container');
                    
                    // Reveal cards based on intersection ratio
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
                }
            });
        }, motorObserverOptions);

        // Observe the cards wrapper
        const motorCardsWrapper = document.getElementById('motorCardsWrapper');
        motorObserver.observe(motorCardsWrapper);