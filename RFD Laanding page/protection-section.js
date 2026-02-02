
      const xyz_slides = [
        {
          title: "Motor Insurance",
          description:
            "Motor insurance provides essential protection for all motor vehicles, covering repairs, accidents, breakdowns, and unexpected emergencies.",
          image:
            "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&h=600&fit=crop",
        },
        {
          title: "Health Insurance",
          description:
            "Comprehensive health coverage for you and your family, including hospitalization, medical treatments, and preventive care services.",
          image:
            "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop",
        },
        {
          title: "Life Insurance",
          description:
            "Secure your family's future with comprehensive life insurance plans that provide financial protection and peace of mind.",
          image:
            "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800&h=600&fit=crop",
        },
        {
          title: "Travel Insurance",
          description:
            "Travel with confidence knowing you're protected against unexpected events, medical emergencies, and trip cancellations.",
          image:
            "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=600&fit=crop",
        },
        {
          title: "Home Insurance",
          description:
            "Protect your most valuable asset with comprehensive home insurance covering property damage, theft, and natural disasters.",
          image:
            "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop",
        },
      ];

      let xyz_currentIndex = 0;
      let xyz_mobileCurrentIndex = 0;

      const xyz_carousel = document.getElementById("xyz-carousel");
      const xyz_infoTitle = document.getElementById("xyz-infoTitle");
      const xyz_infoDescription = document.getElementById(
        "xyz-infoDescription",
      );
      const xyz_infoBoxContent = document.getElementById("xyz-infoBoxContent");
      const xyz_dotsContainer = document.getElementById("xyz-dotsContainer");

      function xyz_createDots() {
        xyz_dotsContainer.innerHTML = "";
        xyz_slides.forEach((_, i) => {
          const dot = document.createElement("div");
          dot.className = `xyz-dot ${i === 0 ? "xyz-active" : ""}`;
          dot.addEventListener("click", () => xyz_goToSlide(i));
          xyz_dotsContainer.appendChild(dot);
        });
      }

      function xyz_initializeCarousel() {
        xyz_carousel.innerHTML = "";
        xyz_slides.forEach((slide, i) => {
          const slideDiv = document.createElement("div");
          slideDiv.className = "xyz-carousel-slide";
          slideDiv.innerHTML = `<img src="${slide.image}" alt="${slide.title}" class="xyz-slide-image" loading="lazy"><div class="xyz-slide-overlay"></div><h2 class="xyz-slide-title">${slide.title}</h2>`;
          slideDiv.addEventListener("click", () => {
            if (i !== xyz_currentIndex) xyz_goToSlide(i);
          });
          xyz_carousel.appendChild(slideDiv);
        });
        xyz_updateCarousel();
      }

      function xyz_updateCarousel() {
        const slideElements = document.querySelectorAll(".xyz-carousel-slide");
        slideElements.forEach((slide, i) => {
          slide.classList.remove("xyz-active", "xyz-next-visible");
          if (i === xyz_currentIndex) slide.classList.add("xyz-active");
          else if (i === (xyz_currentIndex + 1) % xyz_slides.length)
            slide.classList.add("xyz-next-visible");
        });
        xyz_carousel.style.transform = `translateX(-${xyz_currentIndex * 380}px)`;
      }

      function xyz_updateInfoBox() {
        xyz_infoBoxContent.classList.add("xyz-fade-out");
        setTimeout(() => {
          xyz_infoTitle.textContent = xyz_slides[xyz_currentIndex].title;
          xyz_infoDescription.textContent =
            xyz_slides[xyz_currentIndex].description;
          xyz_infoBoxContent.classList.remove("xyz-fade-out");
        }, 150);
      }

      function xyz_updateDots() {
        document
          .querySelectorAll(".xyz-dot")
          .forEach((dot, i) =>
            dot.classList.toggle("xyz-active", i === xyz_currentIndex),
          );
      }

      function xyz_goToSlide(index) {
        xyz_currentIndex = index;
        xyz_updateCarousel();
        xyz_updateInfoBox();
        xyz_updateDots();
      }

      document
        .getElementById("xyz-prevBtn")
        .addEventListener("click", () =>
          xyz_goToSlide(
            (xyz_currentIndex - 1 + xyz_slides.length) % xyz_slides.length,
          ),
        );
      document
        .getElementById("xyz-nextBtn")
        .addEventListener("click", () =>
          xyz_goToSlide((xyz_currentIndex + 1) % xyz_slides.length),
        );

      // Mobile Logic
      const xyz_mobTrack = document.getElementById("xyz-mobileImageTrack");
      const xyz_mobTitle = document.getElementById("xyz-mobileInfoTitle");
      const xyz_mobDesc = document.getElementById("xyz-mobileInfoDescription");
      const xyz_mobDots = document.getElementById("xyz-mobileDotsContainer");

      function xyz_initMobile() {
        xyz_mobTrack.innerHTML = "";
        xyz_slides.forEach((slide, i) => {
          const d = document.createElement("div");
          d.className = `xyz-mobile-image-slide ${i === 0 ? "xyz-active" : ""}`;
          d.innerHTML = `<img src="${slide.image}" alt="${slide.title}">`;
          xyz_mobTrack.appendChild(d);
          const dot = document.createElement("div");
          dot.className = `xyz-mobile-dot ${i === 0 ? "xyz-active" : ""}`;
          dot.addEventListener("click", () => xyz_goMobile(i));
          xyz_mobDots.appendChild(dot);
        });
      }

      function xyz_goMobile(index) {
        xyz_mobileCurrentIndex = index;
        const w =
          document.querySelector(".xyz-mobile-image-slide").offsetWidth + 16;
        xyz_mobTrack.style.transform = `translateX(-${index * w}px)`;
        document
          .querySelectorAll(".xyz-mobile-image-slide")
          .forEach((s, i) => s.classList.toggle("xyz-active", i === index));
        document
          .querySelectorAll(".xyz-mobile-dot")
          .forEach((d, i) => d.classList.toggle("xyz-active", i === index));
        xyz_mobTitle.textContent = xyz_slides[index].title;
        xyz_mobDesc.textContent = xyz_slides[index].description;
      }

      xyz_createDots();
      xyz_initializeCarousel();
      xyz_initMobile();