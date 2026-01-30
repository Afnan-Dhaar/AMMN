// JavaScript for card navigation
const insideCards = document.querySelector(".inside-cards");
const navButtons = document.querySelectorAll(".nav-btn");
const indicatorDots = document.querySelectorAll(".indicator-dot");
 
let currentIndex = 0;
const totalCards = 2;
const cardWidth = 1100; // 1080px card + 20px gap
 
function updateCardPosition() {
  const offset = -currentIndex * cardWidth;
  insideCards.style.transform = `translateX(${offset}px)`;
 
  // Update indicator dots
  indicatorDots.forEach((dot, index) => {
    if (index === currentIndex) {
      dot.classList.add("active");
    } else {
      dot.classList.remove("active");
    }
  });
}
 
// Add click event to all navigation buttons
navButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    const action = button.getAttribute("data-action");
 
    if (action === "next" && currentIndex < totalCards - 1) {
      currentIndex++;
      updateCardPosition();
    } else if (action === "prev" && currentIndex > 0) {
      currentIndex--;
      updateCardPosition();
    }
  });
});