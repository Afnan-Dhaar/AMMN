
const licensedSlidesData = [
  {
    image: "assets/license 1.png",
    title: "Registration Certificate",
    description:
      "We maintain a valid commercial registration that legally permits our business activities as an insurance broker within the Kingdom.",
    certificate: "CR 862017GCAN3",
  },
  {
    image: "assets/license 2.png",
    title: "Insurance Broker License",
    description:
      "We maintain a valid commercial registration that legally permits our business activities as an insurance broker within the Kingdom.",
    certificate: "License No. 12345678",
  },
  // {
  //   image: "media/images/1 (2).png",
  //   title: "Saudi Central Bank Authorization",
  //   description:
  //     "We maintain a valid commercial registration that legally permits our business activities as an insurance broker within the Kingdom.",
  //   certificate: "Auth No. SAMA2024",
  // },
];

  const licensedSlideContainer = document.getElementById(
        "licensedSlideContainer",
      );
      const licensedSlideInfo = document.getElementById("licensedSlideInfo");
      const licensedPrevBtn = document.getElementById("licensedPrevBtn");
      const licensedNextBtn = document.getElementById("licensedNextBtn");
 
      let licensedCurrentIndex = 0;
      let isAnimating = false;
 
      /* ─── Build slides once ─── */
      function licensedCreateSlides() {
        licensedSlideContainer.innerHTML = licensedSlidesData
          .map(
            (slide, i) =>
              `<div class="licensed-insurance-slide" data-index="${i}">
                 <img src="${slide.image}" alt="${slide.title}" />
               </div>`,
          )
          .join("");
 
        licensedApplyPositions(); // set initial stacking
        licensedUpdateSlideInfo();
      }
 
      /* ─── Assign front / back classes based on current index ─── */
      function licensedApplyPositions() {
        const slides = licensedSlideContainer.querySelectorAll(
          ".licensed-insurance-slide",
        );
        slides.forEach((slide, i) => {
          // Strip every positioning / animation class first
          slide.classList.remove(
            "licensed-pos-front",
            "licensed-pos-back",
            "licensed-slide-exit-left",
            "licensed-slide-enter-right",
            "licensed-slide-exit-right",
            "licensed-slide-enter-left",
          );
 
          if (i === licensedCurrentIndex) {
            slide.classList.add("licensed-pos-front");
          } else {
            slide.classList.add("licensed-pos-back");
          }
        });
      }
 
      /* ─── Update the text block ─── */
      function licensedUpdateSlideInfo() {
        const cur = licensedSlidesData[licensedCurrentIndex];
        licensedSlideInfo.innerHTML = `
          <div class="licensed-insurance-title-row">
            <h3>${cur.title}</h3>
            <span class="licensed-certificate-number">${cur.certificate}</span>
          </div>
          <p>${cur.description}</p>`;
      }
 
      /* ─── Animate & change slide ─── */
      function licensedChangeSlide(direction) {
        if (isAnimating) return; // block rapid clicks
        isAnimating = true;
 
        const slides = licensedSlideContainer.querySelectorAll(
          ".licensed-insurance-slide",
        );
        const oldIndex = licensedCurrentIndex;
 
        // Calculate new index
        const newIndex =
          direction === "next"
            ? (oldIndex + 1) % licensedSlidesData.length
            : (oldIndex - 1 + licensedSlidesData.length) %
              licensedSlidesData.length;
 
        const oldSlide = slides[oldIndex];
        const newSlide = slides[newIndex];
 
        // Strip static position classes
        oldSlide.classList.remove("licensed-pos-front", "licensed-pos-back");
        newSlide.classList.remove("licensed-pos-front", "licensed-pos-back");
 
        if (direction === "next") {
          // Old front exits left, new slide enters from right into back position,
          // then instantly becomes front after animation ends.
          oldSlide.classList.add("licensed-slide-exit-left");
          newSlide.classList.add("licensed-slide-enter-right");
        } else {
          // Old front exits right, new enters from left into front.
          oldSlide.classList.add("licensed-slide-exit-right");
          newSlide.classList.add("licensed-slide-enter-left");
        }
 
        licensedCurrentIndex = newIndex;
        licensedUpdateSlideInfo();
 
        // After animation finishes, clean up and set proper positions
        setTimeout(() => {
          licensedApplyPositions();
          isAnimating = false;
        }, 580); // slightly > animation duration
      }
 
      licensedNextBtn.addEventListener("click", () =>
        licensedChangeSlide("next"),
      );
      licensedPrevBtn.addEventListener("click", () =>
        licensedChangeSlide("prev"),
      );
 
      licensedCreateSlides();
 
