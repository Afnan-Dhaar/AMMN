  document.querySelectorAll(".faq-question").forEach(button => {
    button.addEventListener("click", () => {
      const item = button.parentElement;
      const icon = button.querySelector(".faq-icon");

      // Close all
      document.querySelectorAll(".faq-item").forEach(faq => {
        faq.classList.remove("active");
        faq.querySelector(".faq-icon").textContent = "+";
      });

      // Open current
      if (!item.classList.contains("active")) {
        item.classList.add("active");
        icon.textContent = "−";
      }
    });
  });

