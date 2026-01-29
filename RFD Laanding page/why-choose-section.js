        const cards = [
            {
                icon: 'media/icons/Framewhy.svg',
                title: 'Fast and Online Quotes',
                description: 'Instantly compare multiple providers on our platform to find the policy that fits your budget.'
            },
            {
                icon: 'media/icons/Framewhy.svg',
                title: 'Dedicated Customer Support',
                description: 'Our team is here to help you with claims, renewals, and any questions anytime you need us.'
            },
            {
                icon: 'media/icons/Framewhy.svg',
                title: 'Secure & Easy Purchase',
                description: 'Complete your motor insurance purchase online with safe payment options and instant policy delivery.'
            },
            {
                icon: 'media/icons/Framewhy.svg',
                title: 'Trusted by Thousands',
                description: 'Join thousands of satisfied customers who trust AMMN for their insurance needs and gets satisfied by our services.'
            }
        ];

        let currentIndex = 0;
        const track = document.getElementById('why-choose-carouselTrack');

        function createCard(card) {
            const div = document.createElement('div');
            div.className = 'carousel-card';
            div.innerHTML = `
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

        function updateCarousel() {
            track.innerHTML = '';

            const prev = (currentIndex - 1 + cards.length) % cards.length;
            const next = (currentIndex + 1) % cards.length;

            const left = createCard(cards[prev]);
            left.classList.add('left');

            const center = createCard(cards[currentIndex]);
            center.classList.add('center');

            const right = createCard(cards[next]);
            right.classList.add('right');

            track.append(left, center, right);
        }

        function move(dir) {
            currentIndex =
                dir === 'next'
                    ? (currentIndex + 1) % cards.length
                    : (currentIndex - 1 + cards.length) % cards.length;

            updateCarousel();
        }

        /* SWIPE SUPPORT */
        let startX = 0;
        let isDown = false;

        track.addEventListener('pointerdown', e => {
            isDown = true;
            startX = e.clientX;
        });

        track.addEventListener('pointerup', e => {
            if (!isDown) return;
            const diff = e.clientX - startX;
            if (diff > 50) move('prev');
            if (diff < -50) move('next');
            isDown = false;
        });

        track.addEventListener('pointerleave', () => isDown = false);

        /* Auto play - moves every 5 seconds (no stop on hover) */
        setInterval(() => move('next'), 5000);

        updateCarousel();
