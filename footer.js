        // Add smooth hover animations
        document.querySelectorAll('.footer-links a').forEach(link => {
            link.addEventListener('mouseenter', function() {
                this.style.paddingLeft = '5px';
            });
            link.addEventListener('mouseleave', function() {
                this.style.paddingLeft = '0';
            });
        });

        // Social icons click handlers
        document.querySelectorAll('.social-icon').forEach(icon => {
            icon.addEventListener('click', function() {
                this.style.transform = 'scale(0.9)';
                setTimeout(() => {
                    this.style.transform = 'translateY(-3px)';
                }, 100);
            });
        });

        // QR code hover effect
        document.querySelectorAll('.qr-box').forEach(box => {
            box.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.05)';
                this.style.transition = 'transform 0.3s';
            });
            box.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1)';
            });
        });
