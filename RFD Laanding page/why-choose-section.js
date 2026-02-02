  const cards = [
            { icon: './assets/icon3.svg', title: 'Fast and Online Quotes', description: 'Instantly compare multiple providers on our platform to find the policy that fits your budget.' },
            { icon: './assets/icon3.svg', title: 'Secure & Easy Purchase', description: 'Complete your motor insurance purchase online with safe payment options and instant policy delivery.' },
            { icon: './assets/icon3.svg', title: 'Trusted by Thousands', description: 'Thousands trust AMMN services.' }
        ];

        let currentIndex = 0;
        let isTransitioning = false;
        const track = document.getElementById('why-choose-carouselTrack');

        // Touch/Swipe variables
        let touchStartX = 0;
        let touchEndX = 0;
        let touchStartY = 0;
        let touchEndY = 0;

        function createCard(card, dataIndex) {
            const div = document.createElement('div');
            div.className = 'carousel-card';
            div.dataset.realIndex = dataIndex;
            div.innerHTML = `
                <div class="soft-glow glow-top-left"></div>
                <div class="soft-glow glow-bottom-right"></div>
                <div class="card-icon">
                    <img src="${card.icon}" alt="${card.title}">
                </div>
                <div class="card-content">
                    <h3 class="card-title">${card.title}</h3>
                    <p class="card-description">${card.description}</p>
                </div>
            `;
            return div;
        }

        function setupTrack() {
            track.innerHTML = '';
            
            // For 3 cards, we need more clones for smooth infinite scroll
            // Add multiple clones before
            for (let i = 0; i < 2; i++) {
                cards.forEach((card, idx) => {
                    track.appendChild(createCard(card, idx));
                });
            }
            
            // Add all real cards
            cards.forEach((card, i) => {
                track.appendChild(createCard(card, i));
            });
            
            // Add multiple clones after
            for (let i = 0; i < 2; i++) {
                cards.forEach((card, idx) => {
                    track.appendChild(createCard(card, idx));
                });
            }
            
            // Start at the middle set of cards (first real card)
            currentIndex = cards.length * 2;
        }

        function getRealIndex() {
            // Convert currentIndex to real card index (0 to cards.length-1)
            return currentIndex % cards.length;
        }

        function updateActiveState() {
            const cardEls = track.querySelectorAll('.carousel-card');
            const realIndex = getRealIndex();
            
            cardEls.forEach((el, idx) => {
                const elRealIndex = parseInt(el.dataset.realIndex);
                const shouldBeActive = elRealIndex === realIndex;
                el.classList.toggle('active', shouldBeActive);
            });
        }

        function updateActiveStateInstant() {
            const cardEls = track.querySelectorAll('.carousel-card');
            const realIndex = getRealIndex();
            
            cardEls.forEach((el, idx) => {
                const elRealIndex = parseInt(el.dataset.realIndex);
                const shouldBeActive = elRealIndex === realIndex;
                if (shouldBeActive) {
                    el.classList.add('active');
                } else {
                    el.classList.remove('active');
                }
            });
        }

        function updateTransform(animate = true) {
            const cardEls = track.querySelectorAll('.carousel-card');
            if (!cardEls.length) return;

            const containerWidth = track.parentElement.clientWidth;
            const card = cardEls[0];
            
            // Get card width and margins
            const cardWidth = card.offsetWidth;
            const cardStyle = getComputedStyle(card);
            const marginLeft = parseFloat(cardStyle.marginLeft) || 0;
            const marginRight = parseFloat(cardStyle.marginRight) || 0;
            const totalCardWidth = cardWidth + marginLeft + marginRight;
            
            // Calculate offset to center the active card
            const centerOffset = (containerWidth / 2) - (cardWidth / 2) - marginLeft;
            
            // Move track so that currentIndex card is centered
            const translateX = -currentIndex * totalCardWidth + centerOffset;
            
            if (!animate) {
                track.style.transition = 'none';
                track.style.transform = `translateX(${translateX}px)`;
                void track.offsetWidth; // Force reflow
                track.style.transition = 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            } else {
                track.style.transform = `translateX(${translateX}px)`;
            }
        }

        function goToSlide(realIndex) {
            if (isTransitioning) return;
            const diff = realIndex - getRealIndex();
            currentIndex += diff;
            slide();
        }

        function nextSlide() {
            if (isTransitioning) return;
            currentIndex++;
            slide();
        }

        function prevSlide() {
            if (isTransitioning) return;
            currentIndex--;
            slide();
        }

        function slide() {
            isTransitioning = true;
            updateActiveState();
            updateTransform(true);
        }

        // Handle infinite loop seamlessly
        track.addEventListener('transitionend', () => {
            const totalCards = track.querySelectorAll('.carousel-card').length;
            
            // If we've gone too far forward, jump back to middle section
            if (currentIndex >= totalCards - cards.length) {
                track.style.transition = 'none';
                currentIndex = currentIndex - cards.length;
                
                const cardEls = track.querySelectorAll('.carousel-card');
                const containerWidth = track.parentElement.clientWidth;
                const card = cardEls[0];
                const cardWidth = card.offsetWidth;
                const cardStyle = getComputedStyle(card);
                const marginLeft = parseFloat(cardStyle.marginLeft) || 0;
                const marginRight = parseFloat(cardStyle.marginRight) || 0;
                const totalCardWidth = cardWidth + marginLeft + marginRight;
                const centerOffset = (containerWidth / 2) - (cardWidth / 2) - marginLeft;
                const translateX = -currentIndex * totalCardWidth + centerOffset;
                
                track.style.transform = `translateX(${translateX}px)`;
                updateActiveStateInstant();
                
                void track.offsetWidth;
                track.style.transition = 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            }
            // If we've gone too far backward, jump forward to middle section
            else if (currentIndex < cards.length) {
                track.style.transition = 'none';
                currentIndex = currentIndex + cards.length;
                
                const cardEls = track.querySelectorAll('.carousel-card');
                const containerWidth = track.parentElement.clientWidth;
                const card = cardEls[0];
                const cardWidth = card.offsetWidth;
                const cardStyle = getComputedStyle(card);
                const marginLeft = parseFloat(cardStyle.marginLeft) || 0;
                const marginRight = parseFloat(cardStyle.marginRight) || 0;
                const totalCardWidth = cardWidth + marginLeft + marginRight;
                const centerOffset = (containerWidth / 2) - (cardWidth / 2) - marginLeft;
                const translateX = -currentIndex * totalCardWidth + centerOffset;
                
                track.style.transform = `translateX(${translateX}px)`;
                updateActiveStateInstant();
                
                void track.offsetWidth;
                track.style.transition = 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            }
            
            isTransitioning = false;
        });

        // Auto-rotate every 5 seconds
        let autoRotateInterval;
        function startAuto() {
            autoRotateInterval = setInterval(nextSlide, 5000);
        }
        function stopAuto() {
            clearInterval(autoRotateInterval);
        }

        track.addEventListener('mouseenter', stopAuto);
        track.addEventListener('mouseleave', () => {
            stopAuto();
            startAuto();
        });

        // Keyboard navigation
        document.addEventListener('keydown', e => {
            if (e.key === 'ArrowLeft') {
                prevSlide();
                stopAuto();
                startAuto();
            } else if (e.key === 'ArrowRight') {
                nextSlide();
                stopAuto();
                startAuto();
            }
        });

        // Touch/Swipe functionality
        track.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
            touchStartY = e.changedTouches[0].screenY;
            stopAuto();
        }, { passive: true });

        track.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            touchEndY = e.changedTouches[0].screenY;
            handleSwipe();
            startAuto();
        }, { passive: true });

        function handleSwipe() {
            const swipeThreshold = 50;
            const diffX = touchStartX - touchEndX;
            const diffY = Math.abs(touchStartY - touchEndY);
            
            if (Math.abs(diffX) > swipeThreshold && Math.abs(diffX) > diffY) {
                if (diffX > 0) {
                    nextSlide();
                } else {
                    prevSlide();
                }
            }
        }

        // Mouse drag functionality (for desktop)
        let isDragging = false;
        let startX = 0;
        let currentDragX = 0;

        track.addEventListener('mousedown', (e) => {
            isDragging = true;
            startX = e.pageX;
            track.style.cursor = 'grabbing';
            stopAuto();
        });

        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            currentDragX = e.pageX;
        });

        document.addEventListener('mouseup', (e) => {
            if (!isDragging) return;
            isDragging = false;
            track.style.cursor = 'grab';
            
            const diffX = startX - currentDragX;
            const swipeThreshold = 50;
            
            if (Math.abs(diffX) > swipeThreshold) {
                if (diffX > 0) {
                    nextSlide();
                } else {
                    prevSlide();
                }
            }
            
            startAuto();
        });

        // Init
        setupTrack();
        updateActiveState();
        updateTransform(false);
        startAuto();

        // Handle window resize
        window.addEventListener('resize', () => {
            updateTransform(false);
        });