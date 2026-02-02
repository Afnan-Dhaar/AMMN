document.addEventListener('DOMContentLoaded', function() {
  const carouselTrack = document.getElementById('glass-carousel-track');
  const container = document.querySelector('.glass-carousel-outer');
  container.addEventListener('mouseenter', () => {
    carouselTrack.style.animationPlayState = 'paused';
  });
  container.addEventListener('mouseleave', () => {
    carouselTrack.style.animationPlayState = 'running';
  });
});