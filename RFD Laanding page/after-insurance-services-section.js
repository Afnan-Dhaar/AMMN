        const afterInsuranceServicesData = [
            {
                logo: 'media/images/Vector.png',
                logoType: 'image',
                logoClass: 'after-insurance-morni',
                title: 'Roadside Assistance by Morni',
                description: 'Get reliable roadside assistance services including towing, breakdown support, and emergency help across Saudi Arabia.',
                class: 'after-insurance-card-morni'
            },
            {
                logo: 'media/images/Vector.png',
                logoType: 'image',
                logoClass: 'after-insurance-nana',
                title: 'Fuel & Vehicle Services by NaNa',
                description: 'Convenient fuel delivery and vehicle-related services designed to keep you moving without delays.',
                class: 'after-insurance-card-nana'
            },
            {
                logo: 'media/images/Vector.png',
                logoType: 'image',
                logoClass: 'after-insurance-morni',
                title: 'Roadside Assistance by Morni',
                description: 'Get reliable roadside assistance services including towing, breakdown support, and emergency help across Saudi Arabia.',
                class: 'after-insurance-card-morni'
            },
            {
                logo: 'media/images/Vector.png',
                logoType: 'image',
                logoClass: 'after-insurance-nana',
                title: 'Fuel & Vehicle Services by NaNa',
                description: 'Convenient fuel delivery and vehicle-related services designed to keep you moving without delays.',
                class: 'after-insurance-card-nana'
            }
        ];

        const afterInsuranceCarousel = document.getElementById('afterInsuranceCarouselTrack');
        const afterInsuranceIndicatorsContainer = document.getElementById('afterInsuranceIndicators');
        
        let afterInsuranceCurrentIndex = 0;
        let afterInsuranceAutoPlayInterval;
        let afterInsuranceIsDragging = false;
        let afterInsuranceStartPos = 0;
        let afterInsuranceCurrentTranslate = 0;
        let afterInsurancePrevTranslate = 0;
        let afterInsuranceAnimationID = 0;

        // Create slides with clones for infinite loop
        function afterInsuranceCreateSlides() {
            const slides = [...afterInsuranceServicesData, ...afterInsuranceServicesData, ...afterInsuranceServicesData];
            
            afterInsuranceCarousel.innerHTML = slides.map((service, index) => `
                <div class="after-insurance-carousel-slide">
                    <div class="after-insurance-service-card ${service.class}">
                        <div class="after-insurance-logo-wrapper">
                            ${service.logoType === 'image' 
                                ? `<img src="${service.logo}" alt="${service.title} logo">` 
                                : `<span class="after-insurance-logo-text ${service.logoClass}">${service.logo}</span>`
                            }
                        </div>
                        <h2>${service.title}</h2>
                        <p>${service.description}</p>
                        <button class="after-insurance-know-more-btn">
                            Know More
                            <span class="after-insurance-arrow-icon">→</span>
                        </button>
                    </div>
                </div>
            `).join('');

            // Create indicators based on original data length
            afterInsuranceIndicatorsContainer.innerHTML = afterInsuranceServicesData.map((_, index) => 
                `<div class="after-insurance-indicator-dot ${index === 0 ? 'after-insurance-dot-active' : ''}" data-index="${index}"></div>`
            ).join('');

            // Add click events to indicators
            document.querySelectorAll('.after-insurance-indicator-dot').forEach(indicator => {
                indicator.addEventListener('click', () => {
                    const index = parseInt(indicator.getAttribute('data-index'));
                    afterInsuranceGoToSlide(index);
                });
            });

            // Start from the middle set
            afterInsuranceCurrentIndex = afterInsuranceServicesData.length;
            afterInsuranceUpdateCarousel(false);
        }

        function afterInsuranceUpdateCarousel(animate = true) {
            const slideWidth = 620; // 600px width + 20px margin
            const offset = -afterInsuranceCurrentIndex * slideWidth;
            
            afterInsuranceCarousel.style.transition = animate ? 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)' : 'none';
            afterInsuranceCarousel.style.transform = `translateX(${offset}px)`;
            
            afterInsuranceUpdateIndicators();
        }

        function afterInsuranceUpdateIndicators() {
            const realIndex = afterInsuranceCurrentIndex % afterInsuranceServicesData.length;
            document.querySelectorAll('.after-insurance-indicator-dot').forEach((indicator, index) => {
                indicator.classList.toggle('after-insurance-dot-active', index === realIndex);
            });
        }

        function afterInsuranceNextSlide() {
            afterInsuranceCurrentIndex++;
            afterInsuranceUpdateCarousel();
            
            // Reset to middle set when reaching end
            if (afterInsuranceCurrentIndex >= afterInsuranceServicesData.length * 2) {
                setTimeout(() => {
                    afterInsuranceCurrentIndex = afterInsuranceServicesData.length;
                    afterInsuranceUpdateCarousel(false);
                }, 500);
            }
        }

        function afterInsuranceGoToSlide(index) {
            afterInsuranceCurrentIndex = afterInsuranceServicesData.length + index;
            afterInsuranceUpdateCarousel();
            afterInsuranceResetAutoPlay();
        }

        function afterInsuranceStartAutoPlay() {
            afterInsuranceAutoPlayInterval = setInterval(afterInsuranceNextSlide, 5000);
        }

        function afterInsuranceResetAutoPlay() {
            clearInterval(afterInsuranceAutoPlayInterval);
            afterInsuranceStartAutoPlay();
        }

        // Touch and mouse events
        function afterInsuranceTouchStart(index) {
            return function(event) {
                afterInsuranceIsDragging = true;
                afterInsuranceStartPos = event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
                afterInsuranceAnimationID = requestAnimationFrame(afterInsuranceAnimation);
                afterInsuranceCarousel.style.cursor = 'grabbing';
            }
        }

        function afterInsuranceTouchMove(event) {
            if (afterInsuranceIsDragging) {
                const currentPosition = event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
                afterInsuranceCurrentTranslate = afterInsurancePrevTranslate + currentPosition - afterInsuranceStartPos;
            }
        }

        function afterInsuranceTouchEnd() {
            afterInsuranceIsDragging = false;
            cancelAnimationFrame(afterInsuranceAnimationID);
            
            const movedBy = afterInsuranceCurrentTranslate - afterInsurancePrevTranslate;
            const slideWidth = 620; // 600px width + 20px margin
            
            if (movedBy < -slideWidth / 4) {
                afterInsuranceCurrentIndex++;
            } else if (movedBy > slideWidth / 4) {
                afterInsuranceCurrentIndex--;
            }
            
            // Handle infinite loop
            if (afterInsuranceCurrentIndex >= afterInsuranceServicesData.length * 2) {
                afterInsuranceCurrentIndex = afterInsuranceServicesData.length;
            } else if (afterInsuranceCurrentIndex < afterInsuranceServicesData.length) {
                afterInsuranceCurrentIndex = afterInsuranceServicesData.length * 2 - 1;
            }
            
            afterInsuranceCurrentTranslate = 0;
            afterInsurancePrevTranslate = 0;
            afterInsuranceUpdateCarousel();
            afterInsuranceCarousel.style.cursor = 'grab';
            afterInsuranceResetAutoPlay();
        }

        function afterInsuranceAnimation() {
            if (afterInsuranceIsDragging) {
                const slideWidth = 620; // 600px width + 20px margin
                const baseOffset = -afterInsuranceCurrentIndex * slideWidth;
                afterInsuranceCarousel.style.transform = `translateX(${baseOffset + afterInsuranceCurrentTranslate}px)`;
                requestAnimationFrame(afterInsuranceAnimation);
            }
        }

        // Event listeners
        afterInsuranceCarousel.addEventListener('mousedown', afterInsuranceTouchStart(0));
        afterInsuranceCarousel.addEventListener('touchstart', afterInsuranceTouchStart(0), { passive: true });
        afterInsuranceCarousel.addEventListener('mousemove', afterInsuranceTouchMove);
        afterInsuranceCarousel.addEventListener('touchmove', afterInsuranceTouchMove, { passive: true });
        afterInsuranceCarousel.addEventListener('mouseup', afterInsuranceTouchEnd);
        afterInsuranceCarousel.addEventListener('touchend', afterInsuranceTouchEnd);
        afterInsuranceCarousel.addEventListener('mouseleave', () => {
            if (afterInsuranceIsDragging) afterInsuranceTouchEnd();
        });

        // Prevent default drag behavior
        afterInsuranceCarousel.addEventListener('dragstart', (e) => e.preventDefault());

        // Initialize
        afterInsuranceCreateSlides();
        afterInsuranceStartAutoPlay();

        // Handle window resize
        let afterInsuranceResizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(afterInsuranceResizeTimer);
            afterInsuranceResizeTimer = setTimeout(() => {
                afterInsuranceUpdateCarousel(false);
            }, 250);
        });
    