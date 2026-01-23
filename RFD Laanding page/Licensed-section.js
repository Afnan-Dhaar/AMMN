        const licensedSlidesData = [
            {
                image: 'media/images/1 (2).png',
                title: 'Commercial Registration Certificate',
                description: 'We maintain a valid commercial registration that legally permits our business activities as an insurance broker within the Kingdom.',
                certificate: 'CR 8620170GAN3'
            },
            {
                image: 'media/images/1 (2).png',
                title: 'Insurance Broker License',
                description: 'We maintain a valid commercial registration that legally permits our business activities as an insurance broker within the Kingdom.',
                certificate: 'License No. 12345678'
            },
            {
                image: 'media/images/1 (2).png',
                title: 'Saudi Central Bank Authorization',
                description: 'We maintain a valid commercial registration that legally permits our business activities as an insurance broker within the Kingdom.',
                certificate: 'Auth No. SAMA2024'
            }
        ];

        const licensedSlideContainer = document.getElementById('licensedSlideContainer');
        const licensedSlideInfo = document.getElementById('licensedSlideInfo');
        const licensedPrevBtn = document.getElementById('licensedPrevBtn');
        const licensedNextBtn = document.getElementById('licensedNextBtn');

        let licensedCurrentIndex = 0;

        function licensedCreateSlides() {
            licensedSlideContainer.innerHTML = licensedSlidesData.map((slide, index) => `
                <div class="licensed-insurance-slide ${index === 0 ? 'licensed-active' : ''}">
                    <img src="${slide.image}" alt="${slide.title}">
                </div>
            `).join('');
            licensedUpdateSlideInfo();
        }

        function licensedUpdateSlideInfo() {
            const currentSlide = licensedSlidesData[licensedCurrentIndex];
            licensedSlideInfo.innerHTML = `
                <div class="licensed-insurance-title-row">
                    <h3>${currentSlide.title}</h3>
                    <span class="licensed-certificate-number">${currentSlide.certificate}</span>
                </div>
                <p>${currentSlide.description}</p>
            `;
        }

        function licensedChangeSlide(direction) {
            const slides = document.querySelectorAll('.licensed-insurance-slide');
            
            // Remove active class from current slide (starts fade out)
            slides[licensedCurrentIndex].classList.remove('licensed-active');

            // Update index
            if (direction === 'next') {
                licensedCurrentIndex = (licensedCurrentIndex + 1) % licensedSlidesData.length;
            } else {
                licensedCurrentIndex = (licensedCurrentIndex - 1 + licensedSlidesData.length) % licensedSlidesData.length;
            }

            // Add active class to new slide (starts fade in)
            slides[licensedCurrentIndex].classList.add('licensed-active');
            
            // Update text
            licensedUpdateSlideInfo();
        }

        licensedNextBtn.addEventListener('click', () => licensedChangeSlide('next'));
        licensedPrevBtn.addEventListener('click', () => licensedChangeSlide('prev'));

        // Initialize
        licensedCreateSlides();