document.addEventListener('DOMContentLoaded', function() {
  const cardsWrapper = document.getElementById('cardsWrapper');
  const cards = Array.from(cardsWrapper.children);

  // Clone cards multiple times for seamless infinite scroll
  const cloneCount = 4;
  for (let i = 0; i < cloneCount; i++) {
    cards.forEach(card => {
      const clone = card.cloneNode(true);
      cardsWrapper.appendChild(clone);
    });
  }

  let scrollPosition = 0;
  const cardWidth = 510;
  const gap = 30;
  const scrollSpeed = 0.8; // Adjust this for speed (0.5 = slow, 2 = fast)
  const cardSet = cards.length * (cardWidth + gap);

  let animationId;
  let isPaused = false;

  function animate() {
    if (!isPaused) {
      scrollPosition += scrollSpeed;
      
      if (scrollPosition >= cardSet) {
        scrollPosition = 0;
      }
      
      cardsWrapper.style.transform = `translateX(-${scrollPosition}px)`;
    }
    
    animationId = requestAnimationFrame(animate);
  }

  animate();

  // Pause on hover
  cardsWrapper.addEventListener('mouseenter', () => {
    isPaused = true;
  });

  cardsWrapper.addEventListener('mouseleave', () => {
    isPaused = false;
  });
});
