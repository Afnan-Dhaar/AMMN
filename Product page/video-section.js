        function animateCounter() {
            const counter = document.getElementById('downloadCount');
            const target = 8000; // 8K+ downloads
            const duration = 2000; // 2 seconds
            const increment = target / (duration / 16); // 60fps
            let current = 0;

            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    counter.textContent = '8K+';
                    clearInterval(timer);
                } else {
                    counter.textContent = Math.floor(current / 1000) + 'K+';
                }
            }, 16);
        }

        // Intersection Observer for counter animation
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        observer.observe(document.getElementById('videoCard'));

        // Play Button Click Handler
        const playButton = document.getElementById('playButton');
        const videoCard = document.getElementById('videoCard');

        playButton.addEventListener('click', () => {
            // You can add video player functionality here
            alert('Video player would open here. Replace this with your video URL or video player modal.');
            
            // Example: Replace image with video
            // const videoElement = document.createElement('video');
            // videoElement.src = 'your-video.mp4';
            // videoElement.controls = true;
            // videoElement.autoplay = true;
            // videoElement.className = 'video-background';
            // videoCard.querySelector('.video-background').replaceWith(videoElement);
        });

        // App Badge Click Handlers
        const appBadges = document.querySelectorAll('.app-badge');
        appBadges.forEach(badge => {
            badge.addEventListener('click', () => {
                // Add your app store links here
                console.log('Redirect to app store');
            });
        });
