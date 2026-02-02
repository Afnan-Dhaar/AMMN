document.querySelectorAll(".faq-question").forEach(button => {
  button.addEventListener("click", () => {
    const item = button.parentElement;
    const icon = button.querySelector(".faq-icon, .faq-icon1"); // ← Target both classes

    // Close all
    document.querySelectorAll(".faq-item").forEach(faq => {
      faq.classList.remove("active");
      const faqIcon = faq.querySelector(".faq-icon, .faq-icon1"); // ← Target both classes
      if (faqIcon) faqIcon.textContent = "+";
    });

    // Open current
    if (!item.classList.contains("active")) {
      item.classList.add("active");
      icon.textContent = "−";
    }
  });
});